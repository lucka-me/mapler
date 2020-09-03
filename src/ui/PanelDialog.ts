import packageData from "../../package.json";
import { MDCDialog } from "@material/dialog";
import { MDCRipple } from "@material/ripple";
import { MDCSwitch } from "@material/switch";
import { MDCTextField } from "@material/textfield";

import UIKitPrototype, { Eli } from "./prototype";
import Preference from "../service/Preference";

/**
 * Events for {@link PanelDialog}
 */
interface PanelDialogEvents {
    /**
     * Triggered when click the set button
     */
    setCamera: (
        lon: number, lat: number,
        zoom: number, bearing: number, tilt: number
    ) => void;

    /**
     * Triggered when switch the Labels switcher
     */
    setLabels: (display: boolean) => void;
}

/**
 * Preference components for {@link PanelDialog}
 */
class PanelControl {
    camera = {
        longitude:  null as MDCTextField,
        latitude:   null as MDCTextField,
        zoom:       null as MDCTextField,
        bearing:    null as MDCTextField,
        tilt:       null as MDCTextField,
    };

    size = {
        width:      null as MDCTextField,
        height:     null as MDCTextField,
        pixelRatio: null as MDCTextField,
    };

    display = {
        labels: null as MDCSwitch,
    };
}

/**
 * The preference dialog component
 */
export default class PanelDialog extends UIKitPrototype {

    private ctrl: MDCDialog = null;
    private panelCtrl = new PanelControl();

    events: PanelDialogEvents = {
        setCamera: () => { },
        setLabels: () => { },
    };

