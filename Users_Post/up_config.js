const config = {
    mongoConfig         : {
	    url     : "mongodb://127.0.0.1:27017",
      	params  : {useNewUrlParser: true, useUnifiedTopology: true}
    },
    mongodb             : "4climat",
    sets_collection     : "posts",
}

module.exports = config;
