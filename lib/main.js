/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

var map;
var mapStyle = [
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
var defaultCenter = {lat: 34.2651799, lng: 108.9435278};

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyle
    });
}

function resizeMap() {
    var width = document.getElementById("imgWidth").value;
    var height = document.getElementById("imgHeight").value;
    document.getElementById("map").style.paddingTop = String((height / width * 100) + "%");
}

function savePNG() {
    var imgWidth = document.getElementById("imgWidth").value;
    var imgHeight = document.getElementById("imgHeight").value;
    var saveMapDiv = document.createElement("div");
    saveMapDiv.setAttribute("style", "width:" + imgWidth + "px;height:" + imgHeight + "px;");
    document.body.appendChild(saveMapDiv);
    var saveMap = new google.maps.Map(saveMapDiv, {
        zoom: 12,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyle
    });
    google.maps.event.addListenerOnce(saveMap, "idle", function() {
        saveMap.fitBounds(map.getBounds());
        google.maps.event.addListenerOnce(saveMap, "idle", function() {
            html2canvas(saveMapDiv, {
                useCORS: true,
                imageTimeout: 0,
                scale: 1.0,
                foreignObjectRendering: true
            }).then(mapCanvas => {
                var element = document.createElement("a");
                element.href = mapCanvas.toDataURL("image/png");
                element.download = "Wallmapper.png";
                element.style.display = "none";
                element.click();
                document.body.removeChild(saveMapDiv);
            });
        });

    });
}
