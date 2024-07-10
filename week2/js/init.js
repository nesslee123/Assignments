const map = new maplibregl.Map({
    container: 'map', 
    style: 'https://api.maptiler.com/maps/d1f6ba12-c4ca-499f-87bb-f45230f2601d/style.json?key=DgAnlcsmXGhaJHJVy0LQ', // Your style URL
    center: [-118.400208, 34.068260], 
    zoom: 15 
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
   
addMarker(34.068260,-118.400208, "Avra Beverly Hills", "Favorite high-end brunch place I like to go to with my family on the weekends. They have the best salmon tartare and baklava!")
addMarker(34.172160,-118.548870, "IHOP", "My favorite place to go for breakfast when I am craving french toast and hash browns! P.S. they also have amazing mozzarella sticks.")
addMarker(34.155280,-118.472130, "Le Pain Quotidien", "Best place to go after a workout! My sister and I love their avocado toast and mini pancakes. They also have a great almond croissant.")

