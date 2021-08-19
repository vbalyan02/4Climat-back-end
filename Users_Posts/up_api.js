const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./up_validators");
const post      =   require("./workers/posts_worker.js");

router.post('/create', async function(req, res, next){
    let params = {
        _uid     : req.body.uid,
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

router.get('/getsetsone', async function (req, res, next){
    let params  = {
        _uid    : req.query._uid
    }
    let result  = await GET_SetsOne(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    }  else {
        res.send(result);
    }
});

router.post('/list', async function (req, res, next){
    let result = await GET_List();
    res.send(result);
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

const GET_SetsOne               = async (params) => {
    let result = {
        dataValid   : false,
        data        : "",
        _status     : ""
    }
    result.dataValid    = await valid.validate_get_one_set(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data = await post.get_one_set(params);
    result._status = result.data === null ? "404 : Not Found" : "200 : Ok";
    return result;
};

const GET_List   = async () => {
    let result = {
        data    : "",
        _status : ""    
    };
    result.data = await post.get_sets_list();
    if(!result.data)        {result._status = "404 : Not found";        return result; }
    result._status = "200 : Ok";
    return result;
}

module.exports = router;