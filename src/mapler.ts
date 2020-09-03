import UIKit from "./ui/UIKit";

import './css/extended.css'

const ui = new UIKit();
ui.init();

/*
const value = {
    string: {
        github: {
            releaseUrl: 'https://api.github.com/repos/lucka-me/mapler/releases/latest',
        },
    },
};

const ui = {
    dialog: {
        preference: {
            ctrl: new mdc.dialog.MDCDialog(document.querySelector('#dialog-preference')),
            location: { lon: null, lat: null, zoom: null, bearing: null, tilt: null, },
            size: { width: null, height: null, pixelRadio: null, },
            display: { labels: null, },
            init: () => {
                const dialogPref = ui.dialog.preference;
                const dialogElement = dialogPref.ctrl.root_;
                fetch(value.string.github.releaseUrl)
                    .then(response => response.json())
                    .then(response => {
                        document.getElementById('link-version').innerHTML = response.name;
                    });                
                
                dialogPref.location.lon = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-location-lon'));
                dialogPref.location.lat = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-location-lat'));
                dialogPref.location.zoom = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-location-zoom'));
                dialogPref.location.bearing = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-location-bearing'));
                dialogPref.location.tilt = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-location-tilt'));
                dialogPref.location.lon.value = preference.get(value.preference.location.lon);
                dialogPref.location.lat.value = preference.get(value.preference.location.lat);
                dialogPref.location.zoom.value = preference.get(value.preference.location.zoom);
                dialogPref.location.bearing.value = preference.get(value.preference.location.bearing);
                dialogPref.location.tilt.value = preference.get(value.preference.location.tilt);

                const buttonLocationSet = new mdc.ripple.MDCRipple(dialogElement.querySelector("#button-pref-location-set"));
                buttonLocationSet.listen('click', _ => dialogPref.setLocation());

                dialogPref.size.width = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-width'));
                dialogPref.size.height = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-height'));
                dialogPref.size.pixelRadio = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-pixelRadio'));
                const pixelRadio = window.devicePixelRatio;
                dialogPref.size.width.value = window.screen.width * pixelRadio;
                dialogPref.size.height.value = window.screen.height * pixelRadio;
                dialogPref.size.pixelRadio.value = pixelRadio;

                dialogPref.display.labels = new mdc.switchControl.MDCSwitch(dialogElement.querySelector('#switch-pref-display-labels'));
                dialogPref.display.labels.checked = preference.get(value.preference.display.labels);
                dialogPref.display.labels.listen('change', _ => {
                    ui.map.setLabels(dialogPref.display.labels.checked);
                });

                dialogPref.ctrl.listen('MDCDialog:opened', dialogPref.onOpened);
            },
            onOpened: () => {
                const dialogPref = ui.dialog.preference;
                dialogPref.location.lon.layout();
                dialogPref.location.lat.layout();
                dialogPref.location.zoom.layout();

                dialogPref.size.width.layout();
                dialogPref.size.height.layout();
                dialogPref.size.pixelRadio.layout();

                dialogPref.ctrl.layout();
            },
            setLocation: () => {
                const dialogPref = ui.dialog.preference;
                const lon = parseFloat(dialogPref.location.lon.value);
                const lat = parseFloat(dialogPref.location.lat.value);
                const zoom = parseFloat(dialogPref.location.zoom.value);
                const bearing = parseFloat(dialogPref.location.bearing.value);
                const tilt = parseFloat(dialogPref.location.tilt.value);
                let inputError = false;
                if (isNaN(lon) || lon < -180 || lon > 180) {
                    dialogPref.location.lon.value = value.preference.location.lon.def;
                    inputError = true;
                }
                if (isNaN(lat) || lat < -90 || lat > 90) {
                    dialogPref.location.lat.value = value.preference.location.lat.def;
                    inputError = true;
                }
                if (isNaN(zoom) || zoom < 0 || zoom > 20) {
                    dialogPref.location.zoom.value = value.preference.location.zoom.def;
                    inputError = true;
                }
                if (isNaN(bearing) || bearing < 0 || bearing > 360) {
                    dialogPref.location.bearing.value = value.preference.location.bearing.def;
                    inputError = true;
                }
                if (isNaN(tilt) || tilt < 0 || tilt > 60) {
                    dialogPref.location.tilt.value = value.preference.location.tilt.def;
                    inputError = true;
                }
                if (inputError) {
                    return;
                }
                ui.map.setLocation(lon, lat, zoom, bearing, tilt);
            },
            updateLocation: (lon, lat, zoom, bearing, tilt) => {
                const dialogPref = ui.dialog.preference;
                dialogPref.location.lon.value = lon;
                dialogPref.location.lat.value = lat;
                dialogPref.location.zoom.value = zoom;
                dialogPref.location.bearing.value = bearing;
                dialogPref.location.tilt.value = tilt;
            },
        },
    },
};

const process = {
    snapshot: () => {
        const mapDiv = document.createElement('div');
        // Modify size for HiDPI devices
        const pixelRadio = ui.dialog.preference.size.pixelRadio.value;
        const width  = ui.dialog.preference.size.width.value  / pixelRadio;
        const height = ui.dialog.preference.size.height.value / pixelRadio;
        mapDiv.style = `width:${width}px;height:${height}px;position:fixed;top:0;left:0;`;
        document.body.appendChild(mapDiv);
        const map = new mapboxgl.Map({
            container: mapDiv,
            style: ui.map.ctrl.getStyle(),
            bounds: ui.map.ctrl.getBounds(),
            preserveDrawingBuffer: true
        });
        map.once('idle', () => {
            // Save png from canvas
            //   Ref: https://stackoverflow.com/a/49521638
            map.getCanvas().toBlob((blob) => {
                const element = document.createElement('a');
                element.href = URL.createObjectURL(blob);
                element.download = 'Mapler.png';
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                map.remove();
                document.body.removeChild(mapDiv);
            });
        });
    },
};

// For Edge and IE which don't support toBlob()
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
}*/