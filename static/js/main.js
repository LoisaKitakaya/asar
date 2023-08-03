const videoContainer = document.getElementById("video-container");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const watermark = document.getElementById("watermark");
const captureButton = document.getElementById("capture-btn");
// Added ref for preview & retake feature
const preview = document.getElementById("preview");
const retakeButton = document.getElementById("retake-btn");
const uploadButton = document.getElementById("upload-btn");
// Camera Access
const cameraAccessButton = document.getElementById("camera-access-btn");

const setupCamera = async () => {
  try {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  cameraAccessButton.style.display = "none";  // Hide the button if access is allowed
  } catch (error) {
    console.error("Error Setting Up Camera:", error);
    alert("There was an error setting up the camera. Please check your camera settings and try again.");
    cameraAccessButton.style.display = "block";  // Show the button if access is blocked
  }
};
// Only load camera on the webcam page
if (video){
  setupCamera();
}

captureButton.addEventListener("click", () => {
  canvas.width = videoContainer.offsetWidth;
  canvas.height = videoContainer.offsetHeight;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the size of the watermark
  const watermarkWidth = watermark.naturalWidth;
  const watermarkHeight = watermark.naturalHeight;

  // Calculate the position of the watermark
  const watermarkX = (canvas.width - watermarkWidth) / 2;
  const watermarkY = canvas.height * 0.6;  // 60% down from the top

  context.drawImage(watermark, watermarkX, watermarkY);

  // Hide the video and capture button, and show the preview and the retake and upload buttons
  video.style.display = "none";
  captureButton.style.display = "none";
  preview.src = canvas.toDataURL("image/png");
  preview.style.display = "block";
  retakeButton.style.display = "block";
  uploadButton.style.display = "block";
});

  // Added event listeners for the retake and upload buttons
  retakeButton.addEventListener("click", () => {
video.style.display = "block";
captureButton.style.display = "block";
preview.style.display = "none";
retakeButton.style.display = "none";
uploadButton.style.display = "none";

// Clear the previous image from the canvas
const context = canvas.getContext("2d");
context.clearRect(0, 0, canvas.width, canvas.height);
});

uploadButton.addEventListener("click", () => {
  sendImageToServer(canvas.toDataURL("image/png"));
});

const sendImageToServer = (imageData) => {
  fetch("/selfie/upload_selfie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `image_data=${encodeURIComponent(imageData)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
