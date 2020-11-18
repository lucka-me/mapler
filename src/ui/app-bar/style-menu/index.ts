import { MDCMenu } from "@material/menu";

import { base } from "ui/base";
import { eli } from 'ui/eli';
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

    ctrl: MDCMenu = null;

    events: StyleMenuEvents = {
        selectStyle: () => { },
    };

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        const menuList = eli.build('ul', {
            className: 'mdc-list',
            role: 'menu',
            ariaOrientation: 'vertical',
        });

        // Build from style data
        for (const index in service.style.styles) {
            const element = eli.build('li', {
                className: 'mdc-list-item',
                role: 'menuitem',
                dataset: { code : parseInt(index) },
            }, [
                eli.build('span', {
                    className: 'mdc-list-item__text',
                    innerHTML: service.style.styles[index].title,
                }),
            ]);
            menuList.append(element);
        }

        const menuSurface = eli.build('div', {
            className: 'mdc-menu mdc-menu-surface',
        }, [ menuList ]);
        const menuAnchor = eli.build('div', {
            className: 'mdc-menu-surface--anchor',
        }, [ menuSurface ]);
        this.parent.append(menuAnchor);

        this.ctrl = new MDCMenu(menuSurface);
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
        if (!this.ctrl.open) { this.ctrl.open = true; }
    }
}