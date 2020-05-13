/**
 * Created by lucka on 07/21/2018.
 * @author lucka-me
 */

const value = {
    string: {
        github: {
            releaseUrl: 'https://api.github.com/repos/lucka-me/mapler/releases/latest',
        },
        mapbox: {
            accessToken: 'pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw',
            style: [
                { uri: 'mapbox://styles/mapbox/streets-v11'             , title: 'Streets' },
                { uri: 'mapbox://styles/mapbox/light-v10'               , title: 'Light' },
                { uri: 'mapbox://styles/mapbox/dark-v10'                , title: 'Dark' },
                { uri: 'mapbox://styles/mapbox/outdoors-v11'            , title: 'Outdoors' },
                { uri: 'mapbox://styles/mapbox/satellite-v9'            , title: 'Satellite' },
                { uri: 'mapbox://styles/mapbox/satellite-streets-v11'   , title: 'Satellite Streets' },

                { uri: 'mapbox://styles/mapbox/cjzoh882k2njo1crylb28iiz3'   , title: 'Pencil' },
                { uri: 'mapbox://styles/mapbox/cjvshts5l1et01coz11pa6jam'   , title: 'Frank' },
                { uri: 'mapbox://styles/mapbox/cjku6bhmo15oz2rs8p2n9s2hm'   , title: 'Minimo' },
                { uri: 'mapbox://styles/mapbox/cjcunv5ae262f2sm9tfwg8i0w'   , title: 'Lè Shine' },
                { uri: 'mapbox://styles/mapbox/cjerxnqt3cgvp2rmyuxbeqme7'   , title: 'Cali Terrain' },
                { uri: 'mapbox://styles/mapbox/cj7t3i5yj0unt2rmt3y4b5e32'   , title: 'Ice Cream' },
                { uri: 'mapbox://styles/mapbox/cj5l80zrp29942rmtg0zctjto'   , title: 'Decimal' },
                { uri: 'mapbox://styles/mapbox/cj44mfrt20f082snokim4ungi'   , title: 'North Star' },
                { uri: 'mapbox://styles/mapbox/cj3kbeqzo00022smj7akz3o1e'   , title: 'Moonlight' },
                { uri: 'mapbox://styles/mapbox/cjtep62gq54l21frr1whf27ak'   , title: 'Mineral' },
                { uri: 'mapbox://styles/mapbox/cj4k8wmwy5lbt2smsigkbh18e'   , title: 'Standard' },

                { uri: 'mapbox://styles/lucka-me/cjjvmr0mn5csl2rmx5cbgmb0y' , title: 'Dark' },
                { uri: 'mapbox://styles/lucka-me/cjjzm06vz0cwl2rnnzgdgkf7j' , title: 'Hack' },
            ],
        },
        preference: {
            selectedStyle: "mapler.selectedStyle",
        }
    },
};

