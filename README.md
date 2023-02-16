# Dall-E 2 Starter

<h3>Who is this for?</h3>

This starter application is for developers, artists or anyone routinely interacting with the Dall-E 2 API from OpenAI. It provides a quick and easy way to interact with the API through a web browser without needing to write code.

You can add your OpenAI API Key and request image generations, variations, or edits. You can manually adjust the generation quantity and resolution, and automatically save the resulting images locally.

<img src="https://user-images.githubusercontent.com/119073511/219451667-83b28137-5334-4ef2-95e8-d69b4b210ccb.gif" style="width:500px; border: 1px solid rgba(0,0,0,.3);" title="image showing browser interface">

<h3>Features</h3>
<ul>
<li>Access Dall-E 2 generation using API.</li>
<li>Generation, Variation, or Edit endpoints.</li>
<li>Generate images without corner logo.</li>
<li>Mask images for Edit endpoints in-browser using canvas editor.</li>
<li>Save image generations locally, automatically.</li>
<li>Adjust generation quantity and resolution.</li>
</ul>

<h3>Starting the server</h3>

```bash
# Clone repository
git clone https://github.com/darrylschaefer/dalle2-starter/ sampleproject

# Change directory
cd sampleproject

# Install dependencies
npm install

# Add API key to environment.env in root folder
OPENAI_API_KEY=""

# Start app
npm run build

# Open client
Start your internet browser, and type in the address: http://localhost:3000
```

<h3>Requesting Generations</h3>

To request image generations, visit http://localhost:3000 in your web browser after the server has started. Enter the desired prompt, resolution (default is 1024x1024), and quantity (default is 1), then click 'submit' to send the API request. If 'save locally' is checked (by default it is), the file will save to the /generations folder in the root of your application.

For image variations and edits, the image data is pulled from their respective canvas elements (set at 1024x1024). Make sure there's transparency if you're requesting an edit, you can make transparency using the eraser tool (example in video section).

<h3>Built using</h3>

<ul>
<li>Node / Express</li>
<li>Jade</li>
<li>TailwindCSS / Flowbite</li>
<li>Fabric.JS (canvas element)</li>
</ul>


<h3>Images / Video</h3>


<img src="https://user-images.githubusercontent.com/119073511/219452995-1abde8b6-e21a-4956-b230-00f87b47e7fd.png" width="45%"></img>
<img src="https://user-images.githubusercontent.com/119073511/219453164-5e1b0449-1298-40a8-b77e-f7cd17860efc.jpg" width="45%"></img>
