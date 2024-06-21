var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { CapaianPembelajaran } = require("../models");
const { TujuanPembelajaran } = require("../models");
const { AlurTujuanPembelajaran } = require("../models");
const { ModulPembelajaran } = require("../models");

const v = new Validator();

// ------------------- Capaian Pembelajaran -------------------
// get all data capaian pembelajaran
router.get("/:idMp/capaian_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const capaian_pembelajaran = await CapaianPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(capaian_pembelajaran);
});

// get data capaian pembelajaran by id
router.get("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

  if (!capaian_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  res.json(capaian_pembelajaran);
});

// create data capaian pembelajaran
router.post("/:idMp/capaian_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    elemen: "string",
    capaian_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const capaian_pembelajaran = await CapaianPembelajaran.create({
    elemen: req.body.elemen,
    capaian_pembelajaran: req.body.capaian_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(capaian_pembelajaran);
});

// delete capaian pembelajaran
router.delete("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

  if (!capaian_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  await capaian_pembelajaran.destroy();
  res.json({
    msg: "Capaian Pembelajaran berhasil dihapus",
  });
});

// update capaian pembelajaran
router.put("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  let dataCapaian = await CapaianPembelajaran.findByPk(idCp);

  if (!dataCapaian) {
    return res
      .status(400)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  const schema = {
    elemen: "string|optional",
    capaian_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataCapaian = await dataCapaian.update(req.body);
  res.json(dataCapaian);
});

// ------------------- Tujuan Pembelajaran -------------------
// get all data tujuan pembelajaran
router.get("/:idMp/tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(tujuan_pembelajaran);
});

// get data tujuan pembelajaran by id
router.get("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

  if (!tujuan_pembelajaran) {
    return res.status(404).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  res.json(tujuan_pembelajaran);
});

// create data tujuan pembelajaran
router.post("/:idMp/tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    elemen_capaian: "string",
    tujuan_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const tujuan_pembelajaran = await TujuanPembelajaran.create({
    elemen_capaian: req.body.elemen_capaian,
    tujuan_pembelajaran: req.body.tujuan_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(tujuan_pembelajaran);
});

// delete tujuan pembelajaran
router.delete("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

  if (!tujuan_pembelajaran) {
    return res.status(404).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  await tujuan_pembelajaran.destroy();
  res.json({
    msg: "Tujuan Pembelajaran berhasil dihapus",
  });
});

// update tujuan pembelajaran
router.put("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  let dataTujuan = await TujuanPembelajaran.findByPk(idTp);

  if (!dataTujuan) {
    return res.status(400).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  const schema = {
    elemen_capaian: "string|optional",
    tujuan_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataTujuan = await dataTujuan.update(req.body);
  res.json(dataTujuan);
});

// ------------------- Alur Tujuan Pembelajaran -------------------
// get all data alur tujuan pembelajaran
router.get("/:idMp/alur_tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(alur_tujuan_pembelajaran);
});

// get data alur tujuan pembelajaran by id
router.get("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  const idAtp = req.params.idAtp;
  const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findByPk(idAtp);

  if (!alur_tujuan_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Alur Tujuan Pembelajaran tidak ditemukan" });
  }

  res.json(alur_tujuan_pembelajaran);
});

// create data alur tujuan pembelajaran
router.post("/:idMp/alur_tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    tahap: "string",
    alur_tujuan_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.create({
    tahap: req.body.tahap,
    alur_tujuan_pembelajaran: req.body.alur_tujuan_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(alur_tujuan_pembelajaran);
});

// delete alur tujuan pembelajaran
router.delete("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  const idAtp = req.params.idAtp;
  const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findByPk(idAtp);

  if (!alur_tujuan_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Alur Tujuan Pembelajaran tidak ditemukan" });
  }

  await alur_tujuan_pembelajaran.destroy();
  res.json({
    msg: "Alur Tujuan Pembelajaran berhasil dihapus",
  });
});

// update alur tujuan pembelajaran
router.put("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  const idAtp = req.params.idAtp;
  let dataAlur = await AlurTujuanPembelajaran.findByPk(idAtp);

  if (!dataAlur) {
    return res
      .status(400)
      .json({ msg: "Alur Tujuan Pembelajaran tidak ditemukan" });
  }

  const schema = {
    tahap: "string|optional",
    alur_tujuan_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataAlur = await dataAlur.update(req.body);
  res.json(dataAlur);
});

// ------------------- Modul Pembelajaran -------------------
// get all data modul pembelajaran
router.get("/:idMp/modul_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const modul_pembelajaran = await ModulPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(modul_pembelajaran);
});

// get data modul pembelajaran by id
router.get("/modul_pembelajaran/:idModul", async (req, res) => {
  const idModul = req.params.idModul;
  const modul_pembelajaran = await ModulPembelajaran.findByPk(idModul);

  if (!modul_pembelajaran) {
    return res.status(404).json({ msg: "Modul Pembelajaran tidak ditemukan" });
  }

  res.json(modul_pembelajaran);
});

// create data modul pembelajaran
router.post("/:idMp/modul_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    tahun_penyusunan: "string",
    bab: "string",
    tema: "string",
    alokasi_waktu: "string",
    kompetensi_awal: "string",
    profil_pancasila: "string",
    sarana_prasarana: "string",
    model_pembelajaran: "string",
    tujuan_bab: "string",
    deskripsi_cp: "string",
    pemahaman: "string",
    kegiatan_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const modul_pembelajaran = await ModulPembelajaran.create({
    tahun_penyusunan: req.body.tahun_penyusunan,
    bab: req.body.bab,
    tema: req.body.tema,
    alokasi_waktu: req.body.alokasi_waktu,
    kompetensi_awal: req.body.kompetensi_awal,
    profil_pancasila: req.body.profil_pancasila,
    sarana_prasarana: req.body.sarana_prasarana,
    model_pembelajaran: req.body.model_pembelajaran,
    tujuan_bab: req.body.tujuan_bab,
    deskripsi_cp: req.body.deskripsi_cp,
    pemahaman: req.body.pemahaman,
    kegiatan_pembelajaran: req.body.kegiatan_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(modul_pembelajaran);
});

// delete modul pembelajaran
router.delete("/modul_pembelajaran/:idModul", async (req, res) => {
  const idModul = req.params.idModul;
  const modul_pembelajaran = await ModulPembelajaran.findByPk(idModul);

  if (!modul_pembelajaran) {
    return res.status(404).json({ msg: "Modul Pembelajaran tidak ditemukan" });
  }

  await modul_pembelajaran.destroy();
  res.json({
    msg: "Modul Pembelajaran berhasil dihapus",
  });
});

// update modul pembelajaran
router.put("/modul_pembelajaran/:idModul", async (req, res) => {
  const idModul = req.params.idModul;
  let dataModul = await ModulPembelajaran.findByPk(idModul);

  if (!dataModul) {
    return res.status(400).json({ msg: "Modul Pembelajaran tidak ditemukan" });
  }

  const schema = {
    tahun_penyusunan: "string|optional",
    bab: "string|optional",
    tema: "string|optional",
    alokasi_waktu: "string|optional",
    kompetensi_awal: "string|optional",
    profil_pancasila: "string|optional",
    sarana_prasarana: "string|optional",
    model_pembelajaran: "string|optional",
    tujuan_bab: "string|optional",
    deskripsi_cp: "string|optional",
    pemahaman: "string|optional",
    kegiatan_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataModul = await dataModul.update(req.body);
  res.json(dataModul);
});

module.exports = router;
