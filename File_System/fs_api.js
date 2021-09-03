const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./fs_validators");
const images    =   require("./workers/files_worker");
// const sharp     =   require("sharp");
// const fs        =   require('fs');
// const images    =   require("./storage/fs_storage");

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
    //ACCESS
    // images.delete_dir('img');
    next();           
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
    result.data         = images.image_upload(params);
    return result;
}   

module.exports = router;