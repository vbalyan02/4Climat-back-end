const fs = require('fs');

const storage = {
    create_dir : (name) => {
        fs.access(__dirname + `/images/${name}`, function(err){
            if(err){
                fs.mkdir(__dirname + `/images/${name}`, function(err){
                    if(err){
                        return false;
                    } else {
                        return true;
                    }
                });
            }else{
                console.log("file is found");
            };
        });
    },

    delete_dir : (name) => {
        fs.access(__dirname + `/images/${name}`, function(err){
            if(!err){
                fs.rmdirSync(__dirname + `/images/${name}`, { recursive: true });
            }else{
                return false;
            };
        });
    }
}

module.exports = storage;