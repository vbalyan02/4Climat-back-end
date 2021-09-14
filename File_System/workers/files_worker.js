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
        await worker.create_standart(params);   
        return image;
    },

    create_standart     : async(params) => {
        let res = await img_storage.save_img(params, "photo");
        fs.writeFile(config.path + `${params._pid}/photo/${params._images[0].name}`, params._images[0].data, function(err){
            if(!err){
                console.log("VALID");
            }else{
                console.log(params._images[0]);
                return false;
            };
        });
        await worker.create_temp(params);
        return res;
    },

    create_temp         : async(params) => {
        for(let i = 0; i < params._images.length; i++){
            sharp(config.path + `${params._pid}/photo/${params._images[i].name}`)
                .resize(100, 100)
                .toFile(config.path + `${params._pid}/temp/${params._images[i].name}`, function(err){
                    if(err){
                        console.log("ERROR KA : " + err + `:::` + config.path + `${params._pid}/photo/${params._images[i].name}`);
                    }
                })
        }
        return true;
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
        let flag;
        arr.length  = files.length;
        for(let i = 0; i < params.img_name.length; i++){
            flag = true;
            for(let j = 0; j < files.length; j++){
                if(params.img_name[i] === files[j]){
                    arr.found.push(params.img_name[i]);
                    flag = true;
                    break;
                } else{
                    flag = false;
                }
            }
            if(!flag)
                params.not_found.push(params.img_name[i]);

        }
        return arr;
    },

    get_images  : async(params) => {
        let image_pack = {
            dir_name        : params._pid,
            img_name        : params._images,
            standart_img    : [],
            small_img       : [],
            not_found       : []
        }
        let status                  = await worker.check_dir(image_pack);
        image_pack.img_name         = status.found;
        let images                  = await img_storage.get_images(image_pack);
        image_pack.standart_img     = images.standart_img;
        image_pack.small_img        = images.small_img;
        return image_pack;
    }

}

module.exports = worker;