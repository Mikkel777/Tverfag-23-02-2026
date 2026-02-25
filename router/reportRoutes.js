const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const { requireLogin, isAdmin } = require("../middleware/auth");


//ADMIN
router.get('/admin/reports', requireLogin, isAdmin, async (req, res) => {

    const reports = await Report.find()
        .populate("reviewId")
        .sort({ createdAt: -1 });
    res.render("adminReports", { reports });
});

// REPORT
router.post('/report/:id', requireLogin, async (req, res) => {
    try {
        await Report.create({
            reviewId: req.params.id,
            reportedBy: req.session.username,
            reason: req.body.reason
        });
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

module.exports = router;