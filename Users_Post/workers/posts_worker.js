const post_storage  = require("../storage/up_storage");
const base64        = require("../../side_modules/base64");  

const worker = {

    create_post         : async(params) => {
        let setElement = {
            uid         :   params._uid,
            pid         :   "", 
            post        :   params._post,
            status      :   params._status,
            date        :   {}
        }
        let num = Math.ceil((new Date()).getTime() + (Math.random() * (99 - 9) + 9));
        setElement.pid  = num.toString(16);
        setElement.date = (new Date()).toDateString();
        await post_storage.create_post(setElement);
        return setElement;
    },

    update_post         : async(params) => {
        let update_dat  = {
            post    : params._post,
            status  : params._status 
        }
        let query       =   {pid    : params._pid};
        let dat         =   await post_storage.update_set(query, update_dat);
        return dat;     
    },

    get_sets_list       : async(params) => {
        let query   = {uid : params._uid};
        let data    = await post_storage.get_sets_list(query);
        return data;
    }, 

    get_all_sets_list   : async(params) => {
        let query   = {};
        let data    = await post_storage.get_sets_list(query);
        return data;
    },

    get_one_post         : async(params) => {
        let query   = {
            pid     :   params._pid
        }
        let data    =   await post_storage.get_one_set(query);
        return data;
    },

    get_one_userpost    : async(params) => {
        let query   = {
            uid     : params._uid,
            pid     : params._pid
        }
        let data    = await post_storage.get_one_set(query);
        return data;
    },

    remove_post         : async(params) => {
        let res = await post_storage.remove_one_of_sets(params);
        return res;
    },

    generate_id     : () => {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
 
}

module.exports = worker;
