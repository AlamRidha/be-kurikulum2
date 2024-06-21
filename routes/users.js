var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Users } = require("../models");

const v = new Validator();

// create user
router.post("/", async (req, res, next) => {
  const schema = {
    nip: "string",
    nameUser: "string",
    password: "string|min: 5",
    email: "string",
    noHp: "string|max:13",
    bidangMataPelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // res.send("ok");
  const user = await Users.create(req.body);

  res.json(user);
});

// update data
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let user = await Users.findByPk(id);

  // cek user di db
  if (!user) {
    return res.status(400).json({ msg: "User tidak ditemukan" });
  }

  const schema = {
    nip: "string|optional",
    nameUser: "string|optional",
    password: "string|min: 5|optional",
    email: "string|optional",
    noHp: "string|max:13|optional",
    bidangMataPelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  user = await user.update(req.body);
  res.json(user);
});

// get all data
router.get("/", async (req, res) => {
  const users = await Users.findAll();

  return res.json(users);
});

// get data by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);

  // // cek user di db
  // if (!user) {
  //   return res.status(400).json({ msg: "User tidak ditemukan" });
  // }

  return res.json(user || {});
});

// delete user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);

  // cek user di db
  if (!user) {
    return res.status(404).json({ msg: "User tidak ditemukan" });
  }

  await user.destroy();

  res.json({
    msg: "user berhasil dihapus",
  });
});

// user login
router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  const user = await Users.findOne({
    where: {
      nip,
      password,
    },
  });

  if (!user) {
    return res.status(400).json({ msg: "User tidak ditemukan" });
  }

  res.json(user);
});

module.exports = router;
