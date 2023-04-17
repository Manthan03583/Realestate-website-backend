const path = require('path')
const multer = require('multer')

var PropertyImageStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './backend/uploads/propertyImages/')
    },
    filename: (req, file, cb) =>{
        let ext = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`
        cb(null, ext)
    }
    
});

var uploadPropertyImages = multer({
    storage: PropertyImageStorage,
    fileFilter: (req, file, callback) =>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true)
        }else{
            callback(new Error('only jpg, jpeg & png files are supported'), false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

var AgentsImageStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './backend/uploads/agentImages/')
    },
    filename: (req, file, cb) =>{
        let ext = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`;
        cb(null,ext)
    }
    
});

var uploadAgentsImage = multer({
    storage: AgentsImageStorage,
    fileFilter: (req, file, callback) =>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true)
        }else{
            callback(new Error('only jpg, jpeg & png files are supported'), false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

var UsersImageStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './backend/uploads/userImages/')
    },
    filename: (req, file, cb) =>{
        let ext = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`
        cb(null, ext)
    }
    
});

var uploadUsersImage = multer({
    storage: UsersImageStorage,
    fileFilter: (req, file, callback) =>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true)
        }else{
            callback(new Error('only jpg, jpeg & png files are supported'), false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});



module.exports = {
    uploadPropertyImages,
    uploadAgentsImage,
    uploadUsersImage
};