    render() {

        const parts: Array<HTMLElement> = [];

        // Title
        parts.push(Eli.build('h2', {
            className: 'mdc-dialog__title',
            innerHTML: 'Preference'
        }));
        
        // Contents
        const contents: Array<HTMLElement> = [];

        // Preference: Camera
        contents.push(this.buildHeadline('Camera'));
        const contentsCamera: Array<HTMLElement> = [];
        // Preference: Camera - Location
        const elementCameraLongitude = this.buildTextfield('text', 'decimal', 'Longitude', 'input-pref-camera-lon');
        this.panelCtrl.camera.longitude = new MDCTextField(elementCameraLongitude);
        this.panelCtrl.camera.longitude.value = Preference.get('mapler.camera.lon');

        const elementCameraLatitude = this.buildTextfield('text', 'decimal', 'Latitude ', 'input-pref-camera-lat');
        this.panelCtrl.camera.latitude = new MDCTextField(elementCameraLatitude);
        this.panelCtrl.camera.latitude.value = Preference.get('mapler.camera.lat');

        contentsCamera.push(Eli.build('div', {
            className: 'flex-box-row--nowrap flex-align-items--baseline'
        }, [
            elementCameraLongitude, elementCameraLatitude
        ]));

        // Preference: Camera - Others
        const elementCameraZoom = this.buildTextfield('text', 'decimal', 'Zoom', 'input-pref-camera-zoom');
        this.panelCtrl.camera.zoom = new MDCTextField(elementCameraZoom);
        this.panelCtrl.camera.zoom.value = Preference.get('mapler.camera.zoom');

        const elementCameraBearing = this.buildTextfield('text', 'decimal', 'Bearing', 'input-pref-camera-bearing');
        this.panelCtrl.camera.bearing = new MDCTextField(elementCameraBearing);
        this.panelCtrl.camera.bearing.value = Preference.get('mapler.camera.bearing');

        const elementCameraTilt = this.buildTextfield('text', 'decimal', 'Tilt', 'input-pref-camera-tilt');
        this.panelCtrl.camera.tilt = new MDCTextField(elementCameraTilt);
        this.panelCtrl.camera.tilt.value = Preference.get('mapler.camera.tilt');

        contentsCamera.push(
            elementCameraZoom, elementCameraBearing, elementCameraTilt
        );

        // Preference: Camera - Set
        const elementSet = Eli.build('button', {
            className: 'mdc-button mdc-button--unelevated margin-v--8 margin-h--4',
        }, [
            Eli.build('span', { className: 'mdc-button__label', innerHTML: 'Set' })
        ]);
        const rippleSet = new MDCRipple(elementSet);
        rippleSet.listen('click', () => this.onSetCamera());

        // Build Preference: Camera
        contents.push(Eli.build('div', {
            className: 'flex-box-row--wrap flex-align-items--center'
        }, contentsCamera));

        // Preference: Size
        contents.push(this.buildHeadline('Size'));
        const pixelRatio = window.devicePixelRatio;

        // Preference: Size - Width
        const elementSizeWidth = this.buildTextfield('number', 'numeric', 'Width', 'input-pref-size-width');
        
        this.panelCtrl.size.width = new MDCTextField(elementSizeWidth);
        this.panelCtrl.size.width.value = `${window.screen.width * pixelRatio}`;

        // Preference: Size - Height
        const elementSizeHeight = this.buildTextfield('number', 'numeric', 'Height', 'input-pref-size-height');
        this.panelCtrl.size.height = new MDCTextField(elementSizeHeight);
        this.panelCtrl.size.height.value = `${window.screen.height * pixelRatio}`;

        // Preference: Size - Pixel Ratio
        const elementSizePixelRatio = this.buildTextfield('number', 'numeric', 'Pixel Ratio', 'input-pref-size-pixelRatio');
        this.panelCtrl.size.pixelRatio = new MDCTextField(elementSizePixelRatio);
        this.panelCtrl.size.pixelRatio.value = `${pixelRatio}`;

        contents.push(elementSizeWidth, elementSizeHeight, elementSizePixelRatio);

        // Preference: Display
        contents.push(this.buildHeadline('Display'));

        // Preference: Display - Labels
        const elementDisplayLabels = Eli.build('div', { className: 'mdc-switch' }, [
            Eli.build('div', { className: 'mdc-switch__track' }),
            Eli.build('div', {
                className: 'mdc-switch__thumb-underlay',
                id: 'input-pref-display-labels',
            }, [
                Eli.build('div', { className: 'mdc-switch__thumb' }, [
                    Eli.build('input', {
                        type: 'checkbox',
                        className: 'mdc-switch__native-control',
                        role: 'switch',
                    }),
                ]),
            ]),
        ]);
        const containerDisplayLabels = Eli.build('div', {
            className: 'mdc-switch-box margin-h--4',
        }, [
            elementDisplayLabels,
            Eli.build('label', {
                for: 'input-pref-display-labels',
                title: 'Labels',
                innerHTML: 'Labels',
            })
        ]);
        this.panelCtrl.display.labels = new MDCSwitch(elementDisplayLabels);
        this.panelCtrl.display.labels.checked = Preference.get('mapler.display.labels');
        this.panelCtrl.display.labels.listen('change', () => {
            this.events.setLabels(this.panelCtrl.display.labels.checked)
        });
        contents.push(containerDisplayLabels);

        // About
        contents.push(this.buildHeadline('About'));
        contents.push(Eli.build('span', {
            className: 'mdc-typography--body2'
        }, [
            Eli.link(
                'https://github.com/lucka-me/mapler',
                'GitHub', 'Repository'
            )
        ]));
        contents.push(Eli.build('span', {
            className: 'mdc-typography--body2'
        }, [
            Eli.link(
                'https://github.com/lucka-me/mapler/blob/master/CHANGELOG.md',
                'Changelog', packageData.version
            ),
            ' by ',
            Eli.link(
                'https://lucka.moe', 'Blog', 'Lucka'
            )
        ]));

        // Build contents
        parts.push(Eli.build('div', {
            className: 'mdc-dialog__content flex-box-col scrollable'
        }, contents));

        // Footer
        parts.push(
            Eli.build('footer', { className: 'mdc-dialog__actions' }, [
                Eli.build('button', {
                    className: 'mdc-button mdc-dialog__button',
                    dataset: { mdcDialogAction: 'close', },
                }, [
                    Eli.build('span', {
                        className: 'mdc-button__label', innerHTML: 'Close'
                    }),
                ])
            ])
        );

        // Build dialog
        const elementDialog = Eli.build('div', {
            className: 'mdc-dialog mdc-dialog--scrollable',
            role: 'dialog',
            ariaModal: true,
        }, [
            Eli.build('div', { className: 'mdc-dialog__container' }, [
                Eli.build('div', { className: 'mdc-dialog__surface' }, parts),
            ]),
            Eli.build('div', { className: 'mdc-dialog__scrim' }),
        ]);

        this.parent.append(elementDialog);
        this.ctrl = new MDCDialog(elementDialog);
    }