const ui = {
    appBar: {
        style: {
            menu: null,
            label: document.getElementById("label-button-appBar-style"),
            init: () => {
                ui.appBar.style.label.innerHTML = ui.map.getStyleFromPreference().title;
                const menuElement = document.querySelector("#menu-style");
                const menuList = menuElement.querySelector("ul");
                for (const index in value.string.mapbox.style) {
                    const menuItem = document.createElement("ul");
                    menuItem.className = "mdc-list-item";
                    menuItem.setAttribute("role", "menuitem");
                    menuItem.dataset.code = index;
                    const menuLabel = document.createElement("span");
                    menuLabel.className = "mdc-list-item__text";
                    menuLabel.innerHTML = value.string.mapbox.style[index].title;
                    menuItem.appendChild(menuLabel);
                    menuList.appendChild(menuItem);
                }
                ui.appBar.style.menu = new mdc.menu.MDCMenu(menuElement);
                ui.appBar.style.menu.listen("MDCMenu:selected", ui.appBar.style.onSelected);
                const menuButton = new mdc.ripple.MDCRipple(document.querySelector("#button-appBar-style"));
                menuButton.listen("click", () => ui.appBar.style.menu.open = true );
            },
            onSelected: (event) => {
                const index = event.detail.item.dataset.code;
                preference.set(value.string.preference.selectedStyle, index);
                ui.appBar.style.label.innerHTML = value.string.mapbox.style[index].title;
                ui.map.setStyle(value.string.mapbox.style[index].uri);
            },
        },
        init: () => {
            ui.appBar.style.init();

            const buttonElementPref = document.querySelector('#button-appBar-preference');
            const buttonPref = new mdc.ripple.MDCRipple(buttonElementPref);
            buttonPref.unbounded = true;
            buttonPref.listen('click', () => ui.dialog.preference.ctrl.open());
        },
    },
    dialog: {
        preference: {
            ctrl: new mdc.dialog.MDCDialog(document.querySelector('#dialog-preference')),
            size: { width: null, height: null, pixelRadio: null, },
            display: { labels: null, },
            init: () => {
                const dialogElement = ui.dialog.preference.ctrl.root_;
                fetch(value.string.github.releaseUrl)
                    .then(response => response.json())
                    .then(response => {
                        document.getElementById('link-version').innerHTML = response.name;
                    });
                
                ui.dialog.preference.size.width = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-width'));
                ui.dialog.preference.size.height = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-height'));
                ui.dialog.preference.size.pixelRadio = new mdc.textField.MDCTextField(dialogElement.querySelector('#field-pref-size-pixelRadio'));
                const pixelRadio = window.devicePixelRatio;
                ui.dialog.preference.size.width.value = window.screen.width * pixelRadio;
                ui.dialog.preference.size.height.value = window.screen.height * pixelRadio;
                ui.dialog.preference.size.pixelRadio.value = pixelRadio;

                ui.dialog.preference.display.labels = new mdc.switchControl.MDCSwitch(dialogElement.querySelector('#switch-pref-display-labels'));
                ui.dialog.preference.display.labels.checked = true;
                ui.dialog.preference.display.labels.listen('change', _ => {
                    ui.map.setLabels(ui.dialog.preference.display.labels.checked);
                });

                ui.dialog.preference.ctrl.listen('MDCDialog:opened', ui.dialog.preference.onOpened);
            },
            onOpened: () => {
                ui.dialog.preference.size.width.layout();
                ui.dialog.preference.size.height.layout();
                ui.dialog.preference.size.pixelRadio.layout();
            },
        },
    },
    map: {
        ctrl: null,
        load: () => {
            mapboxgl.accessToken = value.string.mapbox.accessToken;
            ui.map.ctrl = new mapboxgl.Map({ 
                container: 'map-main',
                style: ui.map.getStyleFromPreference().uri,
                zoom: 12,
                center: [108.9435278, 34.2651799],
            });
            ui.map.ctrl.on('load', () => ui.map.ctrl.resize());
            ui.map.ctrl.addControl(new mapboxgl.NavigationControl());
            ui.map.ctrl.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    showUserLocation: false
                })
            );
        },
        getStyleFromPreference: () => {
            let index = parseInt(preference.get(value.string.preference.selectedStyle, 0));
            if (index < 0 || index > value.string.mapbox.style.length - 1) {
                index = 0;
                preference.set(value.string.preference.selectedStyle, selectedStyle);
            }
            return value.string.mapbox.style[index];
        },
        setStyle: (uri) => {
            ui.map.ctrl.setStyle(uri);
            if (!ui.dialog.preference.display.labels.checked) {
                ui.map.ctrl.once('styledata', _ => {
                    ui.map.setLabels(false);
                });
            }
        },
        setLabels: (display) => {
            ui.map.ctrl.getStyle().layers.forEach(layer => {
                if (layer.type === 'symbol') {
                    ui.map.ctrl.setLayoutProperty(layer.id, 'visibility', display ? 'visible' : 'none');
                }
            });
        },
    },
    init: () => {
        ui.appBar.init();
        ui.dialog.preference.init();

        const fabSnapshot = new mdc.ripple.MDCRipple(document.querySelector('#fab-snapshot'));
        fabSnapshot.unbounded = true;
        fabSnapshot.listen('click', () => process.snapshot());
    }
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
        map.on('idle', () => {
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

const preference = {
    set: (key, value) => localStorage.setItem(key, value),
    get: (key, defaultValue) => {
        const value = localStorage.getItem(key);
        return (value === null) ? defaultValue : value;
    }
}

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

function isHex(string) {
    var reg = /(^[0-9a-fA-F]{6}$)|(^[0-9a-fA-F]{3}$)/;
    return string && reg.test(string);
}
