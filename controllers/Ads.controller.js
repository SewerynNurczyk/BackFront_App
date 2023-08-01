const fs = require('fs');
const Ads = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType');
const user = require('../models/User.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ads.find().populate('user'));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const advert = await Ads.findById(req.params.id).populate('user');
        if (!advert) res.status(404).json({ message: 'Not found...' });
        else res.json(advert);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addAd = async (req, res) => {
    try {
        console.log(req.session);
        const { title, description, pubDate, price, location } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        if (title && description && price && location && pubDate && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const newAdvert = new Ads({ title: title, description: description, pubDate: pubDate, image: req.file.filename, price: price, location: location, user: req.session.user.id });
            await newAdvert.save();
            console.log('dupa');
            res.status(201).json({ message: 'Ok' });
        } else {
            if (req.file) {
                fs.unlinkSync(`./public/uploads/${req.file.filename}`);
            }
            res.status(400).send({ message: 'Bad request' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const advert = await Ads.findById(req.params.id);
        if (advert) {
            await Ads.deleteOne({ _id: req.params.id });
            res.json({ message: 'Deleted' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.uppdateAd = async (req, res) => {
    const { title, description, pubDate, price, location } = req.body;
    try {
        const advert = await Ads.findById(req.params.id);
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        if (advert) {
            advert.title = title;
            advert.description = description;
            advert.pubDate = pubDate;
            advert.price = price;
            advert.location = location;
            if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                advert.image = req.file.filename;
            }
            const updatedAdvert = await advert.save();
            res.json(updatedAdvert);
        }
        else {
            if (req.file) {
                fs.unlinkSync(`./public/uploads/${req.file.filename}`)
            }
            res.status(404).json({ message: 'Not found...' });
        }
    }
    catch (err) {
        if (req.file) {
            fs.unlinkSync(`./public/uploads/${req.file.filename}`)
        }
        res.status(500).json({ message: err });
    }
};

exports.searchPhrase = async (req, res) => {
    const { searchPhrase } = req.params;
    try {
        const advert = await Ads.find({ $text: { $search: searchPhrase } });
        if (!advert) return res.status(404).json({ message: 'Not found...' });
        else res.json(advert);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};