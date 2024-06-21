var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { ProfilPelajar } = require("../models");

const v = new Validator();

// get all data profil pelajar
router.get("/", async (req, res) => {
  const profilPelajar = await ProfilPelajar.findAll();

  //   jika tidak ada data
  if (profilPelajar.length === 0) {
    return res.json({ message: "Data profil pelajar kosong" });
  }
  res.json(profilPelajar);
});

// get data profil pelajar by id
router.get("/:id", async (req, res) => {
  const profilPelajar = await ProfilPelajar.findOne({
    where: { idProfil: req.params.id },
  });

  //   jika data tidak ditemukan
  if (!profilPelajar) {
    return res.json({ message: "Data profil pelajar tidak ditemukan" });
  }

  res.json(profilPelajar);
});

// create data profil pelajar
router.post("/", async (req, res) => {
  const schema = {
    dimensi: "string",
    elemen: "string",
  };

  const valid = v.validate(req.body, schema);

  //   cek validasi
  if (valid.length) {
    return res.status(400).json(valid);
  }

  const profilPelajar = await ProfilPelajar.create(req.body);

  res.json(profilPelajar);
});

// edit data profil pelajar
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const profilPelajar = await ProfilPelajar.findByPk(id);

  //   cek data di db
  if (!profilPelajar) {
    return res.json({ message: "Data profil pelajar tidak ditemukan" });
  }

  const schema = {
    dimensi: "string|optional",
    elemen: "string|optional",
  };

  const valid = v.validate(req.body, schema);

  //   cek validasi
  if (valid.length) {
    return res.status(400).json(valid);
  }

  await profilPelajar.update(req.body);

  res.json(profilPelajar);
});

// delete data profil pelajar
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const profilPelajar = await ProfilPelajar.findByPk(id);

  //   cek data di db
  if (!profilPelajar) {
    return res.json({ message: "Data profil pelajar tidak ditemukan" });
  }

  await profilPelajar.destroy();

  res.json({ message: "Data profil pelajar berhasil dihapus" });
});

module.exports = router;
