export function endLoader() {
  document.getElementById("wrapper-loader").style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  setInterval(endLoader, 2000);
});
