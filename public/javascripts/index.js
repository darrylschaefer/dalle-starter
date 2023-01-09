$("#generation-prompt-button").click(function() {
  requestGeneration();
});

function requestGeneration() {
  let promptData = {};
  promptData.promptText = $("#generation-prompt-input").val();
  promptData.promptRes = $("#generation-toolbar-size").val();
  promptData.promptNum = $("#generation-toolbar-number").val();
  promptData.promptSave = $("#generation-toolbar-save").is(":checked");
  promptData.promptTime = new Date();

  //Append a template element
  const ele = document.createElement("div");
  ele.setAttribute("class", "generation-template-container");
  let postHTML = `
    <div class="generation-template-header">
      <div class="generation-template-prompt">
        "${promptData.promptText}"
      </div>
      <div class="generation-template-time">
        GENERATED AT ${promptData.promptTime}
      </div>
      <div class="generation-template-status">PENDING
      </div>
    </div>
    <div class="generation-template-images">
      <div class="generation-template-loading">
        <div class="loading">
          <div class="spinner">
          <div>
        </div>
      </div>
    </div>
    `;
  ele.innerHTML = postHTML;
  $("#generation-container").prepend(ele);

  fetch("/request/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData)
    })
    .then(response => response.json())
    .then(responseData => {
      $(ele).find(".generation-template-loading").remove();
      $(ele).find(".generation-template-status").text("SUCCESS");
      $(ele).find(".generation-template-status")[0].setAttribute("class", "status-success");
      for (i = 0; i <= responseData.length; i++) {
        let imgEle = document.createElement("div");
        imgEle.setAttribute("class", "generation-overlay-container");
        imgEle.innerHTML = `
          <img onclick="openLightbox(this)" src="${responseData[i].url}">
          `;
        $(ele).find(".generation-template-images").append(imgEle)
      }
    })
    .catch(error => {
      // Handle any errors that occurred in the above steps
      $(ele).find(".generation-template-status").text(error);
      $(ele).find(".generation-template-status")[0].setAttribute("class", "status-failure");
    });
}

setInterval(updatePrompt, 100);

function updatePrompt() {
  if ($("#generation-prompt-input").val().length > 3) {
    $("#generation-prompt-button").attr("disabled", false)
  } else {
    $("#generation-prompt-button").attr("disabled", true)
  }
}

// Function to open the lightbox
function openLightbox(image) {
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");

  // Set the src attribute of the lightbox image to the src attribute of the clicked image
  lightboxImage.src = image.src;

  lightbox.style.display = "flex";
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
  lightbox.style.display = "none";
}
