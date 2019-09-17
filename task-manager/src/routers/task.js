const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

// api task
router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body, //adds all body fields
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

//GET /tasks?completed=boolean
//GET /tasks?limit&skip
//GET /tasks?sortBy=createdAt_asc/desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === "true";
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1 //-1 = desc , 1 = asc
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id});
        console.log(req.user)
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        console.log(req.user)

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send("Not found")
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const updates = Object.keys(body);
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send("Invalid updates")
    }

    try {

        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send("Not found")
        }

        updates.forEach((update) => task[update] = body[update])

        await task.save();
        res.send(task);

    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            res.status(404).send("not found");
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router