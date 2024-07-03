const map = new maplibregl.Map({
    container: 'map', 
    style: 'https://api.maptiler.com/maps/d1f6ba12-c4ca-499f-87bb-f45230f2601d/style.json?key=DgAnlcsmXGhaJHJVy0LQ', // Your style URL
    center: [11.255814, 43.769562], 
    zoom: 15 
});

new maplibregl.Marker()
    .setLngLat([2.352222, 48.856613])
    .setPopup(new maplibregl.Popup({ offset: 25 }) 
        .setHTML('Paris, France which is where I traveled with my mom and had a mother/daughter trip'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([32.861969, 39.896519])
    .setPopup(new maplibregl.Popup({ offset: 25 }) 
        .setHTML('Cappadocia, Turkiye which is where I first went on an air baloon'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([11.255814, 43.769562])
    .setPopup(new maplibregl.Popup({ offset: 25 }) 
        .setHTML('Florence, Italy which is where I ate the best pizza'))
    .addTo(map);