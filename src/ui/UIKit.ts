import AppBar from "./AppBar";
import MapKit from "./MapKit";
import ShotAction from './ShotAction';

/**
 * The whole user interface
 */
export default class UIKit {

    appBar = new AppBar();
    map = new MapKit();
    shotAction = new ShotAction();
    
    init() {

        const body = document.body;
        body.className = 'mdc-typography flex-box-col';

        // AppBar
        this.appBar.init(body);

        // MapKit
        this.map.init(body);

        // ShotAction
        this.shotAction.init(body);
    }
}