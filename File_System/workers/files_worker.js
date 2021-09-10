const img_storage   = require("../storage/fs_storage");
const base64        = require("../../side_modules/base64");  
const fs            = require('fs');
const config        = require('../fs_config');
const sharp         = require('sharp');

const worker = {
    upload_images   : async(params) => {
        let image = {
            dir_name    : "",
            img_name    : []
        }
        image.dir_name    = params._pid;
        for(let i = 0; i < params._images.length; i++){
            image.img_name.push(params._images[i].name);
        }
        await img_storage.create_dir(image);
        let image_count = (fs.readdirSync(config.path + `${image.dir_name}/photo`).length) + params._images.length;
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
        let res = await img_storage.save_img(params, "photo");
        return res;
    },

    create_temp     : async(params) => {
        let res = await img_storage.save_img(params, "temp");
        return res;
    },

    delete_images   : async(params) => {
        let image = {
            dir_name    : "",
            img_name    : [],
            not_found   : []
        }
        image.dir_name      = params._pid;
        for(let i = 0; i < params._images.length; i++){
            image.img_name.push(params._images[i]);
        }
        let status          = await worker.check_dir(image);
        image.img_name      = status.found;
        if(image.img_name.length === status.length){
            img_storage.delete_dir(image);
        } else{
            img_storage.delete_images(image);
        }
        return image;
    },

    check_dir   : async(params) => {
        let arr = {
            found   : [],
            length  : 0
        };
        let files   = fs.readdirSync(config.path + `${params.dir_name}/photo`);
        let flag    = true;
        arr.length  = files.length;
        for(let i = 0; i < params.img_name.length; i++){
            for(let j = 0; j < files.length; j++){
                if(params.img_name[i] === files[j]){
                    arr.found.push(params.img_name[i]);
                    flag = true;
                } else{
                    flag = false;
                }
            }
            if(!flag)
                params.not_found.push(params.img_name[i]);

        }
        return arr;
    }



}

module.exports = worker;