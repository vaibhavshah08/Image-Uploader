import User from '../models/user.model.js';
import Image from '../models/image.model.js';
import { errorHandler } from '../utils/error.js';

export const createImage = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }
    const { imageName, image } = req.body;
    const newImage = new Image({
      imageName,
      image,
      user: req.user.id,
    });

    const savedImage = await newImage.save();
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { images: savedImage._id } },
      { new: true }
    );
    res.status(201).json({ success: true, message: 'Image created successfully' });
  } catch (error) {
    console.error('Error creating image:', error);
    next(errorHandler(500, 'Internal server error'));
  }
};

export const getImages = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }
    const userId = req.params.id;
    const images = await Image.find({ user: userId });
    res.json({ success: true, images: images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch images' });
  }
}