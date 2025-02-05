let map;
let marker;
const button = document.querySelector('#detect_ip');

function initMap() {
    const defaultLat = 38.888798;
    const defaultLon = -77.035299;

    map = L.map('map').setView([defaultLat, defaultLon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker([defaultLat, defaultLon]).addTo(map)
        .bindPopup("You are here")
        .openPopup();
}

function updateMap(lat, lon) {
    map.setView([lat, lon], 13);
    marker.setLatLng([lat, lon]);
    marker.setPopupContent("You are here").openPopup();
}

async function getUserIPandLocation() {
    button.textContent = 'Loading...'
    button.disabled = true;

    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch IP data');
        }
        const data = await response.json();

        document.querySelector('#ipv4').textContent = data.ip;
        document.querySelector('#network').textContent = data.network;
        document.querySelector('#asn').textContent = data.asn;
        document.querySelector('#org').textContent = data.org;
        document.querySelector('#city').textContent = data.city;
        document.querySelector('#region').textContent = data.region;
        document.querySelector('#country_name').textContent = data.country_name;

        updateMap(data.latitude, data.longitude);
    } catch (error) {
        console.error("Error fetching IP information:", error);
    }

    button.textContent = 'Get my ip'
    button.disabled = false;
}

button.addEventListener('click', getUserIPandLocation);

window.onload = initMap;