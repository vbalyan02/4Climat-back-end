const ua_storage    = require("../storage/ua_storage");

const sWorker = {
    create_session          : async(params) => {
        let user_session = {
            uid         : params.uid,
            session     : params.session
        }        
        await ua_storage.insert_set(user_session);
        return user_session;
    },

    get_one_of_session      : async(params) => {
        let query = {
            uid : params.uid
        }
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    },

    search_token            : async(params) => {
        let query = {
            session     : {}
        }
        query.session.token   = params.token;
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    },

    update_all_set          : async(params) => {
        let update_dat  = {
            perf        : params.perf,
            session     : params.session    
        }
        let query       =   {uid   :   params.uid};
        let dat         =   await ua_storage.update_set(query, update_dat);
        return dat;    
    },

    update_user_session      : async(params) => {
        let update_dat  = {
            session     :   {} 
        }
        update_dat.session.token    = params.token;
        update_dat.session.end_time = params.end_time;
        let query       =   {uid   :   params.uid};
        let dat         =   await ua_storage.update_set(query, update_dat);
        return dat;    
    },

    delete_one_of_session   : async(params) => {
        let = {
            id : params.id
        }
        let dat = await ua_storage.delete_one_of_session(query);
        return dat;
    },

    get_sessions_count      : async() => {
        let count       =   await ua_storage.get_sets_count();
        return count;
    }
}

module.exports = sWorker;