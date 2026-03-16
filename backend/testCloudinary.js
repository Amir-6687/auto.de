require('dotenv').config(); // اضافه شد
const cloudinary = require("./src/config/cloudinary");

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      { folder: "auto-de" }
    );
    console.log("UPLOAD SUCCESS:", result.secure_url);
  } catch (error) {
    console.error("UPLOAD FAILED:", error);
  }
}

testUpload();