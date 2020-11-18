import { service } from "service";
import AppBar from "./app-bar";
import MapKit from "./map";
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
        }
        map.init(body);

        // ShotActions
        shotAction.init(body);

        // PanelDialog
        panelDialog.init(body);
        panelDialog.events.setLabels = (display) => {
            service.preference.set('mapler.display.labels', display);
            map.setLabels(display);
        }

        appBar.events.openPreference = () => panelDialog.open();
        appBar.events.selectStyle = (index) => {
            map.setStyle(
                service.style.select(index).uri,
                service.preference.get('mapler.display.labels')
            );
        };

        map.events.idle = (...args) => {
            saveCamera(...args);
            panelDialog.updateCamera(...args);
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

    function saveCamera(
        lon: number, lat: number,
        zoom: number, bearing: number, tilt: number
    ) {
        service.preference.set('mapler.camera.lon', lon);
        service.preference.set('mapler.camera.lat', lat);
        service.preference.set('mapler.camera.zoom', zoom);
        service.preference.set('mapler.camera.bearing', bearing);
        service.preference.set('mapler.camera.tilt', tilt);
    }
}