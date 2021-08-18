const user_auth     = require("./worker/session_worker");
const crc32         = require("js-crc").crc32;

const token_sys = {
    update_user_session : async(params) => {
        let updated_params = {
            uid         : params.uid,
            token       : params.token,
            end_time    : params.end_time
        }
        await user_auth.update_user_session(updated_params);
        return updated_params;
    },
    
    create_new_session  : async() => {
        let session = {
            token       : "",
            end_time    : {}
        }
        let count   = await user_auth.get_sessions_count();
        for(let i = 0; i <= count; i++){
            session.end_time = (new Date()).getTime() + (1 * 60 * 60 * 1000); // day * minute * second * milisecond
            session.token    = crc32(session.end_time.toString());
            let token        = await user_auth.search_token(session);
            if(!token)
                break;
        }
        return session;
    },

    create_new_user  : async(params) => {
        let tokenModel  = {
            uid     : params.uid,
            session : {}
        }
        let uSession     = {
            uid     : params.uid,
            token   : ""
            
        }
        let student         = await user_auth.get_one_of_session(params);
        tokenModel.session  = await token_sys.create_new_session();
        if(!student){
            await user_auth.create_session(tokenModel);
        } else{
            await user_auth.update_all_set(tokenModel);
        }
        uSession.token    = tokenModel.session.token;
        return uSession;
    },

    check_user  : async(params) => {
        let uSession = {
            uid         : "",
            token       : params.session.token, 
            end_time    : {}
        }
        let dt  = (new Date()).getTime();
        if(dt > params.session.end_time){
            uSession  = await token_sys.create_new_session();
        }
        uSession.uid        = params.uid;
        uSession.end_time   = (new Date()).getTime() + (1 * 60 * 60 * 1000);
        await token_sys.update_user_session(uSession);
        delete uSession.end_time;
        return uSession;
    }
}

module.exports = token_sys;