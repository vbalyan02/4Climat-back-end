const post_storage  = require("../storage/up_storage");
const base64        = require("../../side_modules/base64");  

const worker = {

    create_post         : async(params) => {
        let setElement = {
            uid         :   params._uid,
            pid         :   params._pid, 
            post        :   params._post,
            status      :   params._status
        }
        await post_storage.create_post(setElement);
        return setElement;
    },

    update_all_set      : async(params) => {
        let update_dat  = {
            name        :   params._name,
            elements    :   params._elements   
        }
        let query       =   {uid   :   params._uid};
        let dat         =   await post_storage.update_set(query, update_dat);
        return dat;     
    },

    get_sets_list   : async(params) => {
        let query   = {uid : params.uid, status : "published"};
        let data    = await post_storage.get_sets_list(query);
        return data;
    }, 

    get_one_set     : async(params) => {
        let query   = {
            uid     :   params._uid
        }
        let data    =   await post_storage.get_one_set(query);
        return data;
    },

    generate_id     : () => {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
 
}

module.exports = worker;