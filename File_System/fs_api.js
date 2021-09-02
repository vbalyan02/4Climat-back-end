const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./fs_validators");
const post      =   require("./workers/files_worker");
const sharp     =   require("sharp");
const fs        =   require('fs');

router.post('/upload', async function(req, res, next){
    let params = {
        _images     : req.files.foo
    }
    
    // // SAVE                                                                                 
    // params._images[0].mv(__dirname + '/images/xoma.jpeg', function(err){
    //     console.log(err);
    //     if(err){
    //         console.log("err");
    //     } else {
    //         console.log("uploaded");
    //     }
    // });

    //ACCESS
    fs.access(__dirname + '/images/image', function(err){
        if(err){
            fs.mkdir(__dirname + '/images/image', function(err){
                if(err){
                    console.log(err + "SXAL KA!!!");
                }
            });
        }else{
            console.log("file is found");
        };
    });
    next();           
});

//----------------------------------------------------------Handlers--------------------------------------------------------\\

const POST_Create           = async (params) => {
    let result = {
        dataValid   : false,
        data        : "",
        _status     : ""
    }

    result.dataValid        =  valid.validate_create_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    try{
        params._post        =   JSON.parse(params._post);
    }
    catch (error) { 
        result.dataValid    =   false;
        result._status      =   "400 : Elements are not JSON";
    }
    if(!result.dataValid)   {return result;}
    result.data             = await post.create_post(params);
    result._status          =   "204 : No Content";
    return result; 
}

module.exports = router;