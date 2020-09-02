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
            classText: 'mdc-fab mdc-fab--extended'
        }, [
            Eli.build('div', { classText: 'mdc-fab__ripple' }),
            Eli.build('span', { classText: 'mdc-fab__icon fa fa-fw' }, [ '&#xf030' ]),
            Eli.build('span', { classText: 'mdc-fab__label' }, [ 'Snapshot' ] ),
        ]);
        this.parent.append(element);
        this.ctrl = new MDCRipple(element);
    }
}