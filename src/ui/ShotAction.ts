import UIKitPrototype, { Eli } from "./prototype";

import { MDCRipple } from '@material/ripple';

/**
 * Extended Floating Action Button to snapshot map
 */
export default class ShotAction extends UIKitPrototype {
    
    ctrl: MDCRipple = null;

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
        console.log(element);
        this.ctrl = new MDCRipple(element);
    }
}