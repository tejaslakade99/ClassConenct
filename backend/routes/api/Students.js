const express = require("express");
const router = express.Router();
const { StudentModel } = require("../../models/StudentsModel");

router.get("/", (req, res) => {
  res.json({ student: "Students data is here" });
});

// Get All Students

router.get("/all-students", async (req, res) => {
  try {
    const students = await StudentModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ students });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/create-student", async (req, res) => {
  const { email, studentName, studentId, studentClass, password } = req.body;
  if (
    [email, studentName, studentClass, studentId, password].includes(
      "undefined"
    )
  ) {
    return res.json({ error: "All fields are required" });
  }
  try {
    const student = await StudentModel.create(req.body);
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Single Student
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await StudentModel.find({ studentId: id });
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await StudentModel.findOneAndDelete({ studentId: id });
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Create Student
// Delete Student
// Update Student

module.exports = router;
