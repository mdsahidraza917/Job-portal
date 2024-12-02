const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRoute = require("./routes/user")
const jobRoute = require("./routes/job")
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "first.html"));
});
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/job",jobRoute);


mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("mongoDB is Connected");
}).catch((err)=>{
    console.log(err);
})


app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})
