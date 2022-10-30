const firebaseApp = require("../config/firebaseModule");
const express = require("express");
const cors = require("cors");
const Fauth = firebaseApp.auth();

const router = express.Router();
router.use(cors());
router.options("*", cors);

router.post("/user/new", async (req, res, next) => {
  const { email, password } = req.body;
  await Fauth.createUser({
    email: email,
    password: password,
  })
    .then((credential) => {
      const { uid } = credential;
      res.status(200).json({
        msg: "유저가 만들어졌습니다",
      });
      console.log(uid);
    })
    .catch((err) => {
      res.status(400).json({ errr });
    });
});

router.get("/helloworld", async (req, res, next) => {
  const email = {
    email: "codename@code.com",
    password: "12345678",
  };
  await Fauth.createUser({
    email: email.email,
    password: email.password,
  })
    .then((credential) => {
      const { uid } = credential;
      console.log("$$$$$$$$$$$____$$$$$$$$$$$", uid);
    })
    .catch((err) => {
      console.log("$$$$$$$$$$$____$$$$$$$$$$$", err);
    });

  res.json({
    msg: "helloword",
  });
});

module.exports = router;
