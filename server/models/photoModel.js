import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    photo: {
        type: Buffer,
    }, 
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

PhotoSchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
};

const PhotoGallerySchema = mongoose.model('Photo', PhotoSchema);

export default PhotoGallerySchema;