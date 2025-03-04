var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { CapaianPembelajaran } = require("../models");
const { TujuanPembelajaran } = require("../models");
const { AlurTujuanPembelajaran } = require("../models");
const { ModulPembelajaran } = require("../models");
const { Asesmen } = require("../models");
const { parse } = require("dotenv");

const v = new Validator();

// ------------------- Capaian Pembelajaran -------------------
// get all data capaian pembelajaran
router.get("/:idMp/capaian_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;

    const capaian_pembelajaran = await CapaianPembelajaran.findAll({
      where: { idMp: idMp },
    });

    if (capaian_pembelajaran.length === 0) {
      return res.status(404).json({
        status: "success",
        msg: "Data Empty",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: capaian_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// get data capaian pembelajaran by id
router.get("/capaian_pembelajaran/:idCp", async (req, res) => {
  try {
    const idCp = req.params.idCp;
    const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

    if (!capaian_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: capaian_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// create data capaian pembelajaran
router.post("/:idMp/capaian_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const schema = {
      elemen: "string",
      capaian_pembelajaran: "string",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const capaian_pembelajaran = await CapaianPembelajaran.create({
      elemen: req.body.elemen,
      capaian_pembelajaran: req.body.capaian_pembelajaran,
      idMp: idMp,
    });

    res.status(201).json({
      status: "success",
      msg: "Capaian Pembelajaran Successfuly Created",
      data: capaian_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// delete capaian pembelajaran
router.delete("/capaian_pembelajaran/:idCp", async (req, res) => {
  try {
    const idCp = req.params.idCp;
    const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

    if (!capaian_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await capaian_pembelajaran.destroy();
    res.json({
      status: "success",
      msg: "Capaian Pembelajaran Succesfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// update capaian pembelajaran
router.put("/capaian_pembelajaran/:idCp", async (req, res) => {
  try {
    const idCp = req.params.idCp;
    let dataCapaian = await CapaianPembelajaran.findByPk(idCp);

    if (!dataCapaian) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    const schema = {
      elemen: "string|optional",
      capaian_pembelajaran: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    dataCapaian = await dataCapaian.update(req.body);

    res.status(200).json({
      status: "success",
      msg: "Data Capaian Succesfully Updated",
      data: dataCapaian,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// ------------------- Tujuan Pembelajaran -------------------
// get all data tujuan pembelajaran
router.get("/:idMp/tujuan_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const tujuan_pembelajaran = await TujuanPembelajaran.findAll({
      where: { idMp: idMp },
      include: [
        {
          model: CapaianPembelajaran,
          as: "capaian_pembelajaran",
          attributes: ["idCp", "elemen"],
        },
      ],
    });

    if (tujuan_pembelajaran.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// get data tujuan pembelajaran by id
router.get("/tujuan_pembelajaran/:idTp", async (req, res) => {
  try {
    const idTp = req.params.idTp;
    const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

    if (!tujuan_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// create data tujuan pembelajaran
router.post("/:idMp/tujuan_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const schema = {
      idCp: "number",
      tujuan_pembelajaran: "string",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    // const idConvert = parseInt(req.body.idCp);

    const tujuan_pembelajaran = await TujuanPembelajaran.create({
      // idCp: idConvert,
      idCp: req.body.idCp,
      tujuan_pembelajaran: req.body.tujuan_pembelajaran,
      idMp: idMp,
    });

    res.status(201).json({
      status: "success",
      msg: "Tujuan Pembelajaran Succesfully Created",
      data: tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// delete tujuan pembelajaran
router.delete("/tujuan_pembelajaran/:idTp", async (req, res) => {
  try {
    const idTp = req.params.idTp;
    const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

    if (!tujuan_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await tujuan_pembelajaran.destroy();
    res.status(200).json({
      status: "success",
      msg: "Tujuan Pembelajaran berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// update tujuan pembelajaran
router.put("/tujuan_pembelajaran/:idTp", async (req, res) => {
  try {
    const idTp = req.params.idTp;
    let dataTujuan = await TujuanPembelajaran.findByPk(idTp);

    if (!dataTujuan) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    const schema = {
      idCp: "number|optional",
      tujuan_pembelajaran: "string|optional",
    };

    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    dataTujuan = await dataTujuan.update(req.body);
    res.status(200).json({
      status: "success",
      msg: "Tujuan Pembelajaran Successfully Updated",
      data: dataTujuan,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// ------------------- Alur Tujuan Pembelajaran -------------------
// get all data alur tujuan pembelajaran
router.get("/:idMp/alur_tujuan_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findAll({
      where: { idMp: idMp },
    });

    if (alur_tujuan_pembelajaran.length === 0) {
      return res.status(404).json({
        status: "success",
        msg: "Data Empty",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: alur_tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// get data alur tujuan pembelajaran by id
router.get("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  try {
    const idAtp = req.params.idAtp;
    const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findByPk(
      idAtp
    );

    if (!alur_tujuan_pembelajaran) {
      return res.status(404).json({
        status: "error",
        msg: "Data Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Data Found",
      data: alur_tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// create data alur tujuan pembelajaran
router.post("/:idMp/alur_tujuan_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const schema = {
      tahap: "string",
      alur_tujuan_pembelajaran: "string",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.create({
      tahap: req.body.tahap,
      alur_tujuan_pembelajaran: req.body.alur_tujuan_pembelajaran,
      idMp: idMp,
    });

    res.status(201).json({
      status: "success",
      msg: "Alur Tujuan Pembelajaran Succesfully Created",
      data: alur_tujuan_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// delete alur tujuan pembelajaran
router.delete("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  try {
    const idAtp = req.params.idAtp;
    const alur_tujuan_pembelajaran = await AlurTujuanPembelajaran.findByPk(
      idAtp
    );

    if (!alur_tujuan_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await alur_tujuan_pembelajaran.destroy();

    res.status(200).json({
      status: "success",
      msg: "Alur Tujuan Pembelajaran Succesfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// update alur tujuan pembelajaran
router.put("/alur_tujuan_pembelajaran/:idAtp", async (req, res) => {
  try {
    const idAtp = req.params.idAtp;
    let dataAlur = await AlurTujuanPembelajaran.findByPk(idAtp);

    if (!dataAlur) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    const schema = {
      tahap: "string|optional",
      alur_tujuan_pembelajaran: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    dataAlur = await dataAlur.update(req.body);

    res.status(200).json({
      status: "success",
      msg: "Alur Data Pembelajaran Succesfully Updated",
      data: dataAlur,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// ------------------- Modul Pembelajaran -------------------
// get all data modul pembelajaran
router.get("/:idMp/modul_pembelajaran", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const modul_pembelajaran = await ModulPembelajaran.findAll({
      where: { idMp: idMp },
    });

    if (modul_pembelajaran.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: modul_pembelajaran });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// get data modul pembelajaran by id
router.get("/modul_pembelajaran/:idModul", async (req, res) => {
  try {
    const idModul = req.params.idModul;
    const modul_pembelajaran = await ModulPembelajaran.findByPk(idModul);

    if (!modul_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: modul_pembelajaran });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// create data modul pembelajaran
router.post("/:idMp/modul_pembelajaran", async (req, res) => {
  try {
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
      return res.status(400).json({ status: "error", msg: validate });
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

    res.status(201).json({
      status: "success",
      msg: "Modul Pembelajaran Succesfully Created",
      data: modul_pembelajaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// delete modul pembelajaran
router.delete("/modul_pembelajaran/:idModul", async (req, res) => {
  try {
    const idModul = req.params.idModul;
    const modul_pembelajaran = await ModulPembelajaran.findByPk(idModul);

    if (!modul_pembelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await modul_pembelajaran.destroy();

    res.status(200).json({
      status: "success",
      msg: "Modul Pembelajaran Succesfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// update modul pembelajaran
router.put("/modul_pembelajaran/:idModul", async (req, res) => {
  try {
    const idModul = req.params.idModul;
    let dataModul = await ModulPembelajaran.findByPk(idModul);

    if (!dataModul) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
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
      return res.status(400).json({ status: "error", msg: validate });
    }

    dataModul = await dataModul.update(req.body);
    res.status(200).json({
      status: "success",
      msg: "Modul Pembelajaran Succesfully Updated",
      data: dataModul,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// asesmen
// get all data asesmen
router.get("/:idMp/asesmen", async (req, res) => {
  try {
    const idMp = req.params.idMp;

    const asesmen = await Asesmen.findAll({
      where: { idMp: idMp },
    });

    if (asesmen.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: asesmen });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// get data asesmen by id
router.get("/asesmen/:idAsesmen", async (req, res) => {
  try {
    const idAsesmen = req.params.idAsesmen;
    const asesmen = await Asesmen.findByPk(idAsesmen);

    if (!asesmen) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: asesmen });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data asesmen
router.post("/:idMp/asesmen", async (req, res) => {
  try {
    const idMp = req.params.idMp;
    const schema = {
      namaBab: "string",
      jenisAsesmen: "string",
      bentukAsesmen: "string",
      keterangan: "string",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const asesmen = await Asesmen.create({
      namaBab: req.body.namaBab,
      jenisAsesmen: req.body.jenisAsesmen,
      bentukAsesmen: req.body.bentukAsesmen,
      keterangan: req.body.keterangan,
      idMp: idMp,
    });

    res.status(201).json({
      status: "success",
      msg: "Asesmen Succesfully Created",
      data: asesmen,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// update asesmen
router.put("/asesmen/:idAsesmen", async (req, res) => {
  try {
    const idAsesmen = req.params.idAsesmen;
    let dataAsesmen = await Asesmen.findByPk(idAsesmen);

    if (!dataAsesmen) {
      return res.status(400).json({ status: "error", msg: "Data Not Found" });
    }

    const schema = {
      namaBab: "string|optional",
      jenisAsesmen: "string|optional",
      bentukAsesmen: "string|optional",
      keterangan: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    dataAsesmen = await dataAsesmen.update(req.body);
    res.status(200).json({
      status: "success",
      msg: "Asesmen Updated Succesfully",
      data: dataAsesmen,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

// delete asesmen
router.delete("/asesmen/:idAsesmen", async (req, res) => {
  try {
    const idAsesmen = req.params.idAsesmen;
    const asesmen = await Asesmen.findByPk(idAsesmen);

    if (!asesmen) {
      return res
        .status(404)
        .json({ status: "error", msg: "Asesmen Not Found" });
    }

    await asesmen.destroy();
    res.status(200).json({
      status: "success",
      msg: "Asesmen Succesfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
});

module.exports = router;
