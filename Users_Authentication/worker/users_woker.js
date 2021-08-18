const ua_storage    = require("../storage/ua_storage");

const worker = {
    get_one_of_session      : async(params) => {
        let query = {
            uid : params.uid
        }
        let dat = await ua_storage.get_one_of_session(query);
        return dat;
    }
}

module.exports = worker;