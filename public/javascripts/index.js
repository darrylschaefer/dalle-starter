document.getElementById("tabs-input").addEventListener("change", function (e) {
  switch (e.target.selectedIndex) {
    case 0:
      // generation tab selected
      document.getElementById("generation").classList.remove("hidden");
      document.getElementById("variation").classList.add("hidden");
      document.getElementById("edits").classList.add("hidden");
      document.getElementById("model").disabled = false;

      //disable the "number of images" option, due to no dalle3 support
      document.getElementById("number").disabled = true;

      break;
    case 1:
      // variation tab selected
      document.getElementById("variation").classList.remove("hidden");
      document.getElementById("generation").classList.add("hidden");
      document.getElementById("edits").classList.add("hidden");
      document.getElementById("model").disabled = true;

      // set model selection to "dall-e-2"
      document.getElementById("model").selectedIndex = 1;

      // set size selection to "1024x1024"
      document.getElementById("size").selectedIndex = 2;

      //enable the "number of images" option, due to dalle2 support
      document.getElementById("number").disabled = false;

      // hide style and quality options
      document.getElementById("style").parentNode.classList.add("hidden");
      document.getElementById("quality").parentNode.classList.add("hidden");

      break;
    case 2:
      // edit tab selected
      document.getElementById("edits").classList.remove("hidden");
      document.getElementById("variation").classList.add("hidden");
      document.getElementById("generation").classList.add("hidden");
      document.getElementById("model").disabled = true;

      // set model selection to "dall-e-2"
      document.getElementById("model").selectedIndex = 1;

      // set size selection to "1024x1024"
      document.getElementById("size").selectedIndex = 2;

      //enable the "number of images" option, due to dalle2 support
      document.getElementById("number").disabled = false;

      // hide style and quality options
      document.getElementById("style").parentNode.classList.add("hidden");
      document.getElementById("quality").parentNode.classList.add("hidden");

      break;
  }
});

document.getElementById("model").addEventListener("change", function (e) {
  switch (e.target.selectedIndex) {
    case 0:
      // dall-e-3 selected, disable model index options 3 and 4, enable 0, 1, and 2
      document.getElementById("size").children[3].disabled = true;
      document.getElementById("size").children[4].disabled = true;
      document.getElementById("size").children[0].disabled = false;
      document.getElementById("size").children[1].disabled = false;
      document.getElementById("size").children[2].disabled = false;

      //set size to the universal option of 1024x1024
      document.getElementById("size").selectedIndex = 2;

      //disable the "number of images" option, due to no dalle3 support. reset to 1 image.
      document.getElementById("number").disabled = true;
      document.getElementById("number").selectedIndex = 0;

      // make style and quality options visible
      document.getElementById("style").parentNode.classList.remove("hidden");
      document.getElementById("quality").parentNode.classList.remove("hidden");

      break;
    case 1:
      // dall-e-2 selected, enable model index options 0 and 1, enable 2, disable 3 and 4
      document.getElementById("size").children[0].disabled = true;
      document.getElementById("size").children[1].disabled = true;
      document.getElementById("size").children[2].disabled = false;
      document.getElementById("size").children[3].disabled = false;
      document.getElementById("size").children[4].disabled = false;

      //set size to the universal option of 1024x1024
      document.getElementById("size").selectedIndex = 2;

      //enable the "number of images" option, due to dalle2 support
      document.getElementById("number").disabled = false;

      // hide style and quality options
      document.getElementById("style").parentNode.classList.add("hidden");
      document.getElementById("quality").parentNode.classList.add("hidden");

      break;
  }
});

document.onkeydown = function (e) {
  if (e.key === "Delete") {
    var currentCanvas = document.getElementById("tabs-input").selectedIndex;
    switch (currentCanvas) {
      case 1:
        variationCanvas.remove(variationCanvas.getActiveObject());
      case 2:
        editsCanvas.remove(editsCanvas.getActiveObject());
    }
  }
};

var variationCanvas = new fabric.Canvas("variation-canvas");
variationCanvas.setDimensions({
  width: 1024,
  height: 1024,
});

var editsCanvas = new fabric.Canvas("edits-canvas");
editsCanvas.setDimensions({
  width: 1024,
  height: 1024,
});

function addImage(e, canvas) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      const image = new fabric.Image(img);
      switch (canvas) {
        case 1:
          variationCanvas.add(image);
          variationCanvas.renderAll();
          break;
        case 2:
          editsCanvas.add(image);
          editsCanvas.renderAll();
          break;
      }
    };
  };
  reader.readAsDataURL(e.target.files[0]);
  e.target.value = null;
}

