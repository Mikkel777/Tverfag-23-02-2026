const express = require('express');
const router = express.Router();
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

router.get('/rate', async (req, res) => {
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
            comment
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
        await Review.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error deleting review");
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

module.exports = router;