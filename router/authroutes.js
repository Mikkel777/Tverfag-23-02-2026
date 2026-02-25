const express = require("express");
const bcrypt = require("bcrypt");
const { requireLogin, isAdmin } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});


router.post('/signup', async (req, res) => {
    console.log("BODY:", req.body);
  try {
      // Henter data som brukeren har sendt fra skjemaet
    const { username, password, confirm } = req.body;

    //sjekker om felt er fylt ut
    if (!username || !password || !confirm) {
      return res.status(400).send("Missing fields");
    }
    // Sjekker om passord er riktig
    if (password !== confirm) {
      return res.status(400).send("Passwords dont match");
    }

    //Skal sjekke om bruker alleredet finnes
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).send("Username already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash });

    return res.redirect('/login');
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

//code for sign in / log in

router.post('/login', async (req, res)=> {
    // Henter brukernavn og passord fra login
    const {username, password} = req.body;

    //leter etter brukeren i databasen
    const user = await User.findOne({username});
    if(!user) return res.status(401).send("Wrong signin / login"); //hvis den ikke finner  sender feil melding

    //sammenligner passordet brukeren skrev med hashed passord
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).send("Wrong signin / login");

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.role = user.role; // for admin
    
    res.redirect('/');
});

// code for log out

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/profile', requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render("profile", {user});
});

router.post('/delete-user', requireLogin, async (req, res) => {
    try {
            const userId = req.session.userId;
    const username = req.session.username;
    const Review = require("../models/review");
    await Review.deleteMany({username});
    await User.findByIdAndDelete(userId);

    req.session.destroy(()=> {
        res.redirect("/");
    });

    } catch (err) {
        console.error(err);
        res.status(500).send("Kunne ikke slette brukeren");
    }
});


module.exports = router;