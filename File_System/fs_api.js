const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./fs_validators");
const images    =   require("./workers/files_worker");
const config    =   require('./fs_config');


router.post('/upload', async function(req, res, next){
    let params = {
        _pid    : req.body.pid,
        _images : req.files.files
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

router.post('/get_images', async function(req, res, next){
    let params = {
        _pid    : req.body.pid,
        _images : req.body.images,
        _type   : req.body.type
    }
    let result = await POST_getImages(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"});
    } else {
        res.send(result);
    }
    next();           
}); 

//----------------------------------------------------------Handlers--------------------------------------------------------\\

const POST_Upload           = async (params) => {
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

const POST_getImages        = async (params) => {
    let result = {
        dataValid   : false,
        data        : "",
        _status     : ""
    }
    result.dataValid        =  valid.validate_get_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    try{
        params._images      =   JSON.parse(params._images);
    }
    catch (error) { 
        result.dataValid    =   false;
        result._status      =   "400 : Elements are not JSON";
    }

    if(!result.dataValid)   {return result;}
    result.data             = await images.get_images(params);
    result._status          =   "204 : No Content";
    return result; 
}

module.exports = router;