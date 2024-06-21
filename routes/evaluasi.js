var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Evaluasi } = require("../models");

const v = new Validator();

// get all data
router.get("/", async (req, res) => {
  const evaluasi = await Evaluasi.findAll();

  //   jika data kosong
  if (!evaluasi.length) {
    return res.status(400).json({ msg: "Data evaluasi kosong" });
  }

  return res.json(evaluasi);
});

// get data by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const evaluasi = await Evaluasi.findByPk(id);

  //   jika data kosong
  if (!evaluasi) {
    return res.status(400).json({ msg: "Data evaluasi tidak ditemukan" });
  }

  return res.json(evaluasi);
});

// create data
router.post("/", async (req, res, next) => {
  const schema = {
    namaFase: "string",
    semester: "string",
    mata_pelajaran: "string",
    jenis_evaluasi: "string",
    masalah_evaluasi: "string",
    status_evaluasi: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // res.send("ok");
  const evaluasi = await Evaluasi.create(req.body);

  res.status(201).json(evaluasi);
});

// update data
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let evaluasi = await Evaluasi.findByPk(id);

  // cek evaluasi di db
  if (!evaluasi) {
    return res.status(400).json({ msg: "Evaluasi tidak ditemukan" });
  }

  const schema = {
    namaFase: "string|optional",
    semester: "string|optional",
    mata_pelajaran: "string|optional",
    jenis_evaluasi: "string|optional",
    masalah_evaluasi: "string|optional",
    status_evaluasi: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  evaluasi = await evaluasi.update(req.body);
  res.json(evaluasi);
});

// delete data
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  let evaluasi = await Evaluasi.findByPk(id);

  // cek evaluasi di db
  if (!evaluasi) {
    return res.status(400).json({ msg: "Evaluasi tidak ditemukan" });
  }

  await evaluasi.destroy();
  res.json({ msg: "Data evaluasi berhasil dihapus" });
});

module.exports = router;
