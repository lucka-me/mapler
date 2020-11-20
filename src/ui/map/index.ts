import mapboxgl from 'mapbox-gl';

import { base } from 'ui/base';
import { eli } from 'eli/eli';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

interface Configures {
    camera: base.Camera,
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
    idle: (camera: base.Camera) => void,
}

/**
 * The map component
 */
export default class MapKit extends base.Prototype {

    private root: HTMLElement = null;
    private ctrl: mapboxgl.Map = null;

    private config: Configures = {
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
            style: this.config.style,
            center: [
                this.config.camera.lon,
                this.config.camera.lat
            ],
            zoom: this.config.camera.zoom,
            bearing: this.config.camera.bearing,
            pitch: this.config.camera.tilt,
            preserveDrawingBuffer: true,
        });
        this.ctrl.once('load', () => {
            if (!this.config.displayLabels) {
                this.diaplayLabels = false;
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

        this.events.idle({
            lon: center.lng,
            lat: center.lat,
            zoom: this.ctrl.getZoom(),
            bearing: this.ctrl.getBearing(),
            tilt: this.ctrl.getPitch()
        });
    }

    set defaults(config: Configures) {
        this.config = config;
    }

    /**
     * Show or hide labels
     * @param display Whether to display labels
     */
    set diaplayLabels(display: boolean) {
        this.config.displayLabels = display;
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
    set style(uri: string) {
        this.ctrl.setStyle(uri);
        if (!this.config.displayLabels) {
            this.ctrl.once('styledata', () => this.diaplayLabels = false);
        }
    }

    /**
     * Set the camera of map
     * @param camera Camera to set
     */
    set camera(camera: base.Camera) {
        this.ctrl.flyTo({
            center: [camera.lon, camera.lat],
            zoom: camera.zoom, bearing: camera.bearing, pitch: camera.tilt,
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