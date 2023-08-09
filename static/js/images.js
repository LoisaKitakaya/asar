document
  .getElementById("perform-action-button")
  .addEventListener("click", () => {
    const selectedAction = document.getElementById("action-select").value;
    const selectedImages = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const imageIds = [];

    selectedImages.forEach((checkbox) => {
      imageIds.push(checkbox.value);
    });

    fetch("/images/image_actions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: selectedAction,
        images: imageIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert("Error:", error);
        window.location.reload();
      });
  });
