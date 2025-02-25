var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const upload = require("../config/multerConfig");
const { Kurikulum } = require("../models");
const v = new Validator();

// Rute untuk menampilkan semua data kurikulum
router.get("/", async (req, res) => {
  try {
    const kurikulum = await Kurikulum.findAll();

    if (kurikulum.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: kurikulum });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data
router.post("/", upload.single("linkKurikulum"), async (req, res) => {
  try {
    const { namaKurikulum, tahun } = req.body;
    const linkKurikulum = req.file ? req.file.filename : null;

    const newKurikulum = await Kurikulum.create({
      namaKurikulum,
      tahun,
      linkKurikulum,
    });

    res.status(201).json({
      status: "success",
      msg: "Data Successful Created",
      data: newKurikulum,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// delete data
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const kurikulum = await Kurikulum.findByPk(id);

    if (!kurikulum) {
      return res.status(404).json({ status: "success", msg: "Data Not Found" });
    }

    await kurikulum.destroy();

    res
      .status(200)
      .json({ status: "success", msg: "Data Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

module.exports = router;
