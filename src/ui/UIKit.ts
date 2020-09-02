import MapKit from "./MapKit";
import ShotAction from './ShotAction';

export default class UIKit {

    map = new MapKit();
    shotAction = new ShotAction();
    
    init() {

        const body = document.body;
        body.className = 'mdc-typography fullheight flex-box-col';

        // MapKit
        this.map.init(body);

        // ShotAction
        this.shotAction.init(body);
    }
}