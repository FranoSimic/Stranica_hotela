const fs = require("fs");
exports.dajTablicu = function () {
	let data = fs.readFileSync("Podaci/cijenik.json", "utf-8");
	let podaci = JSON.parse(data);
	let tablica = "<table>";
	for (let red of podaci) {
		tablica += "<tr>";
		tablica += "<td>" + red.Usluga + "</td>";
		tablica += "<td>" + red.Opis + "</td>";
		tablica += "<td>" + red.Cijena + "</td>";
		tablica += "</tr>";
	}
	tablica += "</table>";
	return tablica;
};
