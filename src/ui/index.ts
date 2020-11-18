import AppBar from "./app-bar";
import MapKit from "./map";
import PanelDialog from "./panel";
import ShotAction from './shot';

import './styles.scss';

/**
 * The whole user interface
 */
export default class UIKit {

    appBar = new AppBar();
    map = new MapKit();
    panelDialog = new PanelDialog();
    shotAction = new ShotAction();
    
    init() {

        const body = document.body;
        body.className = 'mdc-typography flex-box-col';

        // AppBar
        this.appBar.init(body);

        // MapKit
        this.map.init(body);

        // ShotActions
        this.shotAction.init(body);

        // PanelDialog
        this.panelDialog.init(body);
        this.panelDialog.events.setLabels = (display) => this.map.setLabels(display);

        this.appBar.events.openPreference = () => this.panelDialog.open();
        this.appBar.events.selectStyle = (index) => this.map.setStyle(index);

        this.map.events.idle = (...args) => this.panelDialog.updateCamera(...args);

        this.shotAction.events.click = () => {
            this.appBar.disable();
            this.shotAction.hide();
            this.map.shot(
                () => {
                    this.appBar.enable();
                    this.shotAction.show();
                },
                ...this.panelDialog.size
            );
        };
    }
}