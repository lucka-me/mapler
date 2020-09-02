import mapboxgl from 'mapbox-gl';
import UIKitPrototype, { Eli } from './prototype';

/**
 * The map component
 */
export default class MapKit extends UIKitPrototype {

    ctrl: mapboxgl.Map = null;

    init(parent: HTMLElement) {
        super.init(parent);
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw';
        this.render();
    }

    render() {
        const element = Eli.build('div', { cssText: 'flex: 1' });
        this.parent.append(element);

        this.ctrl = new mapboxgl.Map({
            container: element,
        });
        this.ctrl.addControl(new mapboxgl.NavigationControl());
        this.ctrl.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                showUserLocation: false
            })
        );
    }
}