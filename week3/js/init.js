let mapOptions = {'centerLngLat': [-118.3574,34.0720],'startingZoomLevel':15}

const map = new maplibregl.Map({
    container: 'map', 
    style: 'https://api.maptiler.com/maps/d1f6ba12-c4ca-499f-87bb-f45230f2601d/style.json?key=DgAnlcsmXGhaJHJVy0LQ', // Your style URL
    center: mapOptions.centerLngLat, 
    zoom: mapOptions.startingZoomLevel 
});

function addMarker(lat,lng,title,message){
    let popup_message = `<div class="popupTitle">${title}</div> <div class="popupMessage">${message}</div>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat], 
        })
    })
    document.getElementById("contents").appendChild(newButton); 
}

map.on('load', function() {
    fetch("map.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); 
        });
});

function processData(results){
    results.features.forEach(feature => {
        let coordinates = feature.geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];
        let title = feature.properties.title;
        let message = feature.properties.message;
        addMarker(latitude,longitude,title,message);
    });
};

