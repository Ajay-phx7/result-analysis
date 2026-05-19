const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const markRoutes = require("./routes/markRoutes");
const dashboardRoutes =
    require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Result Analysis API Running"
    });
});
app.use("/api/subjects", subjectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});