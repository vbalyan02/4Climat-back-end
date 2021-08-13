const express   =   require('express');
const router    =   express.Router();
const valid     =   require("./ua_validators");
const users     =   require("./worker/users_woker");
const token_sys    =   require("./ua_id");

router.post('/sign_up'   ,   async function(req, res, next){
    // if(!req.auth_data._ok) { res.send({error : "401 : Unauthorized"}); return; }
    let params = {
        student_id  : req.body.student_id
    }
    let result = await POST_CreateSession(params);
    if(!result.dataValid){
        res.send({error : "500 : Internal Server Error"});
    } else {
        res.send(result);
    }
})

router.post('/sign_in', async function(req, res, next){
    // if(!req.auth_data._ok) { res.send({error : "401 : Unauthorized"}); return; }
    let params = {
        student_id  : req.body.student_id,
        token       : req.body.token
    }
    let result = await POST_SignIn(params);
    if(!result.dataValid){
        res.send({error : "500 : Internal Server Error"});
    } else {
        res.send(result);
    }
})

const POST_SignIn           = async (params) => {
    let result = {
        dataValid   : false,
        data        : false,
        status      : ""
    }
    result.dataValid    = await valid.validate_sign_in_req(params);
    if(!result.dataValid){
        result.status   = "400: Bad Request";
        return result;
    }
    result.data         = await users.get_one_of_session(params);
    result.status       = result.data       === null ? "404 : Not Found" :
                          result.data.token !== params.token ? "403 : Forbidden" : "200 : Ok";
    if(result.status === "200 : Ok"){
        result.data     = await token_sys.update_end_time(params);
    } else{
        result.data = "wrong token";
    }
    return result;
}

const POST_CreateSession    = async (params) => {
    let result = {
        dataValid   : false,
        data        : false,
        _status     : ""
    }
    result.dataValid        = await valid.validate_sign_up_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";      return result};
    result.data             = await token_sys.generate_token(params);
    return result;
}

module.exports = router;
