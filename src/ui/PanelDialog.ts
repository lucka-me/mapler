import packageData from "../../package.json";
import { MDCDialog } from "@material/dialog";
import { MDCRipple } from "@material/ripple";
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
}

/**
 * The preference dialog component
 */
export default class PanelDialog extends UIKitPrototype {

    private ctrl: MDCDialog = null;
    private panelCtrl = new PanelControl();

    events: PanelDialogEvents = {
        setCamera: () => { }
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
        const elementCameraLongitude = this.buildTextfield('Longitude', 'input-pref-camera-lon');
        this.panelCtrl.camera.longitude = new MDCTextField(elementCameraLongitude);
        this.panelCtrl.camera.longitude.value = Preference.get('mapler.camera.lon');

        const elementCameraLatitude = this.buildTextfield('Latitude ', 'input-pref-camera-lat');
        this.panelCtrl.camera.latitude = new MDCTextField(elementCameraLatitude);
        this.panelCtrl.camera.latitude.value = Preference.get('mapler.camera.lat');

        contentsCamera.push(Eli.build('div', {
            className: 'flex-box-row--nowrap flex-align-items--baseline'
        }, [
            elementCameraLongitude, elementCameraLatitude
        ]));

        // Preference: Camera - Others
        const elementCameraZoom = this.buildTextfield('Zoom', 'input-pref-camera-zoom');
        this.panelCtrl.camera.zoom = new MDCTextField(elementCameraZoom);
        this.panelCtrl.camera.zoom.value = Preference.get('mapler.camera.zoom');

        const elementCameraBearing = this.buildTextfield('Bearing', 'input-pref-camera-bearing');
        this.panelCtrl.camera.bearing = new MDCTextField(elementCameraBearing);
        this.panelCtrl.camera.bearing.value = Preference.get('mapler.camera.bearing');

        const elementCameraTilt = this.buildTextfield('Tilt', 'input-pref-camera-tilt');
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

        // Preference: Display
        contents.push(this.buildHeadline('Display'));

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
        
    }

    private onSetCamera() {

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
     * @param label Text displayed in label
     * @param id Id for `<input>` and `<label>`
     * @returns The headline element
     */
    private buildTextfield(label: string, id: string): HTMLDivElement {
        return Eli.build('div', {
            className: 'mdc-text-field mdc-text-field--outlined margin-v--8 margin-h--4'
        }, [
            Eli.build('input', {
                type: 'text', inputmode: 'decimal', id: id,
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