import UIKitPrototype, { Eli } from "./prototype";

import { MDCRipple } from '@material/ripple';

/**
 * Events for {@link ShotAction}
 */
interface ShotActionEvents {
    /**
     * Triggered when the action is clicked
     */
    click: () => void,
}

/**
 * Extended Floating Action Button to snapshot map
 */
export default class ShotAction extends UIKitPrototype {
    
    ctrl: MDCRipple = null;

    events: ShotActionEvents = {
        click: () => { },
    }

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        const element = Eli.build('button', {
            className: 'mdc-fab mdc-fab--extended',
            cssText: [
                'position: fixed',
                'bottom: 2rem',
                'left: 50%',
                'transform: translateX(-50%)'
            ].join(';'),
        }, [
            Eli.build('div', { className: 'mdc-fab__ripple' }),
            Eli.build('span', { className: 'mdc-fab__icon fa', innerHTML: '&#xf030' }),
            Eli.build('span', { className: 'mdc-fab__label' }, [ 'Snapshot' ] ),
        ]);
        this.parent.append(element);
        this.ctrl = new MDCRipple(element);
        this.ctrl.listen('click', () => this.events.click());
    }
}