const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./ua_validators");
const users     =   require("./worker/users_woker");
const token_sys =   require("./ua_id");

router.put('/users'   ,   async function(req, res, next){
    let params = {
        uid     : req.body.uid
    }
    let result = await PUT_SignUp(params);
    if(!result.dataValid){
        res.send({error : "Invalid Post Data"});
    } else {
        res.send(result);
    }
    next()
})

router.post('/users', async function(req, res, next){
    let params = {
        uid     : req.body.uid,
        perf    : req.body.perf,
        token   : req.body.token
    }
    let result = await POST_SignIn(params);
    if(!result.dataValid){
        res.send({error : "Invalid Post Data"});
    } else {
        res.send(result);
    }
    next()
})

const POST_SignIn           = async (params) => {
    let result = {
        dataValid   : false,
        data        : false,
        status      : ""
    }
    result.dataValid    = valid.validate_sign_in_req(params);
    if(!result.dataValid){
        result.status   = "400 : Bad Request";
        return result;
    }
    result.data         = await users.get_one_of_session(params);
    result.status       = result.data               === null        ?  "404 : Not Found" :
                          result.data.session.token !== params.token?  "403 : Forbidden" : "200 : Ok";
    if(result.status === "200 : Ok"){
        result.data     = await token_sys.check_user(result.data);
    } else {
        result.data = null;
    }
    return result;
}

const PUT_SignUp    = async (params) => {
    let result = {
        dataValid   : false,
        data        : false,
        _status     : ""
    }
    result.dataValid        = valid.validate_sign_up_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data             = await token_sys.create_new_user(params);
    result._status          = "200 : Ok";
    return result;
}

module.exports = router;
