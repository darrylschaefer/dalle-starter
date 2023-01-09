const {
  Configuration,
  OpenAIApi
} = require("openai");
const configuration = new Configuration({
  apiKey: "APIKEYHERE",
});
const openai = new OpenAIApi(configuration);
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var fs = require('fs')
var request = require('request');

const imageFolder = './generations';

if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}


/* GET completion #1. */
router.post('/completion', async function(req, res, next) {
  var prompt = req.body;
  const response = await openai.createImage({
    prompt: prompt.promptText,
    n: parseInt(prompt.promptNum),
    size: prompt.promptRes,
  });

  res.send(response.data.data)

  if (prompt.promptSave == true) {

    for (i = 0; i < response.data.data.length; i++) {
      let promptName = (prompt.promptText.substring(0, 150) + " -- " + prompt.promptTime.substring(0, 50) + " -- " + i).replace(/[/\\?%*:|"<>]/g, '-');
      const file = fs.createWriteStream(imageFolder + '/' + promptName + '.jpg');
      request(response.data.data[i].url).pipe(file);
    }
  }
});


module.exports = router;
