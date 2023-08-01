const videoContainer = document.getElementById("video-container");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const watermark = document.getElementById("watermark");
const captureButton = document.getElementById("capture-btn");

const setupCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
};

setupCamera();

captureButton.addEventListener("click", () => {
  canvas.width = videoContainer.offsetWidth;
  canvas.height = videoContainer.offsetHeight;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const watermarkX = 0;
  const watermarkY = 0;

  context.drawImage(watermark, watermarkX, watermarkY);

  const imageData = canvas.toDataURL("image/png");
  sendImageToServer(imageData);
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
