 //var mapobj = require("./mapobj.js")
 $(document).ready(function() {

var currentURL = window.location.origin;
$.get(currentURL + "/locations", function(mapData){

    var map;
    var bounds = new google.maps.LatLngBounds();
    var markersArray = [];

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"));
    map.setTilt(45);

var markers = [];
for (var i = 0; i < mapData.length; i++) {
    markers.push({location_name:   mapData[i].location_name,
                               lat:   mapData[i].latitude,
                               lng:   mapData[i].longitude});
}
// for (var i = 0; i < markers.length; i++) {
//     console.log("markers[ " +i+" ].location_name = " + markers[i].location_name);
//     console.log("markers[ " +i+" ].lat = " + markers[i].lat);
//     console.log("markers[ " +i+" ].lng = " + markers[i].lng);
//     console.log("typeOf lat = " + typeof markers[i].lat)
// }

     //just incase there are markers already on the map
        //clear markers
        clearMarkers(markersArray);
        // Display multiple markers on a map
         var infoWindow = new google.maps.InfoWindow(), marker, i;

     // Loop through our array of markers & place each one on the map
         for( i = 0; i < mapData.length; i++ ) {
             //trap for missing lat or lng
             if (markers[i].lat === null || markers[i].lng === null) {
            }
             else{
                var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
                 bounds.extend(position);

                 marker = new google.maps.Marker({
                     position: position,
                     map: map,
                     title: markers[i].location_name
                 });
                 markersArray.push(marker);
                 // Allow each marker to have an info window
                 google.maps.event.addListener(marker, 'click', (function(marker, i) {
                 return function() {
                         //infoWindow.setContent(infoWindowContent[i][0]);
                         infoWindow.setContent('<div class="info_content">' +
 //                                            '<p><a href="'+mapData[i].url+'" target="_blank">' + mapData[i].location_name + '</a></p>'+
                                             'xxxx</div>');
                         marker.addListener('click', function() {
                             infoWindow.open(map, marker);
                         });
                     }
                 })(marker, i));
                 //add code to change the color desired
                 if(i===0){
                     marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
                 }
                 else if(i===1){
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                 }
                 else{
                     marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
                 }
                 // Automatically center the map fitting all markers on the screen
                 map.fitBounds(bounds);
             }
         }
     });

    function clearMarkers(markersArray){
        //passed an array with the gogle maps marker objects saved when the markers are created
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
        bounds = new google.maps.LatLngBounds();
     }
});