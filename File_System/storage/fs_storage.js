const fs        = require('fs');
const config    = require('../fs_config');

const storage = {
    create_dir      : async(params) => {
        try {
            return await fs.promises.access(config.path + params.dir_name);
        } catch (err) {
            fs.mkdirSync(config.path + params.dir_name);
            fs.mkdirSync(config.path + `${params.dir_name}/standard`);
            fs.mkdirSync(config.path + `${params.dir_name}/small`);
            return true;
        }
    },

    delete_dir      : async(params) => {
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

    save_img        : async(params, dir) => {
        let images = params._images;
        for(let i = 0; i < images.length; i++){
            fs.writeFileSync(config.path + `${params._pid}/${dir}/${images[i].name}`, images[i].data, async function(err){
                    if(err){
                        console.log(err);
                    } else{
                        return true;
                    }
                });
        }
        return true;
    },

    delete_images   : async(params) => {
        for(let i = 0; i < params.img_name.length; i++){
            fs.unlinkSync(config.path + `${params.dir_name}/standard/${params.img_name[i]}`);
            fs.unlinkSync(config.path + `${params.dir_name}/small/${params.img_name[i]}`);
        }
    },

    get_images      : async(params) => {
        let res = {
            images  : []
        }
        for(let i = 0; i < params.img_name.length; i++){
            res.images.push(fs.readFileSync(config.path + `${params.dir_name}/${params.img_size}/${params.img_name[i]}`).toString('base64'));
        }
        return res;
    }

}

module.exports = storage;