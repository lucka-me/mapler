import { service } from 'service';
import AppBar from './app-bar';
import MapKit, { Camera } from './map';
import PanelDialog from "./panel";
import ShotAction from './shot';

import './styles.scss';

/**
 * The whole user interface
 */
export namespace ui {

    const appBar = new AppBar();
    const map = new MapKit();
    const panelDialog = new PanelDialog();
    const shotAction = new ShotAction();
    
    export function init() {

        const body = document.body;

        // AppBar
        appBar.init(body);

        // MapKit
        map.defaults = {
            camera: {
                lon: service.preference.get('mapler.camera.lon'),
                lat: service.preference.get('mapler.camera.lat'),
                zoom: service.preference.get('mapler.camera.zoom'),
                bearing: service.preference.get('mapler.camera.bearing'),
                tilt: service.preference.get('mapler.camera.tilt'),
            },
            style: service.style.selectedStyle.uri,
            displayLabels: service.preference.get('mapler.display.labels'),
        };
        map.init(body);

        // ShotActions
        shotAction.init(body);

        // PanelDialog
        panelDialog.init(body);
        panelDialog.events.setCamera = (lon, lat, zoom, bearing, tilt) => {
            map.camera = {
                lon: lon, lat: lat,
                zoom: zoom, bearing: bearing, tilt: tilt
            };
        };
        panelDialog.events.setLabels = (display) => {
            service.preference.set('mapler.display.labels', display);
            map.diaplayLabels = display;
        };

        appBar.events.openPreference = () => panelDialog.open();
        appBar.events.selectStyle = (index) => {
            map.style = service.style.select(index).uri;
        };

        map.events.idle = (camera) => {
            saveCamera(camera);
            panelDialog.updateCamera(camera.lon, camera.lat, camera.zoom, camera.bearing, camera.tilt);
        };

        shotAction.events.click = () => {
            appBar.disable();
            shotAction.hide();
            map.shot(
                () => {
                    appBar.enable();
                    shotAction.show();
                },
                ...panelDialog.size
            );
        };
    }

    function saveCamera(camera: Camera) {
        service.preference.set('mapler.camera.lon', camera.lon);
        service.preference.set('mapler.camera.lat', camera.lat);
        service.preference.set('mapler.camera.zoom', camera.zoom);
        service.preference.set('mapler.camera.bearing', camera.bearing);
        service.preference.set('mapler.camera.tilt', camera.tilt);
    }
}