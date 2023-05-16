import {v2 as cloudinary} from 'cloudinary';
import {CLOUD_NAME,API_KEY,API_SECRET} from '../config.js'


// Configuration 
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

// Upload
//funcion que exporta subir imagen a cloudinary
export const uploadImage= async filePath => {
  return await cloudinary.uploader.upload(filePath,{
    folder : 'mysql'
  })
}

//funcion que borra imagen de cloudinary

export const deleteImage = async (id) =>{
  return await cloudinary.uploader.destroy(id)
}