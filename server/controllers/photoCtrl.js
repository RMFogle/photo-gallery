import express from 'express'; 
import mongoose from 'mongoose';
import PhotoGallerySchema from '../models/photoModel.js';

const router = express.Router();
    
export const createPhoto = async (req, res) => {
        try {
        const photo = new PhotoGallerySchema(req.body);
        const file = req.file.buffer;
        photo.photo = file;

        await photo.save();
        res.status(201).send({ _id: photo._id });
        } catch (error) {
        res.status(500).send({
            upload_error: 'Error while uploading file...Try again later.'
        });
        }
    };

export const getPhotos = async (req, res) => {
    try {
        const photos = await PhotoGallerySchema.find({});
        res.send(photos);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
}

export const getPhoto = async (req, res) => {
    try {
        const result = await PhotoGallerySchema.findById(req.params.id);
        res.set('Content-Type', 'image/jpeg');
        res.send(result.photo);
    } catch (error) {
        res.status(400).send({ get_error: 'Error while getting photo.' });
    }
}

export const deletePhoto = async (req, res) => {
    const { id } = req.params; 

    await PhotoGallerySchema.findByIdAndRemove(id);

    res.json({ message: "Photo deleted successfully." });
}

export default router;