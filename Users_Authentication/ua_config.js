const config = {
    mongoConfig         : {
      url     : "mongodb+srv://vbalyan:NIUEiolFSsGcXcOc@impactcounter.qvruf.mongodb.net/conter?retryWrites=true&w=majority",
      params  : {useNewUrlParser: true, useUnifiedTopology: true}
    },
    mongodb             : "4climat_db",
    users_collection    : "users",
}
module.exports = config;
