const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./up_validators");
const post      =   require("./workers/posts_worker.js");

router.post('/create', async function(req, res, next){
    let params = {
        _uid     : req.body.uid,
        _pid     : req.body.pid,
        _post    : req.body.post,
        _status  : req.body.status
    }
    let result = await POST_Create(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"});
    } else {
        res.send(result);
    }
});

router.post('/list', async function (req, res, next){
    let params = {
        uid    : req.body.uid
    }
    let result = await GET_List(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    }  else {
        res.send(result);
    }
});


router.post('/update_status', async function (req, res, next){
    let 
})

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
    await post.create_post(params);
    result._status          =   "204 : No Content";
    return result;
};

const GET_List   = async (params) => {
    let result = {
        data        : "",
        dataValid   : "",
        _status     : ""    
    };
    result.dataValid    = valid.validate_list_req(params);
    result.data = await post.get_sets_list(params);
    if(!result.data)        {result._status = "404 : Not found";        return result; }
    result._status = "200 : Ok";
    return result;
}

module.exports = router;