let openNav = document.querySelector("#openNav");
let close = document.querySelector("#close");
let navbar = document.querySelector("#navbar");

openNav.onclick = ()=>{
    navbar.style.display = "grid";
}

close.onclick = ()=>{
    navbar.style.display = "none";
}

