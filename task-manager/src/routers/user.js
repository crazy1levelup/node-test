const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail,sendAccountCancelationEmail} = require('../emails/account')
//api user

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });

    } catch (e) {
        res.status(400).send(e)
    }
});


router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();

        res.send()
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token === req.token;
        })
        await req.user.save();
        res.send("all users loged out")
    } catch (e) {
        res.status(500).send();
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
});

// router.get('/users/:id', async (req, res) => {

//     const _id = req.params.id;
//     console.log(_id)
//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send("User not found")
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// });

router.patch('/users/me', auth, async (req, res) => {

    const body = req.body;
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(body)
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: "invalid updates" })
    }

    try {

        updates.forEach((update) => req.user[update] = body[update])

        await req.user.save()
        // const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true }); //id/ body/ option to return the updated user instead of the old one/to have validator

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(_id);
        // if (!user) {
        //     return res.status(404).send("not found")
        // }
        await req.user.remove();
        sendAccountCancelationEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
});

//upload
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("plz upload an img"))
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save()
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    try {
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router;