const img_storage   = require("../storage/fs_storage");
const base64        = require("../../side_modules/base64");  
const fs            = require('fs');

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
        await worker.correct_image(params);
        await worker.create_tamp(params);
        
        return image;
    },

    correct_image   : async(params) => {
        await img_storage.save_img(params, "photo");
        return true;
    },

    create_tamp     : async(params) => {
        await img_storage.save_img(params, "tamp");
        return true
    }
}

module.exports = worker;