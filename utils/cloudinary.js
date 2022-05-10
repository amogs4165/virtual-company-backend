import { v2 as cloudinary } from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({ 
    cloud_name: 'virtual-company', 
    api_key: '633472112372157', 
    api_secret: 'Rb3paybOPQC9sSXJsXkej0xb_vg' 
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'test-images',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => 'computed-filename-using-request',
    },
  });
   
  const parser = multer({ storage: storage });
export default parser;