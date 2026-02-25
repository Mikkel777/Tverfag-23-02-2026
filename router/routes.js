const express = require('express');
const router = express.Router();
const { requireLogin, isAdmin } = require("../middleware/auth");
const Review = require('../models/review');

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.render('index', { reviews });
    } catch (err) {
        console.error(err);
        res.send("Database error");
    }
});

// Rate routes, get and post

router.get('/rate', requireLogin, async (req, res) => {
    try {
        const reviews = await Review.find().sort({createdAt: -1});
        res.render('rate', { reviews});
    } catch (err) {
        console.errror(err);
        res.send("Db error");
    }
});

router.post('/rate', async (req, res) => {
    try {
        const { sitename, url, rating, comment} = req.body;
        const newReview = new Review ({
            sitename,
            url,
            rating,
            comment,
            username: req.session.username
        });
        await newReview.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error while saving the review");
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const review = await Review.findbyid(req.params.id);
        if(!review) {
            return res.status(404).send("Review couldnt be found");
        }
        const loggedUser = req.session.username;
        //ADMIN
        if (
            review.username !== loggedUser &&
            loggedUser !== "Admin"
        ) {
            return res.status(403).send("Du kan ikke slette denne vurderingen.");
        }
        await Review.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete error");
    }
});

// Upvotes and downvotes

router.post('/upvote/:id', async (req, res) => {
    try {
        await Review.findByIdAndUpdate(
            req.params.id,
            {$inc: {upvotes:1}}
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Upvote error");
    }
});

router.post('/downvote/:id', async (req, res) => {
    try {
        await Review.findByIdAndUpdate(
            req.params.id,
            {$inc: {downvotes:1}}
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Downvote error");
    }
});

router.get('/faq', (req, res) => {
    res.render('faq');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

module.exports = router;