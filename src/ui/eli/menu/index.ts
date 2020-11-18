import { eli } from 'eli/eli';

import './style.scss';

const ClassName = {
    anchor: 'mdc-menu-surface--anchor',
    surface: 'mdc-menu mdc-menu-surface',
    list: 'mdc-list',
    item: 'mdc-list-item',
    itemText: 'mdc-list-item__text',
};

export function eliMenu(items: Array<HTMLLIElement>): HTMLDivElement {
    return eli('div', {
        className: ClassName.anchor
    }, [ 
        eli('div', {
            className: ClassName.surface,
        }, [
            eli('ul', {
                className: ClassName.list,
                role: 'menu',
                ariaHidden: true,
                ariaOrientation: 'vertical',
            }, items)
        ])
    ]);
}

export namespace eliMenu {
    export function item(code: string, text: string): HTMLLIElement {
        return eli('li', {
            className: ClassName.item,
            role: 'menuitem',
            dataset: { code: code },
        }, [
            eli('span', {
                className: ClassName.itemText,
                innerHTML: text,
            }),
        ]);
    }
}