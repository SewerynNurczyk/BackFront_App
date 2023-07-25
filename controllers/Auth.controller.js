const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');


exports.register = async (req, res) => {
    try {
        const { login, password, telephon } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        if (login && typeof login === 'string' && password && typeof password === 'string' && telephon && typeof telephon === 'string' && req.file && ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)) {
            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                return (
                    fs.unlinkSync(`./client/public/uploads/${req.file.filename}`),
                    res.status(409).send({ message: 'User with this login already exists' })
                );
            }
            const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, telephon });
            res.status(201).send({ message: 'User created' + user.login });
        } else {
            if (req.file){
                fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
              }
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

exports.login = async (req, res) => {

    try {
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                res.status(400).send('Login or password are incorrect');
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.login = {login: user.login, id: user.id};
                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send('Login or password are incorrect');
                }
            }
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy();
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getUser = async (req, res) => {
    res.send('I\'m logged');

};