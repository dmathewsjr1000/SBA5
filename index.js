import express from "express";
import dotenv from "dotenv";
import employeeRouter from "./Routes/employee.js";
import employeeRouter from "./Routes/dept.js";
import employeeRouter from "./Routes/project.js";

dotenv.config();
// Port connection
const PORT = process.env.PORT || 5000;
// Connect Express
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Request from url: " + req.url);
  next();
});

// Landing on company page
app.get("/", (req, res) => {
  res.send("Welcome to the Thug Inc! Next Level gaming Company");
});
// Establishing Routes to different collections
app.use("/api/employees", employeeRouter);
app.use("/api/dept", employeeRouter);
app.use("/api/project", employeeRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