    open() {
        if (!this.ctrl) this.render();
        this.ctrl.open();
    }

    get size() {
        let width = parseInt(this.panelCtrl.size.width.value);
        if (isNaN(width)) {
            width = window.screen.width;
            this.panelCtrl.size.width.value = `${width}`;
        }

        let height = parseInt(this.panelCtrl.size.height.value);
        if (isNaN(height)) {
            height = window.screen.height;
            this.panelCtrl.size.height.value = `${height}`;
        }

        let pixelRatio = parseFloat(this.panelCtrl.size.pixelRatio.value);
        if (isNaN(pixelRatio)) {
            pixelRatio = window.devicePixelRatio;
            this.panelCtrl.size.pixelRatio.value = `${pixelRatio}`;
        }

        return {
            width: width,
            height: height,
            pixelRatio: pixelRatio,
        };
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
        this.panelCtrl.camera.longitude.value   = `${lon}`;
        this.panelCtrl.camera.latitude.value    = `${lat}`;

        this.panelCtrl.camera.zoom.value        = `${zoom}`;
        this.panelCtrl.camera.bearing.value     = `${bearing}`;
        this.panelCtrl.camera.tilt.value        = `${tilt}`;
    }

    /**
     * Check the value and pass to event if all correct
     */
    private onSetCamera() {
        let correct = true;

        let longitude = parseFloat(this.panelCtrl.camera.longitude.value);
        if (isNaN(longitude) || longitude < -180 || longitude > 180) {
            longitude = Preference.get('mapler.camera.lon');;
            this.panelCtrl.camera.longitude.value = `${longitude}`;
            correct = false;
        }

        let latitude = parseFloat(this.panelCtrl.camera.latitude.value);
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
            latitude = Preference.get('mapler.camera.lat');;
            this.panelCtrl.camera.latitude.value = `${latitude}`;
            correct = false;
        }

        let zoom = parseFloat(this.panelCtrl.camera.zoom.value);
        if (isNaN(zoom) || zoom < 0 || zoom > 20) {
            zoom = Preference.get('mapler.camera.zoom');;
            this.panelCtrl.camera.zoom.value = `${zoom}`;
            correct = false;
        }

        let bearing = parseFloat(this.panelCtrl.camera.bearing.value);
        if (isNaN(bearing) || bearing < 0 || bearing > 360) {
            bearing = Preference.get('mapler.camera.bearing');;
            this.panelCtrl.camera.bearing.value = `${bearing}`;
            correct = false;
        }

        let tilt = parseFloat(this.panelCtrl.camera.tilt.value);
        if (isNaN(tilt) || tilt < 0 || tilt > 60) {
            tilt = Preference.get('mapler.camera.tilt');;
            this.panelCtrl.camera.tilt.value = `${tilt}`;
            correct = false;
        }

        if (correct) {
            this.events.setCamera(longitude, latitude, zoom, bearing, tilt);
        }
    }

    /**
     * Build a headline element
     * @param text Text to display
     * @returns The headline element
     */
    private buildHeadline(text: string): HTMLSpanElement {
        return Eli.build('span', {
            className: 'mdc-typography--headline6', innerHTML: text
        });
    }

    /**
     * Build a MDC textfield element
     * @param type Type of the `<input>`, like `text` or `number`
     * @param inputmode Input mode of the `<input>`, like `decimal` or `number`
     * @param label Text displayed in label
     * @param id Id for `<input>` and `<label>`
     * @returns The headline element
     */
    private buildTextfield(type: string, inputmode: string, label: string, id: string): HTMLDivElement {
        return Eli.build('div', {
            className: 'mdc-text-field mdc-text-field--outlined margin-v--8 margin-h--4'
        }, [
            Eli.build('input', {
                type: type, inputmode: inputmode, id: id,
                className: 'mdc-text-field__input'
            }),
            Eli.build('div', { className: 'mdc-notched-outline' }, [
                Eli.build('div', { className: 'mdc-notched-outline__leading' }),
                Eli.build('div', { className: 'mdc-notched-outline__notch' }, [
                    Eli.build('label', {
                        for: id, innerHTML: label,
                        className: 'mdc-floating-label'
                    })
                ]),
                Eli.build('div', { className: 'mdc-notched-outline__trailing' }),
            ])
        ]);
    }
}