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
        body.className = 'mdc-typography flex-box-col';

        // AppBar
        appBar.init(body);

        // MapKit
        map.init(body);

        // ShotActions
        shotAction.init(body);

        // PanelDialog
        panelDialog.init(body);
        panelDialog.events.setLabels = (display) => this.map.setLabels(display);

        appBar.events.openPreference = () => this.panelDialog.open();
        appBar.events.selectStyle = (index) => this.map.setStyle(index);

        map.events.idle = (...args) => this.panelDialog.updateCamera(...args);

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
}