const Ad = require('../models/ads.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find().populate('user'));
    } catch(err) {
        res.status(500).json({ message: err });
      }
}

exports.getById = async (req, res) => {
    try {
        const ad = Ad.findOne(req.params._id).populate('user');
        if(!ad) res.status(404).json({ message: 'Not found' });
        else res.json(await ad);

    } catch(err) {
        res.status(500).json({ message: err });
      }
}
exports.getSearch = async (req, res) => {
    try {
        const { title } = req.body;
        if ({$regex: req.params.searchPhrase, $options: 'i'} === title) {
             res.json(await Ad.find(title).populate('user'));
        } else {
            res.status(404).json({ message: 'Ad Not found' })
        }
    } catch(err) {
        res.status(500).json({ message: {err} });
      }
}
exports.post = async (req, res) => {
    try {
        const {title, content, date, price, location} = req.body;
        const { image } = req.file;
        const { user } = req.session.login;
        const fileType = image ? await getImageFileType(image) : 'unknown';
        if (title && content && date && price && location && user && image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        const newAd = new Ad({title: title, content: content, date: date, image: image, price: parseInt(price), location: location, user: user});
        await newAd.save();
        res.json({ message: 'Ad added' });
        } else {
            fs.unlinkSync(image.path);
            res.status(400).send({ message: 'Bad request'});
        }
    } catch(err) {
        res.status(500).json({ message: err });
      }
}
exports.put = async (req, res) => {
    try {
        const {title, content, date, price, location} = req.body;
        const { image } = req.file;
        const fileType = image ? await getImageFileType(image) : 'unknown';

        const ad = await Ad.findById(req.params.id);
        if(ad) {
            const updatedAd = await Ad.updateOne({_id: req.params.id}, {$set: {title: title, content: content, date: date, image: image, price: parseInt(price), location: location}}, {new: true});
            res.json(updatedAd);
            if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                image = req.file;
                res.json(updatedAd({$set: {image: image}}));
            }
        }  else {
            fs.unlinkSync(image.path);
            res.status(404).json({ message: 'Ad Not found...' })
        }
    } catch(err) {
        res.status(500).json({ message: err });
      }
}
exports.delete = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await Ad.deleteOne({_id: req.params.id})
            res.json({ message: 'OK' });
        } 
        else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
      }
}