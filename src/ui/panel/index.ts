import { MDCDialog } from '@material/dialog';
import { MDCRipple } from '@material/ripple';
import { MDCSwitch } from '@material/switch';
import { MDCTextField } from '@material/textfield';

import { base } from 'ui/base';
import { eli } from 'eli/eli';
import { eliButton } from 'eli/button';
import { eliDialog } from 'eli/dialog';
import { eliSwitch } from 'eli/switch';
import { eliTextField } from 'eli/text-field';
import { service } from 'service';
import { version } from 'root/package.json';

import './styles.scss';

/**
 * Events for {@link PanelDialog}
 */
interface PanelEvents {
    /**
     * Triggered when click the set button
     */
    setCamera: (camera: base.Camera) => void;

    /**
     * Triggered when switch the Labels switcher
     */
    setLabels: (display: boolean) => void;
}

/**
 * The preference dialog component
 */
export default class Panel extends base.Prototype {

    private ctrl: MDCDialog = null;
    private items = {
        camera: {
            longitude:  null as MDCTextField,
            latitude:   null as MDCTextField,
            zoom:       null as MDCTextField,
            bearing:    null as MDCTextField,
            tilt:       null as MDCTextField,
        },
    
        size: {
            width:      null as MDCTextField,
            height:     null as MDCTextField,
            pixelRatio: null as MDCTextField,
        },
    
        display: {
            labels: null as MDCSwitch,
        },
    };

    events: PanelEvents = {
        setCamera: () => { },
        setLabels: () => { },
    };

    render() {
        // Contents
        const contents: Array<HTMLElement> = [];

        // Panel: Camera
        contents.push(eli('span', { className: 'headline', innerHTML: 'Camera' }));
        // Panel: Camera - Location
        const elementCameraLongitude = eliTextField({
            id: 'panel-camera-lon',
            label: 'Longitude',
            inputType: 'text',
            inputMode: 'decimal',
            required: true,
        });
        const elementCameraLatitude = eliTextField({
            id: 'panel-camera-lat',
            label: 'Latitude',
            inputType: 'text',
            inputMode: 'decimal',
            required: true,
        });
        // Panel: Camera - Others
        const elementCameraZoom = eliTextField({
            id: 'panel-camera-zoom',
            label: 'Zoom',
            inputType: 'text',
            inputMode: 'decimal',
            required: true,
        });
        const elementCameraBearing = eliTextField({
            id: 'panel-camera-bearing',
            label: 'Bearing',
            inputType: 'text',
            inputMode: 'decimal',
            required: true,
        });
        const elementCameraTilt = eliTextField({
            id: 'panel-camera-tilt',
            label: 'Tilt',
            inputType: 'text',
            inputMode: 'decimal',
            required: true,
        });
        // Panel: Camera - Set
        const elementSet = eliButton('Set');

        // Build Panel: Camera
        contents.push(eli('div', { className: 'camera' }, [
            eli('div', {
                className: 'location'
            }, [
                elementCameraLongitude, elementCameraLatitude
            ]),
            elementCameraZoom, elementCameraBearing, elementCameraTilt,
            elementSet
        ]));

        // Panel: Size
        contents.push(eli('span', { className: 'headline', innerHTML: 'Size' }));

        // Panel: Size - Width
        const elementSizeWidth = eliTextField({
            id: 'panel-size-width',
            label: 'Width',
            inputType: 'number',
            inputMode: 'numeric',
            required: true,
        });
        // Panel: Size - Height
        const elementSizeHeight = eliTextField({
            id: 'panel-size-height',
            label: 'Height',
            inputType: 'number',
            inputMode: 'numeric',
            required: true,
        });
        // Panel: Size - Pixel Ratio
        const elementSizePixelRatio = eliTextField({
            id: 'panel-size-pixelRatio',
            label: 'Pixel Ratio',
            inputType: 'number',
            inputMode: 'numeric',
            required: true,
        });

        contents.push(elementSizeWidth, elementSizeHeight, elementSizePixelRatio);

        // Panel: Display
        contents.push(eli('span', { className: 'headline', innerHTML: 'Display' }));

        // Panel: Display - Labels
        const elementDisplayLabels = eliSwitch('input-panel-display-labels');
        contents.push(eli('div', {
            className: 'switch',
        }, [
            elementDisplayLabels,
            eli('label', {
                for: 'nput-panel-display-labels',
                innerHTML: 'Labels',
            })
        ]));

        // About
        contents.push(eli('span', { className: 'headline', innerHTML: 'About' }));
        contents.push(eli('span', { className: 'about' }, [
            eliDialog.link(
                version,
                'https://github.com/lucka-me/mapler/blob/master/CHANGELOG.md',
                'Changelog'
            )
        ]));
        contents.push(eli('span', { className: 'about' }, [
            eliDialog.link(
                'Repository',
                'https://github.com/lucka-me/mapler',
            )
        ]));

        // Build dialog
        const elementDialog = eliDialog('panel', {
            title: 'Panel',
            contents: contents,
            actions: [ { action: 'close', text: 'Close' } ],
        });

        this.parent.append(elementDialog);
        this.ctrl = new MDCDialog(elementDialog);

        this.items.camera.longitude = new MDCTextField(elementCameraLongitude);
        this.items.camera.longitude.value = service.preference.get('mapler.camera.lon');
        this.items.camera.latitude = new MDCTextField(elementCameraLatitude);
        this.items.camera.latitude.value = service.preference.get('mapler.camera.lat');
        this.items.camera.zoom = new MDCTextField(elementCameraZoom);
        this.items.camera.zoom.value = service.preference.get('mapler.camera.zoom');
        this.items.camera.bearing = new MDCTextField(elementCameraBearing);
        this.items.camera.bearing.value = service.preference.get('mapler.camera.bearing');
        this.items.camera.tilt = new MDCTextField(elementCameraTilt);
        this.items.camera.tilt.value = service.preference.get('mapler.camera.tilt');
        const rippleSet = new MDCRipple(elementSet);
        rippleSet.listen('click', () => this.onSetCamera());

        const pixelRatio = window.devicePixelRatio;
        this.items.size.width = new MDCTextField(elementSizeWidth);
        this.items.size.width.value = `${window.screen.width * pixelRatio}`;
        this.items.size.height = new MDCTextField(elementSizeHeight);
        this.items.size.height.value = `${window.screen.height * pixelRatio}`;
        this.items.size.pixelRatio = new MDCTextField(elementSizePixelRatio);
        this.items.size.pixelRatio.value = `${pixelRatio}`;

        this.items.display.labels = new MDCSwitch(elementDisplayLabels);
        this.items.display.labels.checked = service.preference.get('mapler.display.labels');
        this.items.display.labels.listen('change', () => {
            this.events.setLabels(this.items.display.labels.checked)
        });
    }

