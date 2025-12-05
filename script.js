let places = [];

fetch("places.json")
  .then(res => res.json())
  .then(data => {
    places = data;
    showPlaces(places);
    initMap(places);
  });

function showPlaces(data) {
  const list = document.getElementById("place-list");
  list.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.detail}</p>
    `;
    list.appendChild(div);
  });
}

document.getElementById("search").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = places.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  showPlaces(filtered);
});

function initMap(data){
  const map = L.map('map').setView([14.3527, 100.5689], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  data.forEach(p => {
    L.marker([p.lat, p.lng])
      .addTo(map)
      .bindPopup(`<b>${p.name}</b><br>${p.detail}`);
  });
}
