const ds = require("fs");

class RezervacijaDAO{
    dajRezervacije = function(){
        var podaci = ds.readFileSync("Podaci/rezervacije.csv", "utf-8");
        var redovi = podaci.split("\n");
        return redovi;
    }

    dodajRezervaciju = function (zahtjev, odgovor) {
        const { ime, email, telefon, dolazak, vrijeme, odlazak, kreveti, placanje, spa } = zahtjev.body;
        const csvData = `${ime};${email};${telefon};${dolazak};${vrijeme};${odlazak};${kreveti};${placanje};${spa ? 'Spa' : 'BezSpa'}\n`;
      
        ds.appendFile("Podaci/rezervacije.csv", csvData, function (err) {
          if (err) {
            odgovor.status(417).send(JSON.stringify({ "error": "nevaljani podaci" }));
          } else {
            odgovor.status(200).send(JSON.stringify({ "message": "podaci dodani" }));
          }
        });
      };
      
      
}
module.exports = RezervacijaDAO;