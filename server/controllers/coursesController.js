const asyncHandler = require("express-async-handler");
const db = require("../config/connectDB");

// @desc Get all courses
// @route GET /courses
// @access
const getAllCourses = asyncHandler(async (req, res) => {
  const sqlGetQuery = "SELECT * FROM courses";
  db.promise()
    .query(sqlGetQuery)
    .then((result) => res.json(result[0]))
    .catch((error) => {
      return res.status(400).json({ message: "No courses found" });
    });
});

// @desc Get one student
// @route GET /students
// @access
const getOneStudent = asyncHandler((req, res) => {
  const { id } = req.params;
  const sqlGetQuery = "SELECT * FROM students WHERE id=?";
  db.promise()
    .query(sqlGetQuery, id)
    .then((result) => res.json(result[0]))
    .catch((error) => {
      return res.status(400).json({ message: "No students found" });
    });
});

// @desc Create new course
// @route POST /courses
// @access
const createNewCourse = asyncHandler(async (req, res) => {
  const { title, credits, instructor } = req.body;

  // Confirm data
  if (!title || !credits || !instructor) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sqlPostQuery = "INSERT INTO courses (title,credits,instructor) VALUES (?,?,?)";
  db.promise()
    .query(sqlPostQuery, [title, credits, instructor])
    .then((result) => res.status(201).json({ message: "New course created" }))
    .catch((err) => {
      res.status(400).json({ message: "Invalid course data received" });
    });
});

// @desc Update a course
// @route UPDATE /courses
// @access
const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, credits, instructor } = req.body;

  // Confirm data
  if (!title || !credits || !instructor || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sqlUpdateQuery = "UPDATE courses SET title = ?,credits = ?,instructor = ? WHERE id = ?";
  db.promise()
    .query(sqlUpdateQuery, [title, credits, instructor, id])
    .then((result) => res.json(`${id} updated`))
    .catch((error) => {
      res.status(400).json({ message: "Course not updated" });
    });
});

// @desc Delete course
// @route GET /courses
// @access
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Course ID required" });
  }

  const sqlDeleteQuery = "DELETE FROM courses WHERE id = ?";
  db.promise()
    .query(sqlDeleteQuery, id)
    .then((result) => res.json(`${id} deleted`))
    .catch((error) => {
      res.status(400).json({ message: "Course not deleted" });
    });
});

module.exports = { getAllCourses, getOneStudent, createNewCourse, updateCourse, deleteCourse };
