const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./fs_validators");
const images    =   require("./workers/files_worker");
const config    =   require('./fs_config');
const fs        =   require('fs');
const util      =   require('util');
const stream    = require('stream');


router.post('/upload', async function(req, res, next){
    let params = {
        _pid    : req.body.pid,
        _images : req.files.foo
    }
    let result = await POST_Upload(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"});
    } else {
        res.send(result);
    }
    next();           
});

router.delete('/delete', async function(req, res, next){
    let params = {
        _pid    : req.body.pid,
        _images : req.body.images
    }
    let result = await DELETE_Images(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"});
    } else {
        res.send(result);
    }
    next();           
});

// async function processImage(url) {
//     try {
//         const resizeTransform = sharp()
//         .resize(160, 105);
//       const imgstream = request(url).pipe(resizeTransform);
//       const pipeline = util.promisify(stream.pipeline);
//       const readableStream = fs.createReadStream(url);
//       return await pipeline(readableStream);
//     } catch (err) {
//       console.log(err);
//     }
// };

router.post('/get_images', async function(req, res, next){
    let params = {
        _pid    : req.body.pid,
        _images : req.body.images
    }
    res.writeHead(500, {'Content-Type' : 'image/jpeg'});

    let p = [`${__dirname}/images/somePost2/photo/enotik.jpg`, `${__dirname}/images/somePost2/photo/enot3.jpeg` ];
    // p.forEach(path => {
    //     // fs.readFile(path, (err, image) => {
    //     //     console.log(image);
    //     //     if(err)
    //     //         console.log(err);
    //     //     res.end(image);
    //     // });
    //     // res.sendFile(path, function(err){
    //     //     if(err){
    //     //         if(err.status >= 400 && err.status < 600)
    //     //             console.log("Bezopasno");
    //     //         else {
    //     //             console.log(err);
    //     //         }
    //     //     } else{
    //     //         console.log(config.path + `${params._pid}/photo/${params._images}`);
    //     //     }
    //     // });
    //     let imagesStream    = fs.createReadStream(path);
    //     console.log("MTA");
    //     imagesStream.pipe(res);
        
    // });

    for(let i=0; i< p.length; i++){
        console.log(await processImage(p[i]));
    }
    
}); 

//----------------------------------------------------------Handlers--------------------------------------------------------\\

const POST_Upload          = async (params) => {
    let result = {
        dataValid   : false,
        data        : "",
        _status     : ""
    }
    result.dataValid    = valid.validate_upload_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data         = await images.upload_images(params);
    return result;
}   

const DELETE_Images         = async (params) => {
    let result = {
        dataValid   : false,
        data        : "",
        _status     : ""
    }
    result.dataValid        =  valid.validate_delete_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    try{
        params._images        =   JSON.parse(params._images);
    }
    catch (error) { 
        result.dataValid    =   false;
        result._status      =   "400 : Elements are not JSON";
    }

    if(!result.dataValid)   {return result;}
    result.data             = await images.delete_images(params);
    result._status          =   "204 : No Content";
    return result; 
}   
module.exports = router;