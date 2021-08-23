let mongoClient = require("mongodb").MongoClient;
let db          = require("../../side_modules/db");
let config      = require("../up_config");


const storage = {
    get_sets_count  : async() => {
        let _db = await storage.loadDB();
        let res = await db.count(_db, config.sets_collection, {});
        return res;
    },

    remove_one_of_sets  : async(object) => {
        let _db = await storage.loadDB();
        let res = await db.remove(_db, config.sets_collection, object);
        return res;
    },

    create_post     : async(obj) => {
        let _db = await storage.loadDB();
        let res = await db.insert(_db, config.sets_collection, obj);
        return res;
    },

    get_one_set     : async(params) => {
        let _db = await storage.loadDB();
        let res = await db.findOne(_db, config.sets_collection, params);
        return res;
    },
    
    update_set      : async(query, u_params) => {
        let _db = await storage.loadDB();
        let res = await db.updateOne(_db, config.sets_collection, query, u_params);
        return res;
    },

    get_sets_list   : async(query) => {
        let _db = await storage.loadDB();
        let res = await db.list(_db, config.sets_collection, query);
        return res;
    },

    db_client       : null,

    loadDB          : async() => {
        if (storage.db_client){
            return storage.db_client;
        }
        try{
            const client = await mongoClient.connect( config.mongoConfig.url,
                                                      config.mongoConfig.params);
            storage.db_client = client.db(config.mongodb);
        } catch(err) {
            console.log(err);
        }
        return storage.db_client;
    }
}

module.exports = storage;