const user_auth     = require("./worker/users_woker");
const crc32         = require("js-crc").crc32;

const token_sys = {

    handle_request  : async(req, res, next) => {
        if(req.query.id         !== undefined){
            req.body.student_id = req.query.id;   
        }
        if(req.body.student_id  === undefined){
            req.auth_data       = { _ok : false}
            next();
        }
        else{
            let id              = req.body.student_id;
            let dat             = await token_sys.check_token(id);
            req.auth_data       = dat;
            req.auth_data._ok   = !dat.timeout && !dat.unknown;
            next();
        }
    },

    check_token        : async(id) => {
        let id_responce = {
            timeout : false,
            unknown : true
        }
        let query = {
            student_id : id
        }
        session = user_auth.get_one_of_session(query);
        if(session) {unknown = false;}
        else        {return id_responce;}
        let dt  = (new Date()).getTime();
        if(dt > session.end_time){
            id_responce.timeout = true;
            await user_auth.delete_one_of_session(query);
        } else{
            token_sys.update_end_time(query);
        }
        return id_responce;
    },

    update_end_time : async(params) => {
        let updated_params = {
            student_id : params.student_id,
            end_time   : {}
        }
        updated_params.end_time = (new Date()).getTime() + (1 * 60 * 60 * 1000);
        await user_auth.update_all_set(updated_params);
        return updated_params;
    },
    
    generate_token  : async(params) => {
        let tokenModel  = {
            student_id  : params.student_id,
            end_time    : {},
            token       : ""
        }
        let session     = {
            student_id  : params.student_id,
            token       : ""
            
        }
        let student = await user_auth.get_one_of_session(params);
        if(student !== null){
            let res = await token_sys.update_end_time(params);
            tokenModel.token    = student.token;
            tokenModel.end_time = res.end_time;
            return tokenModel;
        }

        let count               = await user_auth.get_sessions_count();
        for(let i = 0; i <= count; i++){
            tokenModel.end_time = (new Date()).getTime() + (1 * 60 * 60 * 1000); // day * minute * second * milisecond
            tokenModel.token    = crc32(tokenModel.end_time.toString());
            let token           = await user_auth.search_token(tokenModel);
            if(!token)
                break;
        }
        await user_auth.create_session(tokenModel);
        session.token    = tokenModel.token;
        return session;
    }
}

module.exports = token_sys;