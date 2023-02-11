const router = require("express").Router();
const fs = require("fs");
const aws = require("aws-sdk");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/docs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = (db) => {
  //

  // save file to 'public/docs' as indicated on line ~5
  router.post("/", upload.single("testAudio.mp3"), (req, res) => {
    // reording in req.body.audioFile?
    // make new S3 object
    const s3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
    console.log("READING MULTER>>", req.file.filename);
    //read incoming file to send to S3
    const file = fs.createReadStream(req.file.path);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.file.filename,
      Body: file,
      ContentType: "image/jpg image/png",
      ACL: "public-read",
    };

    
    const postInDb = async (params) => {
      try {
        const qs = `
          INSERT INTO images (receipt_id, name, image_url)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const result = await db.query(qs, params);
        return result.rows[0];
      } catch (error) {
        console.log(error);
        throw new Error(">>Can not post to db<<");
      }
    };
    
    //send file to s3 which returns an object with link to file in bucket. link is in data.data.Location
    //const s3Output = await s3.upload(params).promise()

    s3.upload(params, async (err, data) => {
      if (err) {
        let errorData = {
          error: true,
          message: err,
        };
        res.send(errorData);
        return err;
      }
      let img_name = data.Location;
      let img_url = data.Location;
      let receipt_id = req.body.receipt_id;

      const output = await postInDb([img_name, img_url, receipt_id]);
      console.log("s3 upload >>>>>>>", output);
      return res.json(output);
    });
  });
  return router;
};