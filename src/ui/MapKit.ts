import mapboxgl from 'mapbox-gl';

import Preference from '../service/Preference';
import StyleKit from '../service/StyleKit';
import UIKitPrototype, { Eli } from './prototype';

/**
 * Events for {@link MapKit}
 */
interface MapKitEvents {

    /**
     * Triggered when map idles
     */
    idle: (
        lon: number, lat: number,
        zoom: number, bearing: number, tilt: number
    ) => void,
}

/**
 * The map component
 */
export default class MapKit extends UIKitPrototype {

    ctrl: mapboxgl.Map = null;

    events: MapKitEvents = {
        idle: () => { },
    };

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
            style: StyleKit.getFromPreference().uri,
            center: [
                Preference.get('mapler.location.lon'),
                Preference.get('mapler.location.lat')
            ],
            zoom: Preference.get('mapler.location.zoom'),
            bearing: Preference.get('mapler.location.bearing'),
            pitch: Preference.get('mapler.location.tilt'),
        });
        this.ctrl.once('load', () => {
            if (!Preference.get('mapler.display.labels')) {
                this.setLabels(false);
            }
            this.ctrl.resize();
        });
        this.ctrl.on('idle', () => this.onIdle());
        this.ctrl.addControl(new mapboxgl.NavigationControl());
        this.ctrl.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                showUserLocation: false
            })
        );
    }

    /**
     * Show or hide labels
     * @param display Whether to display labels
     */
    setLabels(display: boolean) {
        Preference.set('mapler.display.labels', display);
        this.ctrl.getStyle().layers.forEach(layer => {
            if (layer.type === 'symbol') {
                this.ctrl.setLayoutProperty(layer.id, 'visibility', display ? 'visible' : 'none');
            }
        });
    }

    private onIdle() {
        const center = this.ctrl.getCenter();
        const zoom = this.ctrl.getZoom();
        const bearing = this.ctrl.getBearing();
        const tilt = this.ctrl.getPitch();

        this.events.idle(center.lng, center.lat, zoom, bearing, tilt);

        Preference.set('mapler.location.lon', center.lng);
        Preference.set('mapler.location.lat', center.lat);
        Preference.set('mapler.location.zoom', zoom);
        Preference.set('mapler.location.bearing', bearing);
        Preference.set('mapler.location.tilt', tilt);
    }

    /**
     * Set map style
     * @param uri URI of the style
     */
    setStyle(uri: string) {
        this.ctrl.setStyle(uri);
        if (!Preference.get('mapler.display.labels')) {
            this.ctrl.once('styledata', _ => {
                this.setLabels(false);
            });
        }
    }

    /**
     * Set the camera of map
     * @param lon Longitude
     * @param lat Latitude
     * @param zoom Zoom
     * @param bearing Bearing
     * @param tilt Tilt
     */
    setCamera(
        lon: number, lat: number,
        zoom: number, bearing: number, tilt: number
    ) {
        this.ctrl.flyTo({
            center: [lon, lat],
            zoom: zoom, bearing: bearing, pitch: tilt,
        });
    }

    /**
     * Take snapshot
     */
    shot() {

    }
}