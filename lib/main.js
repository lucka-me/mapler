/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

var map;
var mapLayer;
var imgWidth;
var imgHeight;
var styleList = {
    "Dark": "mapbox://styles/lucka-me/cjjvmr0mn5csl2rmx5cbgmb0y",
    "Hack": "mapbox://styles/lucka-me/cjjzm06vz0cwl2rnnzgdgkf7j",
    "Standard": "mapbox://styles/lucka-me/cjk2hmfmi3soj2rqfgr140hqp"
};
var selectedStyle = "Dark";

// For Edge and IE who don't support toBlob
//   Ref: https://stackoverflow.com/a/47487073
if (!HTMLCanvasElement.prototype.toBlob) {
   Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
     value: function (callback, type, quality) {
       var canvas = this;
       setTimeout(function() {
         var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
         len = binStr.length,
         arr = new Uint8Array(len);

         for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
         }

         callback( new Blob( [arr], {type: type || 'image/png'} ) );
       });
     }
  });
}

function initMap() {
    // Detect the device resolution
    //   Ref: https://stackoverflow.com/a/2242100
    imgWidth = window.screen.width * window.devicePixelRatio;
    imgHeight = window.screen.height * window.devicePixelRatio;
    document.getElementById("imgWidth").value = imgWidth;
    document.getElementById("imgHeight").value = imgHeight;
    document.getElementById("mapBox").style.paddingTop = String((imgHeight / imgWidth * 100) + "%");

    mapboxgl.accessToken = "pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw";
    map = new mapboxgl.Map({
        container: "map",
        style: styleList[selectedStyle],
        zoom: 12,
        center: [108.9435278, 34.2651799],
        preserveDrawingBuffer: true
    });
    var navControl = new mapboxgl.NavigationControl();
    map.addControl(navControl, "top-left");
    map.on("move", function() {
        document.getElementById("centerLng").value = map.getCenter().lng;
        document.getElementById("centerLat").value = map.getCenter().lat;
    });
    map.on("zoom", function() {
        document.getElementById("zoomLevel").value = map.getZoom();
    })
}

function changeMapStyle() {
    var select = document.getElementById("mapStyleSelect");
    selectedStyle = select.options[select.selectedIndex].value;
    map.setStyle(styleList[selectedStyle]);
}

function resizeMap() {
    imgWidth = document.getElementById("imgWidth").value;
    imgHeight = document.getElementById("imgHeight").value;
    document.getElementById("mapBox").style.paddingTop = String((imgHeight / imgWidth * 100) + "%");
    map.resize();
}

function setCenter() {
    var centerLng = parseFloat(document.getElementById("centerLng").value);
    var centerLat = parseFloat(document.getElementById("centerLat").value);
    if (isNaN(centerLng) || isNaN(centerLat)) {
        alert("Center coordinate invalid.");
        return;
    }
    if (Math.abs(centerLng) > 180 || Math.abs(centerLat) > 90) {
        alert("Center coordinate invalid.");
        return;
    }
    map.setCenter([centerLng, centerLat]);
}

function setZoom() {
    var zoomLevel = parseFloat(document.getElementById("zoomLevel").value);
    if (isNaN(zoomLevel)) {
        alert("Zoom level invalid.");
        return;
    }
    if (zoomLevel < map.getMinZoom() || zoomLevel > map.getMaxZoom()) {
        alert("Zoom level invalid, should be between " + map.getMinZoom() + " and " + map.getMaxZoom() + ".");
        return;
    }
    map.setZoom(zoomLevel);
}

function savePNG() {
    var mapBounds = map.getBounds();
    var saveMapDiv = document.createElement("div");
    // Modify size for HiDPI devices
    saveMapDiv.setAttribute("style", "width:" + String(imgWidth / window.devicePixelRatio) + "px;height:" + String(imgHeight / window.devicePixelRatio) + "px;");
    saveMapDiv.setAttribute("id", "saveMap");
    document.body.appendChild(saveMapDiv);
    var saveMap = new mapboxgl.Map({
        container: saveMapDiv,
        style: styleList[selectedStyle],
        zoom: map.getZoom(),
        center: map.getCenter(),
        preserveDrawingBuffer: true
    });
    saveMap.fitBounds(mapBounds);
    saveMap.on("load", function() {
        // Save png from canvas
        //   Ref: https://stackoverflow.com/a/49521638
        saveMap.getCanvas().toBlob(function(blob) {
            var element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = "Wallmapper.png";
            element.click();
            saveMap.remove();
            document.body.removeChild(saveMapDiv);
        });
    });
}
