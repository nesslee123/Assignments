let mapOptions = {'centerLngLat': [-118.242643,34.0549076],'startingZoomLevel':15}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/1e266955-015c-47b9-97c8-282753dbbfa6/style.json?key=DgAnlcsmXGhaJHJVy0LQ',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(data) {
    let popup_message;
    let lng = data['lng'];
    let lat = data['lat'];
    if (data['Do you live in or have you visited California?'] == "Yes"){
        popup_message = `<h2>From: ${data['What City and State do you live in? ']}</h2> <h3>${data['What is the best place to visit in California?']}</h3> <p>${data['Please describe your experience visiting the place mentioned above.']}</p>`
    }
    else{
        popup_message = `<h2>From: ${data['What City and State do you live in? ']}</h2> <h3>Never Visited</h3>`
    }
        new maplibregl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new maplibregl.Popup()
                .setHTML(popup_message))
            .addTo(map)
        createButtons(lat,lng,data['What City and State do you live in? ']);       
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_38HMzNb2icNLK5iKIJ7zwW8rTx3U567U_NQKfGbRQ19aQdrhYGV2XcsnndlAj6tpFNdsbhNCt_VI/pub?output=csv"

map.on('load', function() {
    Papa.parse(dataUrl, {
        download: true, 
        header: true, 
        complete: results => {
           processData(results.data)
        }
    });
});

function processData(results){
    console.log(results)
    results.forEach(feature => {
        let longitude = feature['lng']
        let latitude = feature['lat'];
        let title = feature['What City and State do you live in? '];
        let message = feature['What is the best place to visit in California?'];
        addMarker(feature);
            });
};

