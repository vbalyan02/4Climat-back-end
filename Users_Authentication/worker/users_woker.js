const ua_storage    = require("../storage/ua_storage");

const worker = {
    create_session          : async(params) => {
        let user_session = {
            student_id  : params.student_id,
            end_time    : params.end_time,
            token       : params.token
        }        
        await ua_storage.insert_set(user_session);
        return user_session;
    },

    get_one_of_session      : async(params) => {
        let query = {
            student_id : params.student_id
        }
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    },

    search_token            : async(params) => {
        let query = {
            student_id : params.token
        }
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    },

    update_all_set          : async(params) => {
        let update_dat  = {
            end_time      :   params.end_time   
        }
        let query       =   {student_id   :   params.student_id};
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

module.exports = worker;