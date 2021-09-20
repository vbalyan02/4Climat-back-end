const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./up_validators");
const post      =   require("./workers/posts_worker.js");

router.post('/create', async function(req, res, next){
    let params = {
        _uid        : req.body.uid,
        _post       : req.body.post,
        _status     : req.body.status
    }
    let result = await POST_Create(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"});
    } else {
        res.send(result);
    }
    next();
});

router.post('/user_list', async function (req, res, next){
    let params = {
        _uid    : req.body.uid
    }
    let result = await GET_userList(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    }  else {
        res.send(result);
    }
    next();
});

router.post('/list', async function (req, res, next){
    let result = await GET_List();
    res.send(result);
})

router.post('/update', async function (req, res, next){
    let params = {
        _uid    : req.body.uid,
        _pid    : req.body.pid,
        _post   : req.body.post,
        _status : req.body.status,
    }
    let result = await POST_Update(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    }  else {
        res.send(result);
    } 
    next();
})

router.get('/getpost',  async function (req, res, next){
    let params = {
        _pid    : req.query.pid
    }
    let result = await GET_PostsOne(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    }  else {
        res.send(result);
    }
    next();
})

router.post('/removepost', async function(req, res, next){
    let params = {
        _uid    :   req.body.uid,
        _pid    :   req.body.pid
    }
    let result = await POST_RemovePost(params);
    if(!result.dataValid){
        res.send({error : "Invalid post data"})
    } else {
        res.send(result);
    }
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
        console.log(error);
        result.dataValid    =   false;
        result._status      =   "400 : Elements are not JSON";
    }
    if(!result.dataValid)   {return result;}
    result.data             = await post.create_post(params);
    result._status          =   "204 : No Content";
    return result; 
}

const GET_userList              = async (params) => {
    let result = {
        data        : "",
        dataValid   : "",
        _status     : ""    
    };
    result.dataValid    = valid.validate_list_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data         = await post.get_sets_list(params);
    if(!result.data)    { result._status = "404 : Not found";        return result; }
    result._status      = "200 : Ok";
    return result;
}

const GET_List          = async (params) => {
    let result = {
        data        : "",
        _status     : ""    
    };
    result.data = await post.get_all_sets_list();
    if(!result.data)        {result._status = "404 : Not found";        return result; }
    result._status = "200 : Ok";
    return result;
}

const POST_Update       = async (params) => {
    let result = {
        dataValid   : "",
        found       : "",
        _status     : ""    
    };
    result.dataValid    = valid.validate_update_req(params);
    let uPost           = await post.get_one_userpost(params);
    result.found        = uPost != null;
    if(!result.found)       {result._status = "404 : Not Found";        return result};
    if(!result.dataValid)   { return result; }
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    try{
        params._post        =   JSON.parse(params._post);
    }
    catch (error) { 
        result.dataValid    =   false;
        result._status      =   "400 : Elements are not JSON";
    }
    await post.update_post(params);
    if(!result.found)        {result._status = "404 : Not found";        return result; }
    result._status = "204 : No content";
    return result;
}

const GET_PostsOne          = async (params) => {
    let result = {
        dataValid   : "",
        data        : "",
        _status     : ""
    }
    result.dataValid    = valid.validate_getpost_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data         = await post.get_one_post(params);
    if(!result.data)    { result._status = "404 : Not found";        return result; }
    result._status      = "200 : Ok";
    return result;
}

const POST_RemovePost       = async (params) => {
    let result = {
        dataValid   : "",
        found       : "",
        _status     : ""
    }
    result.dataValid    = valid.validate_remove_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    let uPost           = await post.get_one_userpost(params);
    result.found        = uPost !== null;
    if(!result.found)       {result._status = "404 : Not Found";        return result};
    await post.remove_post(uPost);
    result._status      =   "204 : No Content";
    return result;
}


module.exports = router;