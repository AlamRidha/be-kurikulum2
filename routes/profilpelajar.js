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
    return res.status(404).json({
      status: "success",
      msg: "Data profil pelajar kosong",
    });
  }

  res
    .status(200)
    .json({ status: "success", msg: "Data ada", data: profilPelajar });
});

// get data profil pelajar by id
router.get("/:id", async (req, res) => {
  const profilPelajar = await ProfilPelajar.findOne({
    where: { idProfil: req.params.id },
  });

  //   jika data tidak ditemukan
  if (!profilPelajar) {
    return res.status(404).json({
      status: "success",
      msg: "Data Profil Not Found",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "Data Found",
    data: profilPelajar,
  });
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
    return res.status(400).json({ status: "error", msg: valid });
  }

  try {
    const dataToCreate = { ...req.body };
    if (Array.isArray(req.body.elemen)) {
      dataToCreate.elemen = JSON.stringify(req.body.elemen);
      console.log("Data to create", dataToCreate.elemen);
    }
    const profilPelajar = await ProfilPelajar.create(dataToCreate);
    res.status(200).json({
      status: "success",
      msg: "Profil pelajar succesfully created",
      data: profilPelajar,
    });
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ status: "error", msg: "Error creating data" });
  }
});

// edit data profil pelajar
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const profilPelajar = await ProfilPelajar.findByPk(id);

  //   cek data di db
  if (!profilPelajar) {
    return res.status(404).json({
      status: "success",
      msg: "Data Profil Pelajar Not Found",
    });
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
    res.status(200).json({
      status: "success",
      msg: "Data Updated Successfully",
      data: profilPelajar,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ status: "error", msg: "Error updating data" });
  }
});

// delete data profil pelajar
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const profilPelajar = await ProfilPelajar.findByPk(id);

  //   cek data di db
  if (!profilPelajar) {
    return res.status(404).json({
      status: "success",
      msg: "Data Profil Pelajar Not Found",
    });
  }

  await profilPelajar.destroy();

  res.status(200).json({
    status: "success",
    msg: "Data Profil Pelajar Deleted Successfully",
  });
});

module.exports = router;
