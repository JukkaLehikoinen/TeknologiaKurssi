export default function ilmoitus(syy, vari) {

    let div = document.querySelector(".ilmoitus");
    div.setAttribute('id', 'luotuDiv')
    div.classList.add("luotuDiv");
    document.getElementById("luotuDiv").innerHTML = "";
    setTimeout(function () { div.classList.remove("luotuDiv"); }, 7000);

    document.getElementById('luotuDiv').style.background = vari;
    document.getElementById('luotuDiv').innerHTML = syy;

}