const img_storage   = require("../storage/fs_storage");
const base64        = require("../../side_modules/base64");  
const fs            = require('fs');
const config        = require('../fs_config');
const sharp         = require('sharp');

const worker = {
    image_upload    : async(params) => {
        let image = {
            dir_name    : "",
            img_name    : []
        }
        image.dir_name    = params._pid;
        for(let i = 0; i < params._images.length; i++){
            image.img_name.push(params._images[i].name);
        }
        await img_storage.create_dir(image);
        let image_count = (await fs.readdirSync(config.path + `${image.dir_name}/photo`).length) + params._images.length;
        if(image_count > config.max_count){
            return null;
        }
        await worker.correct_image(params);
        await worker.create_temp(params);
        
        return image;
    },

    correct_image   : async(params) => {
        // sharp(params._images[0])
        // .resize(100, 100, {
        //     fit: sharp.fit.inside,
        //     withoutEnlargement: true
        //   })
        // .then(img_storage.save_img(params, "photo"))
        await img_storage.save_img(params, "photo");
        return true;
    },

    create_temp     : async(params) => {
        await img_storage.save_img(params, "temp");
        return true
    },


}

module.exports = worker;