function eraseCanvas(ele, canvas) {
  switch (canvas) {
    case 1: {
      switch (variationCanvas.isDrawingMode) {
        case true:
          variationCanvas.isDrawingMode = false;
          ele.classList.remove("bg-gray-200");
          break;
        case false:
          variationCanvas.isDrawingMode = true;
          variationCanvas.freeDrawingBrush = new fabric.EraserBrush(
            variationCanvas
          );
          variationCanvas.freeDrawingBrush.width = ele.nextElementSibling.value;
          ele.classList.add("bg-gray-200");
          break;
      }
      break;
    }
    case 2: {
      switch (editsCanvas.isDrawingMode) {
        case true:
          editsCanvas.isDrawingMode = false;
          ele.classList.remove("bg-gray-200");
          break;
        case false:
          editsCanvas.isDrawingMode = true;
          editsCanvas.freeDrawingBrush = new fabric.EraserBrush(editsCanvas);
          editsCanvas.freeDrawingBrush.width = ele.nextElementSibling.value;
          ele.classList.add("bg-gray-200");
          break;
      }
      break;
    }
  }
}

document
  .getElementById("variation-eraser-size")
  .addEventListener("change", function (e) {
    variationCanvas.isDrawingMode = true;
    variationCanvas.freeDrawingBrush = new fabric.EraserBrush(variationCanvas);
    variationCanvas.freeDrawingBrush.width = e.target.value;
    document.getElementById("variation-eraser").classList.add("bg-gray-200");
  });

document
  .getElementById("edits-eraser-size")
  .addEventListener("change", function (e) {
    editsCanvas.isDrawingMode = true;
    editsCanvas.freeDrawingBrush = new fabric.EraserBrush(editsCanvas);
    editsCanvas.freeDrawingBrush.width = e.target.value;
    document.getElementById("edits-eraser").classList.add("bg-gray-200");
  });

function selectCanvas(ele, canvas) {
  switch (canvas) {
    case 1:
      variationCanvas.isDrawingMode = false;
      document
        .getElementById("variation-eraser")
        .classList.remove("bg-gray-200");
      break;
    case 2:
      editsCanvas.isDrawingMode = false;
      document.getElementById("edits-eraser").classList.remove("bg-gray-200");
      break;
  }
}

function clearCanvas(canvas) {
  switch (canvas) {
    case 1:
      variationCanvas.clear();
      break;
    case 2:
      editsCanvas.clear();
      break;
  }
}

function submit() {
  var index = document.getElementById("tabs-input").selectedIndex;
  switch (index) {
    case 0:
      requestGeneration();
      break;
    case 1:
      requestVariation();
      break;
    case 2:
      requestEdit();
  }
}

function displaySuccess(ele, responseData) {
  ele.querySelector(".generation-spinner").remove();
  ele.querySelector(".generation-status").textContent = "SUCCESS";
  ele.querySelector(".generation-status").classList.add("text-green-700");
  ele.querySelector(".generation-status").classList.remove("text-rose-700");
  ele.querySelectorAll(".opacity-20").forEach((ele) => {
    ele.classList.remove("opacity-20");
  });
  ele.querySelector(".placeholder").remove();
  for (i = 0; i < responseData.length; i++) {
    let imgEle = document.createElement("div");
    let dataURL = "data:image/png;base64," + responseData[i].b64_json;
    imgEle.innerHTML = `
        <img class="h-64 w-64 bg-center bg-[length:100%_100%] hover:bg-[length:130%_130%] hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer" onclick="openLightbox(this)" style="background-image:url(${dataURL});">
        `;
    ele.querySelector(".images").appendChild(imgEle);
  }
}

function displayError(ele, error) {
  console.log(error);
  ele.querySelector(".placeholder").remove();
  ele.querySelector(".generation-spinner").remove();
  ele.querySelector(".generation-status").textContent = error;
  ele.querySelector(".generation-status").classList.add("text-rose-700");
  ele.querySelectorAll(".opacity-20").forEach((ele) => {
    ele.classList.remove("opacity-20");
  });
}

