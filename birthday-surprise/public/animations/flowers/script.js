    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        document.body.classList.remove("not-loaded");
  }, 400);
});

window.addEventListener("load", () => {
  document.body.classList.remove("not-loaded");
});

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 400);
}
