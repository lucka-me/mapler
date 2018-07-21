/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

var map;

function initMap() {
    var defaultCenter = {lat: 34.2651799, lng: 108.9435278};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#FFFFFF"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#232526"
              }
            ]
          }
        ]

    });
}

function resizeMap() {
    clearPoints();
    clearDelaunay();
    var width = document.getElementById("imgWidth").value;
    var height = document.getElementById("imgHeight").value;
    document.getElementById("map").style.paddingTop = String((height / width * 100) + "%");
}

function savePNG() {
    alert("Sorry, not finished yet.");
}
