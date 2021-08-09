const data = {
  findDocs  : function(db,col,query,callback){
    let collection = db.collection(col);
    collection.find(query).toArray(function(err,docs){
      if(err) throw err;
      callback(docs);
    })
  },
  count     : async function(db, col, query){
    let collection = db.collection(col);
    let res = await collection.find(query).count();
    return res;
  },
  list      : async function(db, col, query){
    let collection = db.collection(col);
    let res = await collection.find(query).toArray();
    return res;
  },
  list_projected  : async function(db, col, query, projection){
    let collection = db.collection(col);
    let res = await collection.find(query).project(projection).toArray();
    return res;
  },
  findOne   : async function(db, col, query){
    let collection = db.collection(col);
    let res = await collection.findOne(query);
    return res;
  },
  updateOne : async function(db, col, query, update){
    let collection = db.collection(col);
    let res = await collection.updateOne(
      query,
      {$set : update}
    )
    return res;
  },
  deleteOne : async function(db, col, query){
    let collection = db.collection(col);
    console.log("DELETION COMMAND : " + query);
    let res = await collection.deleteOne(query);
    return res;
  },
  insert    : function(db, col, data){
    let collection = db.collection(col);
    collection.insertOne(data);
  },
  update    : function(db, col, sdat, fdat, callback){
    let collection = db.collection(col);
    collection.update(sdat, fdat, function(err, docs){
      if(err) throw err;
      callback(docs);
    });
  },
  remove    : function(db, col, data){
    let collection = db.collection(col);
    collection.remove(data);
  }
};
module.exports = data;
