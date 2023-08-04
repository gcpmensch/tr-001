/*document.getElementById('coordinates').addEventListener('submit', event => {
  event.preventDefault(); // Verhindert das Neuladen der Seite
});


document.getElementById("Berlin").addEventListener("click", fetchPrices.bind(null,52.5200, 13.4050));
document.getElementById("Hamburg").addEventListener("click", fetchPrices.bind(null,53.511, 9.9937));
document.getElementById("Cologne").addEventListener("click", fetchPrices.bind(null,50.9375, 6.9603));
*/

function fetchPrices(city) {
  let apikey = "88e681ef-e556-c7d3-05b7-6d7c4e0e136d";

  let coordinates = {
    Berlin: { lat: 52.5200, lng: 13.4050 },
    Hamburg: { lat: 53.511, lng: 9.9937 },
    Cologne: { lat: 50.9375, lng: 6.9603 },
  };

  let lat = coordinates[city].lat;
  let lng = coordinates[city].lng;

  //let rad = 1.5;
  let rad =  document.getElementById('rad').value
  let type = "all";
  let sort = "dist";

  fetch(`https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${rad}&type=${type}&sort=${sort}&apikey=${apikey}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('prices').innerHTML = '';
      if (data.ok) {
        data.stations.forEach(station => {
          const priceDiv = document.createElement("div");
          priceDiv.classList.add("price");

          const stationP = document.createElement('p');
          stationP.textContent = `Station: ${station.name}`;

          const priceP = document.createElement('p');
          const priceC = document.createElement('p');
          //priceP.textContent = `Preis: ${station.price} \u20ac`;
          priceP.textContent = `Preis E10: ${station.e10} \u20ac`;
          priceC.textContent = `Preis Diesel: ${station.diesel} \u20ac`; 

          priceDiv.appendChild(stationP);
          priceDiv.appendChild(priceP);
          priceDiv.appendChild(priceC);
          document.getElementById('prices').appendChild(priceDiv);
        });
      } else {
        console.log(lat)
        console.log(lng)
        console.log("Fehler: " + data.message);
      }
    })
    .catch(error => console.error("Fehler beim Abrufen der Daten: ", error));
}
