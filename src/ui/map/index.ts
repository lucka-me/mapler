import mapboxgl from 'mapbox-gl';

import { base } from 'ui/base';
import { eli } from 'eli/eli';

import './styles.scss';

interface Camera {
    lon: number,
    lat: number,
    zoom: number,
    bearing: number,
    tilt: number
}

interface Configure {
    camera: Camera,
    style: string,
    displayLabels: boolean,
}

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
export default class MapKit extends base.Prototype {

    root: HTMLElement = null;
    ctrl: mapboxgl.Map = null;

    defaults: Configure = {
        camera: {
            lon: 0,
            lat: 0,
            zoom: 0,
            bearing: 0,
            tilt: 0
        },
        style: '',
        displayLabels: true,
    }

    events: MapKitEvents = {
        idle: () => { },
    };

    init(parent: HTMLElement) {
        super.init(parent);
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw';
        this.render();
    }

    render() {
        this.root = eli('div', { className: 'map' });
        this.parent.append(this.root);

        this.ctrl = new mapboxgl.Map({
            container: this.root,
            style: this.defaults.style,
            center: [
                this.defaults.camera.lon,
                this.defaults.camera.lat
            ],
            zoom: this.defaults.camera.zoom,
            bearing: this.defaults.camera.bearing,
            pitch: this.defaults.camera.tilt,
            preserveDrawingBuffer: true,
        });
        this.ctrl.once('load', () => {
            if (!this.defaults.displayLabels) {
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

    private onIdle() {
        const center = this.ctrl.getCenter();
        const zoom = this.ctrl.getZoom();
        const bearing = this.ctrl.getBearing();
        const tilt = this.ctrl.getPitch();

        this.events.idle(center.lng, center.lat, zoom, bearing, tilt);
    }

    /**
     * Show or hide labels
     * @param display Whether to display labels
     */
    setLabels(display: boolean) {
        this.ctrl.getStyle().layers.forEach(layer => {
            if (layer.type === 'symbol') {
                this.ctrl.setLayoutProperty(layer.id, 'visibility', display ? 'visible' : 'none');
            }
        });
    }

    /**
     * Set map style
     * @param index Index of the style
     */
    setStyle(uri: string, displayLabels: boolean) {
        this.ctrl.setStyle(uri);
        if (!displayLabels) {
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
     * @param finished Callback triggered when file generated
     * @param width Width of target device
     * @param height Height of target device
     * @param pixelRatio Pixel ratio of target device
     */
    shot(finished: () => void, width: number, height: number, pixelRatio: number) {
        // Generate a image to cover the map temporarily
        const cover = eli('img', {
            className: 'cover',
            src: this.ctrl.getCanvas().toDataURL()
        });
        this.parent.append(cover);
        const bounds = this.ctrl.getBounds();
        this.root.classList.add('producing');
        this.root.style.width = `${width / pixelRatio}px`;
        this.root.style.height = `${height / pixelRatio}px`;
        this.ctrl.resize();
        this.ctrl.fitBounds(bounds);
        this.ctrl.once('idle', () => {
            const element = eli('a', {
                href: this.ctrl.getCanvas().toDataURL(),
                download: 'Mapler.png',
                cssText: 'display:none'
            });
            this.parent.append(element);
            element.click();
            this.parent.removeChild(element);
            this.root.classList.remove('producing');
            this.root.style.cssText = '';
            this.ctrl.resize();
            this.ctrl.fitBounds(bounds);
            this.parent.removeChild(cover);
            finished();
        });
    }
}