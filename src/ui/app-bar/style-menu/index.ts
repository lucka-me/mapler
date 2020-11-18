import { MDCMenu } from "@material/menu";

import { base } from "ui/base";
import { eliMenu } from "eli/menu";
import { service } from 'service';

/**
 * Events for {@link StyleMenu}
 */
interface StyleMenuEvents {
    selectStyle: (index: number, title: string) => void,
}

/**
 * The style menu component
 */
export default class StyleMenu extends base.Prototype {

    private ctrl: MDCMenu = null;

    events: StyleMenuEvents = {
        selectStyle: () => { },
    };

    render() {
        const element = eliMenu(service.style.styles.map((style, index) => {
            return eliMenu.item(`${index}`, style.title)
        }));

        this.ctrl = new MDCMenu(element.querySelector('.mdc-menu'));
        this.ctrl.listen(
            'MDCMenu:selected',
            (event: CustomEvent) => {
                const item = event.detail.item as HTMLLIElement;
                this.events.selectStyle(
                    parseInt(item.dataset.code),
                    item.querySelector('span').innerHTML
                );
            }
        );
    }

    open() {
        if (!this.ctrl) this.render();
        if (!this.ctrl.open) { this.ctrl.open = true; }
    }
}