const firebaseApp = require("../config/firebaseModule");
const express = require("express");
const cors = require("cors");
const Fauth = firebaseApp.auth();
const Fdatabase = firebaseApp.database();
const fStorage = require("firebase/compat/storage");
const router = express.Router();
router.use(cors());
router.options("*", cors);

router.post("/user/new", (req, res, next) => {
  console.log("/user/new$$req.body", req.body);
  const { email, password, nickname } = req.body;
  Fauth.createUser({
    email,
    password,
    displayName: nickname,
  })
    .then((credential) => {
      const { uid } = credential;

      Promise.all([
        Fdatabase.ref(`users/${uid}/profile`).set({
          email,
          password,
          timestamp: Date.now(),
        }),
        Fdatabase.ref(`statics/nicknames/${uid}`).set(nickname),
      ])
        .then(() => {
          res.status(200).json({
            msg: "유저가 만들어졌습니다",
          });
        })
        .catch((err) => {
          res.status(400).json({ err });
        });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

router.post("/feed/new", (req, res, next) => {
  const { feed, profile, timestamp } = req.body;
  const { uid } = profile;
  // console.log(uid);
  // console.log("$$feed$$", feed);
  Fdatabase.ref("feed")
    .push({
      feed,
      profile,
      timestamp: Date.now(),
    })
    .then((snapshot) => {
      const fid = snapshot.key;
      // console.log("$$fid$$", fid);
      Fdatabase.ref(`users/${uid}/feed`)
        .push(fid)
        .then(() => {
          res.status(200).json({
            msg: "피드가 올라갔습니다.",
          });
        })
        .catch((err) => {
          res.status(401).json({ err });
        });
    })
    .catch((err) => {
      res.status(402).json({ err });
    });
});

router.post("/user/profile/image", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`/users/${uid}/profile/image`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          image: snapshot.val(),
        });
      } else {
        res.status(400).json({
          image: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});
router.post("/user/profile/quote", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`/users/${uid}/profile/quote`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          quote: snapshot.val(),
        });
      } else {
        res.status(400).json({
          quote: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});
router.post("/user/feed", (req, res, next) => {
  const { uid } = req.body;

  Fdatabase.ref("feed")
    .orderByChild("profile/uid")
    .equalTo(uid)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        const feedlength = Object.keys(value).length;
        res.status(200).json({
          feed: Object.values(value),
          msg: `피드가 ${feedlength}개 존재 합니다.`,
        });
      } else {
        res.status(200).json({
          feed: [],
          msg: "피드가 존재하지 않습니다.",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});
// router.get("/helloworld", (req, res, next) => {
//   const email = {
//     email: "codename@code.com",
//     password: "12345678",
//   };
//   Fauth.createUser({
//     email: email.email,
//     password: email.password,
//   })
//     .then((credential) => {
//       const { uid } = credential;
//       console.log("$$$$$$$$$$$____$$$$$$$$$$$", uid);
//     })
//     .catch((err) => {
//       console.log("$$$$$$$$$$$____$$$$$$$$$$$", err);
//     });

//   res.json({
//     msg: "helloword",
//   });
// });

module.exports = router;
