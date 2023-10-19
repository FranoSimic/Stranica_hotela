document.addEventListener("DOMContentLoaded", function () {
    console.log(window.location.pathname)
    if (window.location.href.includes('rezervacija') || window.location.href.includes('dinamicna')) {
        var cijenikId = document.getElementById("CijenikID");
        cijenikId.addEventListener("mouseover", tablicaFunkcija);
        document.getElementById("dolazak").addEventListener("change", datumUnesen);
        var krug=document.getElementById("KrugID");
        krug.addEventListener("load", KrugFunkcija());
        document.getElementById("rezervacijaID").addEventListener("submit", function (event) {
            var ime = document.getElementById("ime");
            var email = document.getElementById("email");
            var telefon = document.getElementById("telefon");
            var dolazak = document.getElementById("dolazak");
            var vrijeme = document.getElementById("vrijeme");
            var odlazak = document.getElementById("odlazak");
            var placanje = document.getElementsByName("placanje");
            if (ime && ime.value == "") {
                prikazGreske("Unesite ime i prezime");
                ime.style.borderColor="red";
                event.preventDefault();
                return false;
            }
            if (email && email.value == "") {
                email.style.borderColor="red";
                prikazGreske("Unesite email");
                event.preventDefault();
                return false;
            }
            if (telefon && telefon.value == "") {
                telefon.style.borderColor="red";
                prikazGreske("Unesite telefon");
                event.preventDefault();
                return false;
            }
            if (dolazak && dolazak.value == "") {
                dolazak.style.borderColor="red";
                prikazGreske("Unesite datum dolaska");
                event.preventDefault();
                return false;
            }
            if (vrijeme && vrijeme.value == "") {
                vrijeme.style.borderColor="red";
                prikazGreske("Unesite vrijeme dolaska");
                event.preventDefault();
                return false;
            }
            if (odlazak && odlazak.value == "") {
                odlazak.style.borderColor="red";
                prikazGreske("Unesite datum odlaska");
                event.preventDefault();
                return false;
            }
            if (!placanje[0].checked && !placanje[1].checked) {
                prikazGreske("Unesite način plaćanja");
                event.preventDefault();
                return false;
            }
            else {
                if (!provjeriIme(ime.value)) {
                    ime.style.borderColor="red";
                    prikazGreske("Niste dobro unijeli ime i prezime")
                    event.preventDefault();
                    return false;
                }
                if (!provjeriEmail(email.value)) {
                    email.style.borderColor="red";
                    prikazGreske("Niste dobro unijeli email")
                    event.preventDefault();
                    return false;
                }
                if (!provjeriDatum(dolazak.value)) {
                    dolazak.style.borderColor="red";
                    prikazGreske("Odaberite datum dolaska u budućnosti")
                    event.preventDefault();
                    return false;
                }
                if (!provjeriVrijeme(vrijeme.value, dolazak.value)) {
                    vrijeme.style.borderColor="red";
                    prikazGreske("Odaberite drugo vrijeme dolaska")
                    event.preventDefault();
                    return false;
                }
                if (!provjeriDatum(odlazak.value)) {
                    odlazak.style.borderColor="red";
                    prikazGreske("Odaberite datum odlaska u budućnosti")
                    event.preventDefault();
                    return false;
                }

            }
        });
    }
    if (window.location.href.includes('prijava')) {
        var prijavaObrazac = document.getElementById("prijavaID");
        var rotacija=document.getElementById("RotacijaID");
        rotacija.addEventListener("onmouseover", Rotacija());
        var kvadrat = document.getElementById('kvadrat');
        kvadrat.addEventListener('click', PovecajKvadrat);
        prijavaObrazac.addEventListener("submit", function (event) {
            console.log("Nešto");
            var ime = document.getElementById("ime");
            var email = document.getElementById("email");
            var telefon = document.getElementById("telefon");
            var oSebi = document.getElementById("poruka");
            if (oSebi && oSebi.value == "") {
                oSebi.style.borderColor="red";
                prikazGreske("Unesite nešto o sebi");
                event.preventDefault();
                return false;
            }
            if (ime && ime.value == "") {
                ime.style.borderColor="red";
                prikazGreske("Unesite ime i prezime");
                event.preventDefault();
                return false;
            }
            if (email && email.value == "") {
                email.style.borderColor="red";
                prikazGreske("Unesite email");
                event.preventDefault();
                return false;
            }
            if (telefon && telefon.value == "") {
                telefon.style.borderColor="red";
                prikazGreske("Unesite telefon");
                event.preventDefault();
                return false;
            }
            else {
                if (!provjeriIme(ime.value)) {
                    ime.style.borderColor="red";
                    prikazGreske("Niste dobro unijeli ime i prezime")
                    event.preventDefault();
                    return false;
                }
                if (!provjeriEmail(email.value)) {
                    email.style.borderColor="red";
                    prikazGreske("Niste dobro unijeli email")
                    event.preventDefault();
                    return false;
                }
                if (!provjeraSebi(oSebi.value)) {
                    oSebi.style.borderColor="red";
                    prikazGreske("U odlomku o sebi ste unijeli nevažeće znakove")
                    event.preventDefault();
                    return false;
                }

            }
        });
    }
})


