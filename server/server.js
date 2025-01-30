const express = require("express");
const config = require("config");
const { Connection } = require("./mongoUtil.js");
const app = express();
const cors = require("cors");
const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: config.get("awsAccessKeyID"),
    secretAccessKey: config.get("awsSecretKeyID"),
    region: config.get("awsRegion")
});

const PORT = 8000;

app.use(express.json({ limit: "500mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "500mb", extended: true }))

Connection.open();

app.use("/save/files", require("./routes/files/upload.js"))

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
})