function requestGeneration() {
  // Get the data from the prompt
  let promptData = {};
  promptData.promptText = document.getElementById("generation-input").value;
  promptData.promptRes = document.getElementById("size").value;
  promptData.promptNum = document.getElementById("number").value;
  promptData.promptSave = document.getElementById("save").checked;
  promptData.promptTime = new Date();
  promptData.promptModel = document.getElementById("model").value;

  if (document.getElementById("model").value == "dall-e-3") {
    promptData.promptQuality = document.getElementById("quality").value;
    promptData.promptStyle = document.getElementById("style").value;
  }

  // Append a template element
  const ele = document.createElement("div");
  let postHTML = `
  <div class="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
    <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white opacity-20">"${promptData.promptText}"</h5>
    <p class="mb-4 text-sm font-normal text-gray-700 dark:text-gray-400 opacity-20"> GENERATED AT ${promptData.promptTime} - <span class="generation-status">PENDING</span></p>
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 generation-spinner">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only"> Loading... </span>
    </div>
    <div class="images flex gap-3 flex-wrap">
    <div class="placeholder w-64 h-64 bg-zinc-100"></div>
    </div>
    </div>
    `;
  ele.innerHTML = postHTML;

  // Add the element to the page
  document.getElementById("output").prepend(ele);

  try {
    fetch("/request/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        displaySuccess(ele, responseData);
      })
      .catch((error) => {
        displayError(ele, error);
      });
  } catch {
    displayError(ele, error);
  }
}

function requestVariation() {
  // Get the data from the prompt
  let promptData = {};
  promptData.promptRes = document.getElementById("size").value;
  promptData.promptNum = document.getElementById("number").value;
  promptData.promptSave = document.getElementById("save").checked;
  promptData.imageData = variationCanvas.toDataURL("png");
  promptData.promptTime = new Date();

  //Append a template element
  const ele = document.createElement("div");

  let postHTML = `
  <div class="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
    <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white opacity-20">VARIATION</h5>
    <p class="mb-4 text-sm font-normal text-gray-700 dark:text-gray-400 opacity-20"> GENERATED AT ${promptData.promptTime} - <span class="generation-status">PENDING</span></p>
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 generation-spinner">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only"> Loading... </span>
    </div>
    <div class="images flex gap-3 flex-wrap">
    <div class="placeholder w-64 h-64 bg-zinc-100"></div>
    </div>
    </div>
    `;
  ele.innerHTML = postHTML;

  // Add the element to the page

  document.getElementById("output").prepend(ele);

  // Send the data to the server

  try {
    fetch("/request/variation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        displaySuccess(ele, responseData);
      })
      .catch((error) => {
        displayError(ele, error);
      });
  } catch {
    displayError(ele, error);
  }
}

function requestEdit() {
  // Get the data from the prompt
  let promptData = {};

  promptData.promptText = document.getElementById("edits-input").value;
  promptData.promptRes = document.getElementById("size").value;
  promptData.promptNum = document.getElementById("number").value;
  promptData.promptSave = document.getElementById("save").checked;
  promptData.imageData = editsCanvas.toDataURL("png");
  promptData.promptTime = new Date();

  //Append a template element
  const ele = document.createElement("div");

  let postHTML = `
  <div class="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
    <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white opacity-20">EDIT</h5>
    <p class="mb-4 text-sm font-normal text-gray-700 dark:text-gray-400 opacity-20"> GENERATED AT ${promptData.promptTime} - <span class="generation-status">PENDING</span></p>
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 generation-spinner">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only"> Loading... </span>
    </div>
    <div class="images flex gap-3 flex-wrap">
    <div class="placeholder w-64 h-64 bg-zinc-100"></div>
    </div>
    </div>
    `;
  ele.innerHTML = postHTML;

  // Add the element to the page
  document.getElementById("output").prepend(ele);

  try {
    fetch("/request/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        displaySuccess(ele, responseData);
      })
      .catch((error) => {
        displayError(ele, error);
      });
  } catch {
    displayError(ele, error);
  }
}

// Function to open the lightbox
function openLightbox(image) {
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");

  // Set the src attribute of the lightbox image to the src attribute of the clicked image
  //  lightboxImage.src = image.src;
  //instead of image.src, set it to the background image url
  lightboxImage.src = image.style.backgroundImage.slice(5, -2);

  lightbox.classList.remove("hidden");
  document.addEventListener("keydown", closeLightbox);
  lightbox.addEventListener("click", closeLightbox);
}

// Function to close the lightbox
function closeLightbox(event) {
  var lightbox = document.getElementById("lightbox");

  // If the event targets img, do nothing
  if (event.target.tagName == "IMG") {
    return;
  }

  // If the event is a keydown event and the key is not the Escape key, do nothing
  if (event && event.type === "keydown" && event.key !== "Escape") {
    return;
  }

  // Remove the event listeners for the keydown and click events
  document.removeEventListener("keydown", closeLightbox);
  lightbox.removeEventListener("click", closeLightbox);
  lightbox.classList.add("hidden");
}