var velicina = 100; 
function PovecajKvadrat() {
  velicina += 10;
  kvadrat.style.width = velicina + 'px';
  kvadrat.style.height = velicina + 'px';
  if (velicina >= 200) {
    clearInterval(animacijskiInterval);
    return;
  }
  setTimeout(PovecajKvadrat, 100);
}
kvadrat.addEventListener('click', function() {
  animirajKvadrat();
});




function tablicaFunkcija() {
    var tableRows =  document.getElementsByTagName('tr');
    function setEventListeners() {
        if (window.matchMedia("(max-width: 480px)").matches) {
            for (var i = 1; i < tableRows.length - 1; i++) {
                tableRows[i].addEventListener("mouseover", function() {
                    var div = document.getElementById("OpisID");
                    var counter=0;
                    var opis =this.cells[counter++].textContent+ " " + this.cells[counter++].textContent  + " cijena: " + this.cells[counter++].textContent ;
                    div.innerHTML = opis;
                });
            }
        }
        else document.getElementById("OpisID").style.display = "none";
    }
    setEventListeners();
    window.addEventListener('resize', setEventListeners);
}
function KrugFunkcija() {
    var krug = document.getElementById("KrugID");
    var pozicija = 0; 
    var brzina = 5;
    function kretnja() {
      pozicija += brzina;
      krug.style.left = pozicija + 'px';
      if (pozicija < krug.parentNode.clientWidth - 50) {
        setTimeout(kretnja, 10);
      }
    }
    kretnja(); 
  }
function Rotacija() {
    var element = document.getElementById('RotacijaID');
    var rotation = 0;

  function rotate() {
    rotation += 1;
    element.style.transform = 'rotate(' + rotation + 'deg)';
    if (rotation < 360) {
      setTimeout(rotate, 10); // Adjust the time interval as needed
    }
  }

  rotate();
  }
  function stopRotation() {
    var element = document.getElementById('RotacijaID');
    element.style.transform = 'rotate(0deg)';
  }
  

function prikazGreske(poruka) {
    var elementGreske = document.createElement("div");
    elementGreske.textContent = poruka;
    elementGreske.classList.add("klasaGreske");
    document.body.appendChild(elementGreske);
    const element = document.querySelector('.klasaGreske');
    element.style.display = 'flex';
    elementGreske.addEventListener('click', function (event) {
        elementGreske.remove();
        return false;
    });
}


function provjeriDatum(datum) {
    var iDatum = new Date(datum);
    iDatum.setHours(0, 0, 0, 0);
    var dDatum = new Date();
    dDatum.setHours(0, 0, 0, 0);
    if (iDatum > dDatum) {
        return true;
    }
    else if (iDatum.getTime() === dDatum.getTime()) {
        return true;
    }
    else {
        return false;
    }
}
function istiDatum(datum){
    var iDatum = new Date(datum);
    iDatum.setHours(0, 0, 0, 0);
    var dDatum = new Date();
    dDatum.setHours(0, 0, 0, 0);
    if (iDatum.getTime() === dDatum.getTime()) return true;
    else return false;
}

function provjeriVrijeme(vrijeme, datum) {
    var iVrijeme = new Date();
    var dVrijeme = new Date();
    var inputVrijeme = vrijeme.split(':');

    iVrijeme.setHours(inputVrijeme[0], inputVrijeme[1], 0, 0);
    if(istiDatum(datum)){
        if (iVrijeme > dVrijeme) {
            return true;
        }
        else {
            return false;
        }
    }
    else return true;
}
function provjeriIme(ime) {
    return /\w\s/.test(ime);
}
function provjeriEmail(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

}

function provjeraSebi(oSebi) {
    return /\w\s/.test(ime);
}

function datumUnesen() {
    var dolazak = new Date(document.getElementById("dolazak").value);
    if (provjeriDatum(dolazak)) {
        document.getElementById("vrijeme").disabled = false;
    }
    else {
        document.getElementById("vrijeme").disabled = true;
    }
}
