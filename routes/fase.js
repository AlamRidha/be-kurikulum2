var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Fase } = require("../models");
const { Kelas } = require("../models");
const { Semester } = require("../models");
const { MataPelajaran } = require("../models");

const v = new Validator();

// ------------------- Fase -------------------
// get all data fase
router.get("/", async (req, res) => {
  try {
    const fase = await Fase.findAll();
    if (fase.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res.status(200).json({ status: "success", msg: "Data Found", data: fase });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data fase
router.post("/", async (req, res) => {
  try {
    const schema = {
      namaFase: "string",
    };

    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const fase = await Fase.create(req.body);
    res.status(201).json({
      status: "success",
      msg: "Fase Successfully Created",
      data: fase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// delete fase
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fase = await Fase.findByPk(id);

    if (!fase) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await fase.destroy();

    res.status(200).json({
      status: "success",
      msg: "Fase Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// ------------------- Kelas -------------------
// get all data kelas
router.get("/:faseId/kelas", async (req, res) => {
  try {
    const faseId = req.params.faseId;

    const kelas = await Kelas.findAll({
      where: { idFase: faseId },
    });

    if (kelas.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res.status(200).json({ status: "success", msg: "Data Found", data: kelas });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data kelas
router.post("/:faseId/kelas", async (req, res) => {
  try {
    const faseId = req.params.faseId;
    const kelasName = req.body;

    const schema = {
      namaKelas: "string",
    };

    const validate = v.validate(kelasName, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const kelas = await Kelas.create({
      namaKelas: req.body.namaKelas,
      idFase: faseId,
    });

    res.status(201).json({
      status: "success",
      msg: "Kelas Successfully Created",
      data: kelas,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// ------------------- Semester -------------------
// get all data semester
router.get("/kelas/:kelasId/semester", async (req, res) => {
  try {
    const idKelas = req.params.kelasId;

    const semester = await Semester.findAll({
      where: { idKelas: idKelas },
    });

    if (semester.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: semester });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data semester
router.post("/kelas/:kelasId/semester", async (req, res) => {
  try {
    const idKelas = req.params.kelasId;
    const semesterName = req.body;

    const schema = {
      namaSemester: "string",
    };

    const validate = v.validate(semesterName, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const semester = await Semester.create({
      namaSemester: req.body.namaSemester,
      idKelas: idKelas,
    });
    res.status(201).json({
      status: "success",
      msg: "Semester Created Succesfully",
      data: semester,
    });
    // res.status(201).json(parseInt(faseId));
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// ------------------- Mata Pelajaran -------------------
// get all data mata pelajaran
router.get("/semester/:semesterId/mp", async (req, res) => {
  try {
    const semesterId = req.params.semesterId;

    const mataPelajaran = await MataPelajaran.findAll({
      where: { idSemester: semesterId },
    });

    if (mataPelajaran.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: mataPelajaran });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// get mata pelajaran by id
router.get("/mp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mataPelajaran = await MataPelajaran.findByPk(id);

    if (!mataPelajaran) {
      return res.status(404).json({ status: "success", msg: "Data Not Found" });
    }

    res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: mataPelajaran });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data mata pelajaran
router.post("/semester/:semesterId/mp", async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
    const mataPelajaranName = req.body;

    const schema = {
      namaMataPelajaran: "string",
      tahunAjaran: "string",
    };

    const validate = v.validate(mataPelajaranName, schema);

    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    const mataPelajaran = await MataPelajaran.create({
      namaMataPelajaran: req.body.namaMataPelajaran,
      tahunAjaran: req.body.tahunAjaran,
      idSemester: semesterId,
    });

    res.status(201).json({
      status: "success",
      msg: "Mata Pelajaran Successfully Created",
      data: mataPelajaran,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// delete mata pelajaran
router.delete("/mp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mataPelajaran = await MataPelajaran.findByPk(id);

    if (!mataPelajaran) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await mataPelajaran.destroy();
    res.status(200).json({
      status: "success",
      msg: "Mata Pelajaran Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

module.exports = router;
