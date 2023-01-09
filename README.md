# node-dalle2-boilerplate

A boilerplate Node / Express app built for interacting with <b>Dall-E 2 (OpenAI) API</b> through a web browser.

You can add your OpenAI API Key and request image generations, adjust the generation quantity and resolution, and save the resulting images locally. Currently limited to the /generations endpoint (image from prompt), but /variations (similar image from image) is coming soon.

<img src="https://user-images.githubusercontent.com/119073511/210887185-202d88f5-f25e-4d91-91b0-cc5f6b3bd1bf.png" width="450" title="image showing browser interface">


<h3>Features</h3>
<ul>
<li>Access Dall-E 2 generation using API</li>
<li>Save image generations locally, automatically</li>
<li>Adjust generation quantity and resolution</li>
</ul>

<h3>Starting the server</h3>

```bash
# Clone repository
git clone https://github.com/darrylschaefer/node-dalle2-boilerplate/ sampleproject

# Change directory
cd sampleproject

# Install dependencies
npm install

# Add API key to /routes/request.js, line 6
const configuration = new Configuration({
  apiKey: "APIKEYHERE",
});

# Start app
npm start

# Open client
Start your internet browser, and type in the address: http://localhost:3000
```

<h3>Requesting generations</h3>

To request image generations, visit http://localhost:3000 in your web browser. Enter the desired prompt, resolution (default is 1024x1024), and quantity (default is 1), then click 'submit' to send the API request. If you would like the resulting images to be saved locally, check the 'save locally' checkbox - the file will save to the /generations folder in the root of your application.