    open() {
        if (!this.ctrl) this.render();
        this.ctrl.open();
    }

    /**
     * Get the size values in `[width, height, pixelRatio]`
     */
    get size(): [number, number, number] {
        let pixelRatio = window.devicePixelRatio;
        let width   = pixelRatio * window.screen.width;
        let height  = pixelRatio * window.screen.height;

        if (this.ctrl) {
            pixelRatio = parseFloat(this.items.size.pixelRatio.value);
            if (isNaN(pixelRatio)) {
                pixelRatio = window.devicePixelRatio;
                this.items.size.pixelRatio.value = `${pixelRatio}`;
            }

            width = parseInt(this.items.size.width.value);
            if (isNaN(width) || width < 1) {
                width = pixelRatio * window.screen.width;
                this.items.size.width.value = `${width}`;
            }

            height = parseInt(this.items.size.height.value);
            if (isNaN(height) || height < 1) {
                height = pixelRatio * window.screen.height;
                this.items.size.height.value = `${height}`;
            }
        }

        return [width, height, pixelRatio];
    }

    /**
     * Update camera values
     * @param lon Longitude
     * @param lat Latitude
     * @param zoom Zoom
     * @param bearing Bearing
     * @param tilt Tile
     */
    updateCamera(
        lon: number, lat: number,
        zoom: number, bearing: number, tilt: number
    ) {
        if (!this.ctrl) return;

        this.items.camera.longitude.value   = `${lon}`;
        this.items.camera.latitude.value    = `${lat}`;

        this.items.camera.zoom.value        = `${zoom}`;
        this.items.camera.bearing.value     = `${bearing}`;
        this.items.camera.tilt.value        = `${tilt}`;
    }

    /**
     * Check the value and pass to event if all correct
     */
    private onSetCamera() {
        let correct = true;

        let longitude = parseFloat(this.items.camera.longitude.value);
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            longitude = service.preference.get('mapler.camera.lon');;
            this.items.camera.longitude.value = `${longitude}`;
            correct = false;
        }

        let latitude = parseFloat(this.items.camera.latitude.value);
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            latitude = service.preference.get('mapler.camera.lat');;
            this.items.camera.latitude.value = `${latitude}`;
            correct = false;
        }

        let zoom = parseFloat(this.items.camera.zoom.value);
        if (isNaN(zoom) || zoom < 0 || zoom > 20) {
            zoom = service.preference.get('mapler.camera.zoom');;
            this.items.camera.zoom.value = `${zoom}`;
            correct = false;
        }

        let bearing = parseFloat(this.items.camera.bearing.value);
        if (isNaN(bearing) || bearing < 0 || bearing > 360) {
            bearing = service.preference.get('mapler.camera.bearing');;
            this.items.camera.bearing.value = `${bearing}`;
            correct = false;
        }

        let tilt = parseFloat(this.items.camera.tilt.value);
        if (isNaN(tilt) || tilt < 0 || tilt > 60) {
            tilt = service.preference.get('mapler.camera.tilt');;
            this.items.camera.tilt.value = `${tilt}`;
            correct = false;
        }

        if (correct) {
            this.events.setCamera({
                lon: longitude,
                lat: latitude,
                zoom: zoom,
                bearing: bearing,
                tilt: tilt
            });
        }
    }
}