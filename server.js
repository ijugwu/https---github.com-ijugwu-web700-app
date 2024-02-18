/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Julius Ugwu Student ID: 120796230  Date: 17-2-2024
*
********************************************************************************/ 





// Import required modules
const express = require("express"); // Import Express.js framework
const path = require("path"); // Import path module for file path operations
const collegeData = require("./modules/collegeData"); // Import custom module for college data
const app = express(); // Create Express application instance
const port = process.env.PORT || 8080; // Define port number, use environment variable if available, otherwise default to 8080

// Initialize collegeData module
collegeData.initialize()
  .then(() => {
    // Define routes for handling HTTP requests

    // Route to get all students or students by course
    app.get("/students", (req, res) => {
      const course = req.query.course; // Extract course query parameter from request URL
      if (course) {
        // If course parameter is provided, fetch students by course
        collegeData.getStudentsByCourse(parseInt(course))
          .then(students => res.json(students)) // Send JSON response with student data
          .catch(() => res.json({ message: "no results" })); // Handle errors
      } else {
        // If no course parameter provided, fetch all students
        collegeData.getAllStudents()
          .then(students => res.json(students)) // Send JSON response with student data
          .catch(() => res.json({ message: "no results" })); // Handle errors
      }
    });

    // Route to get teaching assistants
    app.get("/tas", (req, res) => {
      collegeData.getTAs()
        .then(tas => res.json(tas)) // Send JSON response with teaching assistants data
        .catch(() => res.json({ message: "no results" })); // Handle errors
    });

    // Route to get available courses
    app.get("/courses", (req, res) => {
      collegeData.getCourses()
        .then(courses => res.json(courses)) // Send JSON response with course data
        .catch(() => res.json({ message: "no results" })); // Handle errors
    });

    // Route to get student by student number
    app.get("/student/:num", (req, res) => {
      const num = req.params.num; // Extract student number parameter from request URL
      collegeData.getStudentByNum(parseInt(num))
        .then(student => res.json(student)) // Send JSON response with student data
        .catch(() => res.json({ message: "no results" })); // Handle errors
    });

    // Route to serve home page
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "home.html")); // Send home.html file as response
    });

    // Route to serve about page
    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "about.html")); // Send about.html file as response
    });

    // Route to serve HTML demo page
    app.get("/htmlDemo", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "htmlDemo.html")); // Send htmlDemo.html file as response
    });

    // 404 route - handle requests for non-existent routes
    app.use((req, res) => {
      res.status(404).send("Page Not Found"); // Send "Page Not Found" message for requests with non-existent routes
    });

    // Start the server and listen for incoming requests on specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`); // Log message to indicate server is running
    });
  })
  .catch(err => {
    console.error(`Error initializing collegeData: ${err}`); // Log error if collegeData initialization fails
  });
