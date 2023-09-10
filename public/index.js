// change navlink color
$(document).ready(function () {
  $("ul.navbar-nav > li").click(function (e) {
    $("ul.navbar-nav > li").removeClass("active");
    $(this).addClass("active");
  });
});
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
function on1() {
  document.getElementById("overlay1").style.display = "block";
}

function off1() {
  document.getElementById("overlay1").style.display = "none";
}
function on2() {
  document.getElementById("overlay2").style.display = "block";
}

function off2() {
  document.getElementById("overlay2").style.display = "none";
}
function explore() {
  let date = document.getElementById('getdate').value;
  document.getElementById('newdate').value = date;
  let count = document.getElementById('guest').value;
  document.getElementById('guestcount').value = count;
  let loc = document.getElementById('getLocation').value;
  console.log(loc);
  document.getElementById('locate').value = loc;
}

let tourName=document.getElementById("summa");
console.log(tourName)

var clickCount = 0;
countClick = () => {
  let darkMode = document.getElementById("themebtn");
  clickCount++;
  return clickCount;
}

reset = () => {
  document.getElementById('uemail').reset();
  document.getElementById('upass').reset();
}
var eye1 = document.getElementById('eyeToggle1');
var count1 = 0;
countClick1 = () => {
  if (eye1.onclick)
    count1++;
  return count1;
}
passwordVisible1 = () => {
  let count = countClick1();
  var passwordType = document.getElementById('pass');
  if (count % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye1.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye1.className = "fa-regular fa-eye"

  }
}

var eye2 = document.getElementById('eyeToggle2');
var count2 = 0;
countClick2 = () => {
  if (eye2.onclick)
    count2++;
  return count2;
}
passwordVisible2 = () => {
  let count2 = countClick2();
  var passwordType = document.getElementById('repass');
  if (count2 % 2 == 1) {
    if (passwordType.type === "password") {
      passwordType.type = 'text';
      eye2.className = "fa-regular fa-eye-slash"
    }
  }
  else {
    passwordType.type = "password";
    eye2.className = "fa-regular fa-eye"

  }
}





