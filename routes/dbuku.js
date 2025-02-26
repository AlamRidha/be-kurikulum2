var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Buku } = require("../models");

const v = new Validator();

// get all data
router.get("/", async (req, res) => {
  try {
    const dataBuku = await Buku.findAll();

    if (dataBuku.length === 0) {
      return res.status(404).json({ status: "success", msg: "Data Empty" });
    }

    return res
      .status(200)
      .json({ status: "success", msg: "Data Found", data: dataBuku });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// get data by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataBuku = await Buku.findByPk(id);

    if (!dataBuku) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    return res
      .status(200)
      .json({ status: "success", msg: "Data Found", sdata: dataBuku });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// create data buku
router.post("/", async (req, res) => {
  try {
    const schema = {
      namaBuku: "string",
      linkBuku: "string",
    };

    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    // res.send("ok");
    const buku = await Buku.create(req.body);

    res.status(200).json({
      status: "success",
      msg: "Buku Successfully Created",
      data: buku,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// update data
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let buku = await Buku.findByPk(id);

    if (!buku) {
      return res
        .status(400)
        .json({ status: "error", msg: "Buku tidak ditemukan" });
    }

    const schema = {
      namaBuku: "string|optional",
      linkBuku: "string|optional",
    };

    const validate = v.validate(req.body, schema);
    // cek validasi
    if (validate.length) {
      return res.status(400).json({ status: "error", msg: validate });
    }

    buku = await buku.update(req.body);

    res.status(200).json({
      status: "success",
      msg: "Buku Successfully Updated",
      data: buku,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

// delete data
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const buku = await Buku.findByPk(id);

    if (!buku) {
      return res.status(404).json({ status: "error", msg: "Data Not Found" });
    }

    await buku.destroy();

    res
      .status(200)
      .json({ status: "success", msg: "Buku Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

module.exports = router;
