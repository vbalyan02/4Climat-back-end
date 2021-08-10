const config = {
    mongoConfig         : {
      url     : "mongodb+srv://vbalyan:NIUEiolFSsGcXcOc@impactcounter.qvruf.mongodb.net/conter?retryWrites=true&w=majority",
      params  : {useNewUrlParser: true, useUnifiedTopology: true}
    },
    mongodb             : "4climat",
    users_collection    : "auth",
}
module.exports = config;
