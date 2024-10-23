// Reveal Dropdown
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

// Index typing

var i = 0;
var txt = 'Time management is a challenge for students and adults alike in today’s fast-paced world, often leading to stress and decreased productivity. But not to worry, Timer Master is here to help. With various proven time management strategies, we can help you increase your efficiency and maximize your time. Experience the benefits of effective time management with Timer Master and unlock a more productive, fulfilling life.';
var speed = 40;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();
