const sha256    = require("sha256");
const { param } = require("../app");
const user_auth = require("./worker/users_woker");

const id_sys = {
    pepper          : "fb850cb1f35d182ece32b2aad8f36dd43d9b782fd206cefd11ee6c4d9d5b8996",
    student_count   : 0,

    handle_request  : async(req, res, next) => {
        if(req.query.id     !== undefined){
            req.body._id     = req.query.id;   
        }
        if(req.body._id     === undefined){
            req.auth_data    = { _ok : false}
            next();
        }
        else{
            let id              = req.body._id;
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
        let dt  = (new.Date()).getTime();
        if(dt > session.end_time){
            id_responce.timeout = true;
            await user_auth.delete_one_of_session(query);
        }
        return id_responce;
    },

    update_end_time : async(id) => {
        let params = {
            _id         : id,
            _end_time   : {}
        }
        params._end_time = (new Date).getTime() + (1 * 60 * 60 * 1000);
        await user_auth.update_all_set(params);
    },
    
    generate_id     : () => {
        let session = {
            student_id  = "",
            end_time    = {}
        }
        session.student_id    = sha256(`student_${student_count++}` + token_sys.pepper);
        session.end_time      = (new Date).getTime() + (1 * 60 * 60 * 1000); // day * minute * second * milisecond
        return session;
    }
}

module.exports = id_sys;