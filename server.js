//const express = require("express");
const express = require("express");
const fs = require("fs");
const izrTab = require("./Podaci/dajTablicu.js");
//const portovi = require("/var/www/OWT/2023/portovi.js");
//const port = portovi.fsimic21;
const port = 12473;
const RezervacijaDAO = require("./Podaci/RezervacijeDAO.js")
const server = express();
const putanja = __dirname;
var rDAO=new RezervacijaDAO;

server.use(express.urlencoded({ extended: true }));
console.log(putanja);

server.post("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(405);
	odgovor.send({ poruka: "Metoda nije dopuštena" });
});

server.put("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501);
	odgovor.send({ poruka: "Metoda nije implementirana" });
});

server.use("/css", express.static(putanja + "/CSS"));
server.use("/dokumenti", express.static(putanja + "/Dokumenti"));
server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/jsk/fsimic21.js")
})

server.get("/api/rezervacije", (zahtjev, odgovor) => {
  odgovor.status(200).json(rDAO.dajRezervacije());
});
server.post("/api/rezervacije", (zahtjev, odgovor) => {
  odgovor.type("json");
  rDAO.dodajRezervaciju(zahtjev, odgovor);
});
server.put("/api/rezervacije", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501).send(JSON.stringify({ "error": "metoda nije implementirana" }));
});
server.delete("/api/rezervacije", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501).send(JSON.stringify({ "error": "metoda nije implementirana" }));
});





server.post('/ispisiObrazac', (zahtjev, odgovor) => {
  const { ime, email, telefon, dolazak, vrijeme, odlazak, kreveti, placanje, spa } = zahtjev.body;
  const csvData = `${ime};${email};${telefon};${dolazak};${vrijeme};${odlazak};${kreveti};${placanje};${spa ? 'Spa' : 'BezSpa'}\n`;
  fs.appendFile('Podaci/rezervacije.csv', csvData, (err) => {
    if (err) {
      console.error(err);
      odgovor.status(500).send('Podaci nisu spremljeni');
    } else {
      odgovor.status(200).send('Podaci uspješno spremljeni');
    }
  });
});
server.use("/dinamicna", (zahtjev, odgovor) => {
	let zaglavlje = fs.readFileSync(putanja + "/Podaci/zaglavlje.txt");
	let podnozje = fs.readFileSync(putanja + "/Podaci/podnozje.txt");

	odgovor.type("html");
	odgovor.status(200);
	odgovor.write(zaglavlje); 
	odgovor.write(izrTab.dajTablicu());
	odgovor.write(podnozje);
	odgovor.end();
});

server.get("/css", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/CSS");
});
server.get("/dokumenti", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/Dokumenti");
  });
server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/jsk/fsimic21.js");
});
server.get("/galerija", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/galerija.html");
  });
server.get("/prijava", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/prijava.html");
  });
server.get("/autor", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/Dokumentacija/autor.html");
  });
server.get("/dokumentacija", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/Dokumentacija/dokumentacija.html");
  });
server.get("/PoslovnaKlasa", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/PoslovnaKlasa.html");
  });
  server.get("/Punipansion", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/Punipansion.html");
  });
  server.get("/polupansion", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/polupansion.html");
  });
  server.get("/rezervacija", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/rezervacija.html");
  });
server.get("/", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/HTML/index.html");
  });
  
server.use((zahtjev, odgovor) => {
	odgovor.status(404);
	odgovor.send("Stranica ne postoji. Povratak na <a href='/'>početnu stranicu</a>.");
});
server.listen(port, () => {
console.log(`Server pokrenut na portu: ${port}`);
})