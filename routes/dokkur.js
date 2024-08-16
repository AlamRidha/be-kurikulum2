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
    res.status(200).json(kurikulum);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch kurikulum." });
  }
});

// Rute untuk menambahkan data kurikulum beserta upload file PDF
router.post("/", upload.single("linkKurikulum"), async (req, res) => {
  try {
    const { namaKurikulum, tahun } = req.body;
    const linkKurikulum = req.file ? req.file.filename : null;

    const newKurikulum = await Kurikulum.create({
      namaKurikulum,
      tahun,
      linkKurikulum,
    });

    res.status(201).json(newKurikulum);
  } catch (error) {
    res.status(500).json({ error: "Failed to create kurikulum." });
  }
});

// delete data
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const kurikulum = await Kurikulum.findByPk(id);

  if (!kurikulum) {
    return res.status(404).json({ msg: "Data kurikulum tidak ditemukan" });
  }

  await kurikulum.destroy();

  res.json({ msg: "Data buku berhasil dihapus" });
});

module.exports = router;
