import packageData from "../../package.json";
import { MDCDialog } from "@material/dialog";

import UIKitPrototype, { Eli } from "./prototype";

/**
 * Events for {@link PanelDialog}
 */
interface PanelDialogEvents {
    
}

/**
 * The preference dialog component
 */
export default class PanelDialog extends UIKitPrototype {

    ctrl: MDCDialog = null;

    events: PanelDialogEvents = {

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
}