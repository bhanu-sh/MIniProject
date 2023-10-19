const express = require("express");
const bcrypt = require("bcrypt");
const Model = require("../models/userModel");

const router = express.Router();

router.post("/add", (req, res) => {
  const { email, password, name, avatar, isAdmin } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      const newUser = new Model({
        email,
        password: hash,
        name,
        avatar,
        isAdmin,
      });

      newUser
        .save()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
});

router.get("/getall", (req, res) => {
  Model.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyemail/:email", (req, res) => {
  console.log(req.params.email);
  Model.findOne({ email: req.params.email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
  const { email, password, name, avatar, isAdmin } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      Model.findByIdAndUpdate(
        req.params.id,
        { email, password: hash, name, avatar, isAdmin },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Login failed" });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            res.status(401).json({ message: "Login failed" });
          } else {
            res.json(user);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
