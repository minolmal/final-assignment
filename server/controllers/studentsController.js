const asyncHandler = require("express-async-handler");
const db = require("../config/connectDB");

// @desc Get all students
// @route GET /students
// @access
const getAllStudents = asyncHandler((req, res) => {
  const sqlGetQuery = "SELECT * FROM students";
  db.promise()
    .query(sqlGetQuery)
    .then((result) => res.json(result[0]))
    .catch((error) => {
      return res.status(400).json({ message: "No students found" });
    });
});

// @desc Create new student
// @route POST /students
// @access
const createNewStudent = asyncHandler(async (req, res) => {
  const { name, age, contact } = req.body;

  // Confirm data
  if (!name || !age || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sqlPostQuery = "INSERT INTO students (name,age,contact) VALUES (?,?,?)";
  db.promise()
    .query(sqlPostQuery, [name, age, contact])
    .then((result) => res.status(201).json({ message: "New student created" }))
    .catch((err) => {
      res.status(400).json({ message: "Invalid student data received" });
    });
});

// @desc Update a student
// @route PATCH /students
// @access
const updateStudent = asyncHandler(async (req, res) => {
  const { name, age, contact, id } = req.body;

  // Confirm data
  if (!name || !age || !contact || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sqlUpdateQuery = "UPDATE students SET name = ?,age = ?,contact = ? WHERE id = ?";
  db.promise()
    .query(sqlUpdateQuery, [name, age, contact, id])
    .then((result) => res.json(`${id} updated`))
    .catch((error) => {
      res.status(400).json({ message: "Student not updated" });
    });
});

// @desc Delete student
// @route GET /students
// @access
const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Student ID required" });
  }

  const sqlDeleteQuery = "DELETE FROM students WHERE id = ?";
  db.promise()
    .query(sqlDeleteQuery, id)
    .then((result) => res.json(`${id} deleted`))
    .catch((error) => {
      res.status(400).json({ message: "Student not deleted" });
    });
});

module.exports = { getAllStudents, createNewStudent, updateStudent, deleteStudent };
