let mongoClient = require("mongodb").MongoClient;
let db          = require("../../side_modules/db");
let config      = require("../ua_config");

const storage = {
    get_one_of_session      : async(query) => {
        let _db = await storage.loadDB();
        let res = await db.findOne(_db, config.users_collection, query);
        return res;
    },

    delete_one_of_session   : async(query) => {
        let _db = await storage.loadDB();
        let res = await db.deleteOne(_db, config.users_collection, query);
        return res;
    },
    
    update_set      : async(query, u_params) => {
        let _db = await storage.loadDB();
        let res = await db.updateOne(_db, config.users_collection, query, u_params);
        return res;
    },
    
    get_sets_count  : async() => {
        let _db = await storage.loadDB();
        let res = await db.count(_db, config.users_collection, {});
        return res;
    },

    insert_set      : async(obj) => {
        let _db = await storage.loadDB();
        let res = await db.insert(_db, config.users_collection, obj);
        return res;
    },

    db_client               : null,
    loadDB                  : async() => {
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
