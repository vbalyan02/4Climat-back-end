const fs        = require('fs');
const config    = require('../fs_config');

const storage = {
    create_dir  : async(params) => {
        try {
            return await fs.promises.access(config.path + params.dir_name);
        } catch (err) {
            fs.mkdirSync(config.path + params.dir_name);
            fs.mkdirSync(config.path + `${params.dir_name}/photo`);
            fs.mkdirSync(config.path + `${params.dir_name}/temp`);
            return true;
        }
    },

    delete_dir  : async(params) => {
        fs.access(config.path + params.dir_name, function(err){
            if(!err){
                fs.rmdirSync(config.path + params.dir_name, { recursive: true } );
                console.log("Directory is removed");
            }else{
                console.log(err);
                return false;
            };
        });
    },

    save_img    : async(params, dir) => {
        let images = params._images;
        if(images.length === undefined){
            await images.mv(config.path + `${params._pid}/${dir}/${images.name}`);
        }
        for(let i = 0; i < images.length; i++){
            await images[i].mv(config.path + `${params._pid}/${dir}/${images[i].name}`, function(err){
                if(err){
                    console.log(err);
                } else{
                    return true;
                }
            });
        }
    }
}

module.exports = storage;