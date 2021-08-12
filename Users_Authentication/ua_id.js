const user_auth     = require("./worker/users_woker");
const crc32         = require("crc32");

const token_sys = {

    handle_request  : async(req, res, next) => {
        if(req.query.id     !== undefined){
            req.body.student_id     = req.query.id;   
        }
        if(req.body.student_id     === undefined){
            req.auth_data    = { _ok : false}
            next();
        }
        else{
            let id              = req.body.student_id;
            let dat             = await token_sys.check_id(id);
            req.auth_data       = dat;
            req.auth_data._ok   = !dat.timeout && !dat.unknown;
            next();
        }
    },

    check_id        : async(id) => {
        let id_responce = {
            timeout : false,
            unknown : true
        }
        let query = {
            _id : id
        }
        session = user_auth.get_one_of_session(query);
        if(session) {unknown = false;}
        else        {return id_responce;}
        let dt  = (new Date).getTime();
        if(dt > session.end_time){
            id_responce.timeout = true;
            await user_auth.delete_one_of_session(query);
            token_sys.student_count--;
        }
        return id_responce;
    },

    update_end_time : async(id) => {
        let params = {
            student_id : id,
            end_time   : {}
        }
        params.end_time = (new Date).getTime() + (1 * 60 * 60 * 1000);
        let res = await user_auth.update_all_set(params);
        return params;
    },
    
    generate_token     : async(params) => {
        let tokenModel = {
            student_id     : params.student_id,
            end_time       : {},
            token          : ""
        }
        let student = await user_auth.get_one_of_session(params);
        if(student !== null){
            console.log(student);
            let res = await token_sys.update_end_time(params.student_id);
            tokenModel.token    = student.token;
            tokenModel.end_time = res.end_time;
            return tokenModel;
        }
        let count               =   await user_auth.get_sessions_count();

        for(let i = 0; i < count; i++){
            tokenModel.end_time = (new Date).getTime() + (1 * 60 * 60 * 1000); // day * minute * second * milisecond
            tokenModel.token    = crc32(toString(tokenModel.end_time));
            if(!user_auth.search_token(tokenModel))
                break;
        }

        await user_auth.create_session(tokenModel);
        return tokenModel;
    }
}

module.exports = token_sys;