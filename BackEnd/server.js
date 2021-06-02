const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const { users, tasks } = require("./data");

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Log In
app.get("/api/user", (req, res) => {
  console.log(req.body);
  let user = users.find((u) => u.email === req.body.email);
  if (user) {
    res
      .status(200)
      .json({ success: true, data: user, msg: "Successfully logged in!" });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      msg: "No Such User Existed!",
    });
  }
});

// Sign Up
app.post("/api/user", (req, res) => {
  console.log(req.body);
  let user = users.find((u) => u.email === req.body.email);
  if (!user) {
    res
      .status(200)
      .json({ success: true, msg: "Account Created Successfully!" });
  } else {
    res.status(400).json({
      success: false,
      msg: "User with the email account already existed!",
    });
  }
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  console.log(req.query);
  if (req.query.userId) {
    let filteredTasks = tasks.filter((t) => t.userId === +req.query.userId);
    res.status(200).json({
      success: true,
      data: filteredTasks,
      msg: "Tasks are fetched Successfully!",
    });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      msg: "No such user exists!",
    });
  }
});

// Save new task
app.post("/api/task", (req, res) => {
  console.log(req.body);
  if (req.body.taskName && req.body.userId) {
    let user = users.find((u) => u.userId === req.body.userId);
    if (user) {
      tasks.push({ taskName: req.body.taskName, userId: req.body.userId });
      res.status(200).json({
        success: true,
        data: tasks,
        msg: "New Task saved Successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        msg: "User does not Exist!",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      data: null,
      msg: "Task Name is Empty!",
    });
  }
});

// Delete a task
app.delete("/api/task", (req, res) => {
  console.log(req.body);
  let taskIndex = tasks.findIndex((t) => t.taskId === req.body.taskId);
  if (taskIndex >= 0) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({
      success: true,
      data: tasks,
      msg: "Task deleted Successfully!",
    });
  } else {
    res.status(200).json({
      success: false,
      data: null,
      msg: "No Such Task Exists!",
    });
  }
});

// 404 Response
app.use("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, data: null, msg: "No Resource Found!" });
});

app.listen(2000, () => {
  console.log("Server Listening on port 2000....");
});
