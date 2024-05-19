import express from 'express';
import dotenv from 'dotenv';
import employeeRouter from './Routes/employee.js';

dotenv.config

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Request from url: " + req.url);
    next();
});


app.get('/', (req, res) => {
    res.send('Welcome to the Thug Inc! Next Level gaming Company')
});

app.use("/api/employees",  employeeRouter);

app.use((err, req, res, next) => {
    res.status(500).send('Server Error')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});