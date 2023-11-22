const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Middleware for Admin Authentication
const authenticateAdmin = (req, res, next) => {
    const reqAdmin = req.headers;
    const adminExists = ADMINS.find(admin => (admin.username === reqAdmin.username && admin.password === reqAdmin.password))
    if (adminExists) {
        next();
    } else {
        res.status(404).send("Admin not found");
    }
};

// Admin Routes
app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
    ADMINS.push({
        username: req.body.username,
        password: req.body.password
    })
    res.json({ message: 'Admin created successfully' });
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
    // logic to log in admin
    res.json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
    // logic to create a course
    const newCourse = req.body;
    const courseId = Math.floor(Math.random() * 100);
    COURSES.push({
        id: courseId,
        title: newCourse.title,
        description: newCourse.description,
        price: newCourse.price,
        imageLink: newCourse.imageLink,
        published: newCourse.published
    })
    res.json({ message: 'Course created successfully', courseId: courseId });
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
    // logic to edit a course
    const updatedCourse = req.body;
    const courseId = req.params.courseId;
    const index = COURSES.findIndex(course => course.id === courseId);
    if (index !== -1) {
        COURSES[index] = {
            id: courseId,
            title: updatedCourse.title,
            description: updatedCourse.description,
            price: updatedCourse.price,
            imageLink: updatedCourse.imageLink,
            published: updatedCourse.published
        };
        res.json({ message: 'Course updated successfully' });
    }
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
    // logic to get all courses
    res.json({ courses: COURSES });
});

// Middleware for User Authentication
const authenticateUser = (req, res, next) => {
    const reqUser = req.headers;
    const userExists = USERS.find(user => (user.username === reqUser.username && user.password === reqUser.password))
    if (userExists) {
        next();
    } else {
        res.status(404).send("User not found");
    }
};

// User routes
app.post('/users/signup', (req, res) => {
    // logic to sign up user
    USERS.push({
        username: req.body.username,
        password: req.body.password
    })
    res.json({ message: 'User created successfully' });
});

app.post('/users/login', (req, res) => {
    // logic to log in user
});

app.get('/users/courses', (req, res) => {
    // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
