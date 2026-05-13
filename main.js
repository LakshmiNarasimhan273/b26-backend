const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const dbConnection = require("./config/dbConnection");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

app.use(cors());

app.use(express.json());
    
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);  

dbConnection();
app.listen(process.env.port, () => {
    console.log(`Server up and running ${process.env.port}`)
});