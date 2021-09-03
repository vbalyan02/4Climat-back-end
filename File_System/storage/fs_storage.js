const fs = require('fs');

const storage = {
    create_dir  : async(params) => {
        fs.access(__dirname + `/../images/${params.dir_name}`, async function(err){
            if(err){
                 fs.mkdirSync(__dirname + `/../images/${params.dir_name}`);
                 fs.mkdirSync(__dirname + `/../images/${params.dir_name}/photo`);
                 fs.mkdirSync(__dirname + `/../images/${params.dir_name}/temp`);
                return true;
            }else{
                return true;
            };
        });
    },

    delete_dir  : async(params) => {
        fs.access(__dirname + `/../images/${params.dir_name}`, function(err){
            if(!err){
                fs.rmdirSync(__dirname + `/../images/${params.dir_name}`, { recursive: true } );
                console.log("Directory is removed");
            }else{
                console.log(err);
                return false;
            };
        });
    },

    save_img    : async(params, dir) => {
        let images = params._images;
        for(let i = 0; i < images.length; i++){
            await images[i].mv(__dirname + `/../images/${params._pid}/${dir}/${images[i].name}`, function(err){
                if(err){
                    console.log(err);
                } else{
                    console.log(__dirname + `/../images/${params._pid}/${dir}/${images[i].name}`);
                }
            });
        }
    }
}

module.exports = storage;