import { base } from './base';
import { service } from 'service';

import AppBar from './app-bar';
import MapKit from './map';
import Panel from './panel';
import ShotAction from './shot';

import './styles.scss';

/**
 * The whole user interface
 */
export namespace ui {

    const appBar = new AppBar();
    const map = new MapKit();
    const panel = new Panel();
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
        panel.init(body);
        panel.events.setCamera = (camera) => {
            map.camera = camera;
        };
        panel.events.setLabels = (display) => {
            service.preference.set('mapler.display.labels', display);
            map.diaplayLabels = display;
        };

        appBar.events.openPanel = () => panel.open();
        appBar.events.selectStyle = (index) => {
            map.style = service.style.select(index).uri;
        };

        map.events.idle = (camera) => {
            saveCamera(camera);
            panel.camera = camera;
        };

        shotAction.events.click = () => {
            appBar.disable();
            shotAction.hide();
            map.shot(
                panel.size,
                () => {
                    appBar.enable();
                    shotAction.show();
                }
            );
        };
    }

    function saveCamera(camera: base.Camera) {
        service.preference.set('mapler.camera.lon', camera.lon);
        service.preference.set('mapler.camera.lat', camera.lat);
        service.preference.set('mapler.camera.zoom', camera.zoom);
        service.preference.set('mapler.camera.bearing', camera.bearing);
        service.preference.set('mapler.camera.tilt', camera.tilt);
    }
}