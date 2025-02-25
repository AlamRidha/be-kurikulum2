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
    elemen: "array", // for react app
    // elemen: "string",
  };

  const valid = v.validate(req.body, schema);

  //   cek validasi
  if (valid.length) {
    return res.status(400).json(valid);
  }

  try {
    const dataToCreate = { ...req.body };
    if (Array.isArray(req.body.elemen)) {
      dataToCreate.elemen = JSON.stringify(req.body.elemen);
      console.log("Data to create", dataToCreate.elemen);
    }
    const profilPelajar = await ProfilPelajar.create(dataToCreate);
    res.json(profilPelajar);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ message: "Error creating data" });
  }
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
    elemen: "array|optional",
    // elemen: "string|optional",
  };

  const valid = v.validate(req.body, schema);

  try {
    const dataToUpdate = { ...req.body };
    if (Array.isArray(req.body.elemen)) {
      dataToUpdate.elemen = JSON.stringify(req.body.elemen);
    }
    await profilPelajar.update(dataToUpdate);
    res.json(profilPelajar);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error updating data" });
  }
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
