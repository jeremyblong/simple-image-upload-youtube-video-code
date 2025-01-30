const config = require("config");
const aws = require("aws-sdk");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const s3Bucket = new aws.S3({ params: { Bucket: config.get("awsBucketName") }});

router.post("/", (req, res) => {
    const { acceptedFiles } = req.body;

    acceptedFiles.map(async (file) => {
        const { base64 } = file;
        const bufferValue = Buffer.from(base64.split(",")[1], "base64")
        const ContentType = base64.split(";")[0].split(":")[1];

        console.log("ContentType", ContentType);

        const result = await s3Bucket.putObject({ Key: uuidv4(), Body: bufferValue, ContentType }).promise();
        
        console.log("result", result);
    })
});

module.exports = router;