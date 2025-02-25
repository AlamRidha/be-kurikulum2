var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

// JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";
var jwt = require("jsonwebtoken");

const { Users } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const v = new Validator();

// tes token middleware
router.get("/hello", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      msg: "Hello",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Terjadi kesalahan server",
      error: error.message,
    });
  }
});

// user login
router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  try {
    // check data in database with nip and password
    const user = await Users.findOne({
      where: {
        nip,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "Error",
        msg: "NIP atau Password salah",
      });
    }

    // data save to token
    const payload = {
      idUser: user.idUser,
      nip: user.nip,
      nameUser: user.nameUser,
    };

    // generate token with expires 1hour
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      status: "success",
      msg: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Terjadi kesalahan server",
      error: error.message,
    });
  }
});

// create user
router.post("/", authMiddleware, async (req, res, next) => {
  const schema = {
    nip: "string",
    nameUser: "string",
    password: "string|min: 5",
    email: "string",
    noHp: "string|max:13",
    bidangMataPelajaran: "string",
  };

  try {
    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        msg: "Ada field yang belum diisi",
        data: validate,
      });
    }

    // take nip from req.body
    const { nip } = req.body;

    // cek duplicate nip
    const existingUser = await Users.findOne({ where: { nip } });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        msg: "NIP sudah terdaftar",
      });
    }

    // res.send("ok");
    const user = await Users.create(req.body);
    return res.status(201).json({
      status: "success",
      msg: "Berhasil membuat akun",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Gagal membuat user",
      error: error.message,
    });
  }
});

// update data
router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;

  let user = await Users.findByPk(id);

  const schema = {
    nip: "string|optional",
    nameUser: "string|optional",
    password: "string|min: 5|optional",
    email: "string|optional",
    noHp: "string|max:13|optional",
    bidangMataPelajaran: "string|optional",
  };

  try {
    // cek user di db
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", msg: "User tidak ditemukan" });
    }

    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        msg: "Ada input yang salah",
        validate: validate,
      });
    }

    user = await user.update(req.body);
    return res.status(200).json({
      status: "success",
      msg: "Data berhasil diupdate",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Kesalahan pada server",
      error: error.message,
    });
  }
});

// get all data
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({
      status: "success",
      msg: "Data berhasil diambil",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Data tidak ditemukan",
      error: error.message,
    });
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        msg: "User tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "User ditemukan",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Kesalahan pada server",
      error: error.message,
    });
  }
});

// delete user
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);

  try {
    // cek user in database
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", msg: "User tidak ditemukan" });
    }

    // delete the data
    await user.destroy();
    return res.status(200).json({
      status: "success",
      msg: "user berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Kesalahan pada server",
      error: error.message,
    });
  }
});

module.exports = router;
