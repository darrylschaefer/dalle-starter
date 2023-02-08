# dalle2-starter

A starter application built on Node / Express for interacting with the <b>Dall-E 2 (OpenAI) API</b> through a web browser. 

You can add your OpenAI API Key and request image generations, variations, or edits. You can manually adjust the generation quantity and resolution, and automatically save the resulting images locally.

<img src="https://user-images.githubusercontent.com/119073511/216674749-8d83e277-a83f-498d-86ab-be765bc8f68a.png" title="image showing browser interface">


<h3>Features</h3>
<ul>
<li>Access Dall-E 2 generation using API.</li>
<li>Generation, Variation, or Edit endpoints.</li>
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

# Add API key to environment.key in root folder
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

<img src="https://user-images.githubusercontent.com/119073511/216699457-be310a94-b2bc-45e1-88ef-923caf000c19.gif" width="45%"></img> <img src="https://user-images.githubusercontent.com/119073511/216700456-0eb68c73-ba1e-4462-a63e-b6cf77cc127b.jpg" width="45%"></img> <img src="https://user-images.githubusercontent.com/119073511/216700527-0def09a5-1b15-46d2-95ba-eae7a8ef25a6.png" width="45%"></img>