const redirectToImageActionsPage = () => {
  if (confirm("You are being redirected to the image actions page.")) {
    window.location.href = "/images/";
  } else {
    return;
  }
};

redirectToImageActionsPage();
