/// Reveal Dropdownx
function reveal(id) {
  const element = document.getElementById(id);
  element.style.display = element.style.display === "none" ? "" : "none";
}

//Reveal reflection prompt
function show(id) {
  const element = document.getElementById(id);
  element.style.display = element.style.display === "none" ? "" : "none";
}

//Submit reflection prompt
function submit() {
  location.reload();
  alert("Submit reflection?");
}

