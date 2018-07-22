/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

var map;
var mapLayer;
var imgWidth = 2160;
var imgHeight = 1080;

function initMap() {
    map = L.map("map").setView([34.2651799, 108.9435278], 12);
    mapLayer = new L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        id: "lucka-me/cjjvmr0mn5csl2rmx5cbgmb0y",
        accessToken: "pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2pqdnNuY3YxMTZpMTNwbzZzMnU5d2JiNyJ9.VdhTKpnaA-1uzkfM2pUPLg",
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        detectRetina: true
    });
    mapLayer.addTo(map);
}

function resizeMap() {
    imgWidth = document.getElementById("imgWidth").value;
    imgHeight = document.getElementById("imgHeight").value;
    document.getElementById("mapBox").style.paddingTop = String((imgHeight / imgWidth * 100) + "%");
    map.invalidateSize();
}

function savePNG() {
    var mapBounds = map.getBounds();
    var saveMapDiv = document.createElement("div");
    saveMapDiv.setAttribute("style", "width:" + imgWidth + "px;height:" + imgHeight + "px;");
    saveMapDiv.setAttribute("id", "saveMap");
    document.body.appendChild(saveMapDiv);
    var saveMap = L.map(saveMapDiv);
    saveMap.fitBounds(mapBounds);
    mapLayer.addTo(saveMap);
    leafletImage(saveMap, function(err, canvas) {
        var element = document.createElement("a");
        element.href = canvas.toDataURL("image/png");
        element.download = "Wallmapper.png";
        element.click();
        document.body.removeChild(saveMapDiv);
        map.removeLayer(mapLayer);
        mapLayer.addTo(map);
    });
}
