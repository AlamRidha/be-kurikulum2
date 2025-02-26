var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Evaluasi } = require("../models");

const v = new Validator();

// get all data
router.get("/", async (req, res) => {
  try {
    const evaluasi = await Evaluasi.findAll();

    //   jika data kosong
    if (!evaluasi.length) {
      return res.status(400).json({ status: "success", msg: "Data Empty" });
    }

    return res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: evaluasi,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const evaluasi = await Evaluasi.findByPk(id);

    if (!evaluasi) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    return res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: evaluasi });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data
router.post("/", async (req, res, next) => {
  try {
    const schema = {
      namaKelas: "string",
      semester: "string",
      tahunPelajaran: "string",
      linkEvaluasi: "string",
      masalah_evaluasi: "string",
      status_evaluasi: "string",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    // res.send("ok");
    const evaluasi = await Evaluasi.create(req.body);

    res.status(201).json({
      status: "success",
      msg: "Evaluasi Successfully Created",
      data: evaluasi,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// update data
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let evaluasi = await Evaluasi.findByPk(id);

    // cek evaluasi di db
    if (!evaluasi) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    const schema = {
      namaKelas: "string|optional",
      semester: "string|optional",
      tahunPelajaran: "string|optional",
      linkEvaluasi: "string|optional",
      masalah_evaluasi: "string|optional",
      status_evaluasi: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    evaluasi = await evaluasi.update(req.body);
    res.status(200).json({
      status: "success",
      msg: "Evaluasi Successfully Updated",
      data: evaluasi,
    });
  } catch (error) {}
});

// delete data
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let evaluasi = await Evaluasi.findByPk(id);

    if (!evaluasi) {
      return res
        .status(400)
        .json({ status: "error", msg: "Evaluasi Not Found" });
    }

    await evaluasi.destroy();

    res
      .status(200)
      .json({ status: "success", msg: "Evaluasi Successfully Deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error });
  }
});

module.exports = router;
