fetch('analogies.json').then(function (response) {
    response.json().then(function (data) {
        console.log(data);
        data.forEach(function (ligne) {
            var codeDuBloc = '<section id={{id}}><h2>Si j’étais {{analogie}}, je serais {{valeurAnalogie}}.</h2><p>Parce que {{explication}}</p><img src="img/{{img}}.jpg" alt="" class="petit image-cliquable"></section>';
            document.querySelector(".liste-analogies").innerHTML += codeDuBloc.replace("{{analogie}}", ligne["analogie"]).replace("{{valeurAnalogie}}", ligne["valeur"]).replace("{{img}}", ligne["img"]).replace("{{id}}", ligne["id"]).replace("{{explication}}", ligne["explication"]) + "<div class='ligne'></div>"
        })
        creePopup()
        masquePopup()
    })
})

var popup = document.querySelector(".popup");

function creePopup() {
    document.querySelectorAll(".image-cliquable").forEach(function (element) {
        element.addEventListener('click', function (event) {
            document.querySelector(".popup img").setAttribute('src', element.getAttribute('src'));
            popup.classList.remove("popup-invisible");
            popup.classList.add("popup-visible");
        })
    })
}

function masquePopup() {
    document.querySelector(".cache-fenetre").addEventListener('click', function (event) {
        this.parentNode.classList.remove("popup-visible");
        this.parentNode.classList.add("popup-invisible");
    })
}

var analogieSupp = document.querySelector("input#analogie").value;
var valAnalogieSupp = document.querySelector("input#valeur").value;
var explicationSupp = document.querySelector("textarea").value;
var lienImageSupp = document.querySelector("input#lien-img").value;
var email = document.querySelector("input#email").value;
var sectionSupplement = '<h2>Si j’étais ' + analogieSupp + ', je serais ' + valAnalogieSupp + '</h2><p>Parce que ' + explicationSupp + '</p>' + '<img src="' + lienImageSupp + '" alt="" class="petit image-cliquable">';

document.querySelector('input#analogie').addEventListener('keyup', function (event) {
    analogieSupp = document.querySelector("input#analogie").value;
})

document.querySelector('input#valeur').addEventListener('keyup', function (event) {
    valAnalogieSupp = document.querySelector("input#valeur").value;
})

document.querySelector('textarea').addEventListener('keyup', function (event) {
    explicationSupp = document.querySelector("textarea").value;
})

document.querySelector('input#lien-img').addEventListener('keyup', function (event) {
    lienImageSupp = document.querySelector("input#lien-img").value;
})

document.querySelector('input#email').addEventListener('keyup', function (event) {
    email = document.querySelector("input#email").value;
})

document.querySelectorAll('input#analogie, input#valeur, textarea,input#lien-img').forEach(function (element) {
    element.addEventListener('keyup', function (event) {
        sectionSupplement = '<h2>Si j’étais ' + analogieSupp + ', je serais ' + valAnalogieSupp + '</h2><p>Parce que ' + explicationSupp + '.</p>' + '<img src="' + lienImageSupp + '" alt="" class="petit image-cliquable">';
    })
})

document.querySelector("input[type='button'").addEventListener('click', function (event) {
    document.querySelector(".supplementaire").innerHTML = sectionSupplement
})


document.querySelector("input[type='button']").addEventListener('click', function (e) {
    fetch('https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=ds&courriel='+ email +'&message=' + "Si j'étais " + analogieSupp + ", je serais " + valAnalogieSupp + ". Parce que " + explicationSupp).then(function (response) {
        response.json().then(function (data) {
            console.log("Réponse reçue : ")
            console.log(data);
        })
    })
    document.querySelector(".reponse").style.display = 'block';
})

var page1 = document.querySelector(".page1");
var page2 = document.querySelector(".page2");
var page3 = document.querySelector(".page3");
var pageSuivante = document.querySelector(".p-suiv");
var pagePrecedente = document.querySelector(".p-prec");


document.querySelector(".mentions-legales").addEventListener('click', function (event) {
    document.querySelector(".ml").style.display = 'block';
    page1.style.display = 'block';
    page2.style.display = 'none';
    page3.style.display = 'none';
    pageSuivante.style.display = 'block';
    pagePrecedente.style.display = 'none';
})

pageSuivante.addEventListener('click', function() {
    if (page1.style.display == 'block') {
        page2.style.display = 'block';
        page1.style.display = 'none';
        pagePrecedente.style.display = 'block';
    }
    else {
        if (page2.style.display == 'block') {
            page3.style.display = 'block';
            page2.style.display = 'none';
            pageSuivante.style.display = 'none';
        }
    }
})

pagePrecedente.addEventListener('click', function() {
    if (page3.style.display == 'block') {
        page2.style.display = 'block';
        page3.style.display = 'none';
        pageSuivante.style.display = 'block';
    }
    else {
        if (page2.style.display == 'block') {
            page1.style.display = 'block';
            page2.style.display = 'none';
            pagePrecedente.style.display = 'none';
        }
    }
})

document.querySelector(".cache-credits").addEventListener('click', function (event) {
    this.parentNode.style.display = 'none';
})
