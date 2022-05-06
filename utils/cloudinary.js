import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'virtual-company', 
    api_key: '633472112372157', 
    api_secret: 'Rb3paybOPQC9sSXJsXkej0xb_vg' 
  });

export default cloudinary;