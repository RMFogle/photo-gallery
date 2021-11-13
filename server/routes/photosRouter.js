import express from 'express';
import multer from 'multer';

import { getPhotos, getPhoto, createPhoto, deletePhoto } from '../controllers/photoCtrl.js';

const router = express.Router(); 

const upload = multer({
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
        cb(new Error('only upload files with jpg or jpeg format.'));
        }
        cb(undefined, true); // continue with upload
    }
    });

router.get('/photos', getPhotos);
router.post('/photos', upload.single('photo'), createPhoto); 
router.get('/photos/:id', getPhoto); 
router.delete('/photos/:id', deletePhoto); 

export default router;