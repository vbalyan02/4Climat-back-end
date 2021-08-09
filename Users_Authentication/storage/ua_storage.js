
let mongoClient = require("mongodb").mongoClient;
let db          = require("../../side_modules/db");
let config      = require("../ua_config");

const storage = {
    get_one_of_users    : async(query) => {
        let _db = await storage.loadDB();
        let res = await db.findOne(_db, config.users_collection, query);
        return res;
    },
    
    db_client           : null,
    loadDB              : async() => {
        if(storage.db_client){
            return storage.db_client;
        }
        try{
            const client = await mongoClient.connect( config.mongoConfig.url,
                                                      config.mongoConfig.params);
            storage.db_client = client.db(config.mongodb);
        } catch (err) {
            console.log(err);
        }
        return storage.db_client;    }
}

module.exports = storage;
