var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Buku } = require("../models");

const v = new Validator();

// get all data
router.get("/", async (req, res) => {
  const dataBuku = await Buku.findAll();
  return res.json(dataBuku);
});

// get data by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const dataBuku = await Buku.findByPk(id);

  if (!dataBuku) {
    return res.status(404).json({ msg: "Data buku tidak ditemukan" });
  }

  return res.json(dataBuku);
});

// create data buku
router.post("/", async (req, res) => {
  const schema = {
    namaBuku: "string",
    linkBuku: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // res.send("ok");
  const buku = await Buku.create(req.body);

  res.json(buku);
});

// update data
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let buku = await Buku.findByPk(id);

  // cek buku di db
  if (!buku) {
    return res.status(400).json({ msg: "Buku tidak ditemukan" });
  }

  const schema = {
    namaBuku: "string|optional",
    linkBuku: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  buku = await buku.update(req.body);

  res.json(buku);
});

// delete data
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const buku = await Buku.findByPk(id);

  if (!buku) {
    return res.status(404).json({ msg: "Data buku tidak ditemukan" });
  }

  await buku.destroy();

  res.json({ msg: "Data buku berhasil dihapus" });
});

module.exports = router;
