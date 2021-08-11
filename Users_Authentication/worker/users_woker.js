const ua_storage    = require("../storage/ua_storage");

const worker = {
    create_session          : async(params) => {
        let setElement = {
            student_id  :   "",
            end_time    :   {}
        }
        let count       =   await ua_storage.get_sets_count();
        setElement.student_id   = params._student_id;
        setElement.end_time     = params._end_time;
        await ua_storage.insert_set(setElement);
        return setElement;
    },

    get_one_of_session      : async(params) => {
        let = {
            id : params._student_id
        }
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    },

    update_all_set      : async(params) => {
        let update_dat  = {
            end_time      :   params._end_time   
        }
        let query       =   {id   :   params._id};
        let dat         =   await ua_storage.update_set(query, update_dat);
        return dat;     
    },

    delete_one_of_session   : async(params) => {
        let = {
            id : params._id
        }
        let dat = await ua_storage.delete_one_of_session(query);
        return dat;
    }
}

module.exports = worker;