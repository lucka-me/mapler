import { MDCRipple } from '@material/ripple';

import { base } from 'ui/base';
import { eliFab } from 'eli/fab';
import { eliIcon } from 'eli/icon';

import './styles.scss';

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
export default class ShotAction extends base.Prototype {
    
    ctrl: MDCRipple = null;

    events: ShotActionEvents = {
        click: () => { },
    }

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        const element = eliFab('shot', eliIcon.Icon.camera, 'Snapshot');
        this.parent.append(element);
        this.ctrl = new MDCRipple(element);
        this.ctrl.listen('click', () => this.events.click());
    }

    show() {
        this.ctrl.root.classList.remove('mdc-fab--exited');
    }

    hide() {
        this.ctrl.root.classList.add('mdc-fab--exited');
    }
}