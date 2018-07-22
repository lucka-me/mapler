/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

var map;
var mapLayer;
var imgWidth = 2160;
var imgHeight = 1080;
var styleList = {
    "Dark": "mapbox://styles/lucka-me/cjjvmr0mn5csl2rmx5cbgmb0y",
    "Blueprint": "mapbox://styles/lucka-me/cjjwmtewd3oit2rp5gbhty9s8"
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
    mapboxgl.accessToken = "pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw";
    map = new mapboxgl.Map({
        container: "map",
        style: styleList[selectedStyle],
        zoom: 12,
        center: [108.9435278, 34.2651799],
        preserveDrawingBuffer: true
    });
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

function savePNG() {
    var mapBounds = map.getBounds();
    var saveMapDiv = document.createElement("div");
    // Modify size for HiDPI devices
    saveMapDiv.setAttribute("style", "width:" + String(imgWidth / window.devicePixelRatio) + "px;height:" + String(imgHeight / window.devicePixelRatio) + "px;");
    saveMapDiv.setAttribute("id", "saveMap");
    document.body.appendChild(saveMapDiv);
    var saveMap = new mapboxgl.Map({
        container: 'saveMap',
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
