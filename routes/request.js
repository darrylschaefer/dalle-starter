require("dotenv").config({
  path: "./environment.env",
});
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var fs = require("fs");
var request = require("request");

const imageFolder = "./generations";

if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

/* Generation completion */
router.post("/generation", async function (req, res, next) {
  var prompt = req.body;

  try {
    let options = {
      prompt: prompt.promptText,
      n: parseInt(prompt.promptNum),
      size: prompt.promptRes,
      response_format: "b64_json",
      model: prompt.promptModel,
    };

    if (prompt.promptModel === "dall-e-3") {
      options.style = prompt.promptStyle; // assuming `promptStyle` attribute is sent
      options.quality = prompt.promptQuality; // assuming `promptQuality` attribute is sent
    }

    const response = await openai.createImage(options);

    res.send(response.data.data);

    console.log(response.data.data);

    if (prompt.promptSave == true) {
      for (i = 0; i < response.data.data.length; i++) {
        let promptName = (
          prompt.promptText.substring(0, 150) +
          " - " +
          prompt.promptTime.substring(0, 50) +
          " - " +
          i
        ).replace(/[/\\?%*:|"<>]/g, "-");
        const filePath = imageFolder + "/" + promptName + ".jpg";
        fs.writeFile(
          filePath,
          response.data.data[i].b64_json,
          "base64",
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Something went wrong.",
    });
  }
});

/* Variation completion */
router.post("/variation", async function (req, res, next) {
  var prompt = req.body;

  const base64 = prompt.imageData.split(",")[1];
  const buf = Buffer.from(base64, "base64");
  buf.name = "image.png";

  try {
    const response = await openai.createImageVariation(
      buf,
      parseInt(prompt.promptNum),
      prompt.promptRes,
      `b64_json`
    );

    res.send(response.data.data);

    if (prompt.promptSave == true) {
      for (i = 0; i < response.data.data.length; i++) {
        let promptName = (
          "Variation - " +
          prompt.promptTime.substring(0, 50) +
          " - " +
          i
        ).replace(/[/\\?%*:|"<>]/g, "-");
        const filePath = imageFolder + "/" + promptName + ".jpg";
        fs.writeFile(
          filePath,
          response.data.data[i].b64_json,
          "base64",
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Something went wrong.",
    });
  }
});

/* Variation completion */
router.post("/edits", async function (req, res, next) {
  var prompt = req.body;

  const base64 = prompt.imageData.split(",")[1];
  const buf = Buffer.from(base64, "base64");
  buf.name = "image.png";

  try {
    const response = await openai.createImageEdit(
      buf,
      buf,
      prompt.promptText,
      parseInt(prompt.promptNum),
      prompt.promptRes,
      `b64_json`
    );

    res.send(response.data.data);

    if (prompt.promptSave == true) {
      for (i = 0; i < response.data.data.length; i++) {
        let promptName = (
          "Edit - " +
          prompt.promptTime.substring(0, 50) +
          " - " +
          i
        ).replace(/[/\\?%*:|"<>]/g, "-");
        const filePath = imageFolder + "/" + promptName + ".jpg";
        fs.writeFile(
          filePath,
          response.data.data[i].b64_json,
          "base64",
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Something went wrong.",
    });
  }
});

module.exports = router;
