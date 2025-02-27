var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { ProfilPelajar } = require("../models");

const v = new Validator();

// get all data profil pelajar
router.get("/", async (req, res) => {
  try {
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
      .json({ status: "success", msg: "Data Found", data: profilPelajar });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Kesalahan pada server",
      error: error.message,
    });
  }
});

// get data profil pelajar by id
router.get("/:id", async (req, res) => {
  try {
    const profilPelajar = await ProfilPelajar.findOne({
      where: { idProfil: req.params.id },
    });

    //   jika data tidak ditemukan
    if (!profilPelajar) {
      return res.status(404).json({
        status: "success",
        msg: "Data Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: profilPelajar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Kesalahan pada server",
      error: error.message,
    });
  }
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
      msg: "Profil Pelajar Succesfully Created",
      data: profilPelajar,
    });
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ status: "error", msg: "Error creating data" });
  }
});

// edit data profil pelajar
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profilPelajar = await ProfilPelajar.findByPk(id);

    if (!profilPelajar) {
      return res.status(404).json({
        status: "error",
        msg: "Data Not Found",
      });
    }

    const schema = {
      dimensi: "string|optional",
      elemen: "array|optional",
    };

    const valid = v.validate(req.body, schema);
    if (!valid) {
      return res.status(400).json({
        status: "error",
        msg: "Validation failed",
        errors: v.errors,
      });
    }

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
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

// delete data profil pelajar
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const profilPelajar = await ProfilPelajar.findByPk(id);

    //   cek data di db
    if (!profilPelajar) {
      return res.status(404).json({
        status: "success",
        msg: "Data Not Found",
      });
    }

    await profilPelajar.destroy();

    res.status(200).json({
      status: "success",
      msg: "Data Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ status: "error", msg: "Error deleting data" });
  }
});

module.exports = router;
