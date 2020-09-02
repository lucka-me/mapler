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
        const mapContainer = Eli.build('div', {
            cssText: 'flex: 2; height: 100%; min-width: 300px;'
        });
        const element = Eli.build('div', {
            cssText: [
                'flex: 1',
                'display: flex',
                'min-height: 0%',
                'flex-flow: row wrap'
            ].join(';'),
        }, [ mapContainer ]);
        this.parent.append(element);

        this.ctrl = new mapboxgl.Map({
            container: mapContainer,
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