import { MDCMenu } from "@material/menu";
import { MDCRipple } from "@material/ripple";
import { MDCTopAppBar } from "@material/top-app-bar";

import UIKitPrototype, { Eli } from './prototype';
import StyleKit from "../service/StyleKit";

/**
 * Events for {@link StyleMenu}
 */
interface StyleMenuEvents {
    selectStyle: (index: number, title: string) => void,
}

/**
 * The style menu component
 */
class StyleMenu extends UIKitPrototype {

    ctrl: MDCMenu = null;

    events: StyleMenuEvents = {
        selectStyle: () => { },
    };

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        const menuList = Eli.build('ul', {
            className: 'mdc-list',
            role: 'menu',
            ariaOrientation: 'vertical',
        });

        // Build from style data
        for (const index in StyleKit.styles) {
            const element = Eli.build('li', {
                className: 'mdc-list-item',
                role: 'menuitem',
                dataset: { code : parseInt(index) },
            }, [
                Eli.build('span', {
                    className: 'mdc-list-item__text',
                    innerHTML: StyleKit.styles[index].title,
                }),
            ]);
            menuList.append(element);
        }

        const menuSurface = Eli.build('div', {
            className: 'mdc-menu mdc-menu-surface',
        }, [ menuList ]);
        const menuAnchor = Eli.build('div', {
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

/**
 * Events for {@link AppBar}
 */
interface AppBarEvent {
    /**
     * Triggered when click the preference button
     */
    openPreference: () => void,
    /**
     * Triggered when style selected
     * @param index The index of selected style
     */
    selectStyle: (index: number) => void,
}

/**
 * The app bar component
 */
export default class AppBar extends UIKitPrototype {

    menu = new StyleMenu();

    events: AppBarEvent = {
        openPreference: () => { },
        selectStyle:    () => { },
    };

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        const sectionActions = Eli.build('section', {
            className: [
                'mdc-top-app-bar__section',
                'mdc-top-app-bar__section--align-end'
            ].join(' '),
        });

        // Action: Preference
        const elementPreference = Eli.build('button', {
            className: 'mdc-icon-button fa',
            title: 'Preference',
            innerHTML: '&#xf013',
        });
        sectionActions.append(elementPreference);
        const ripplePreference = new MDCRipple(elementPreference);
        ripplePreference.unbounded = true;
        ripplePreference.listen('click', () => this.events.openPreference());

        // Button: Style
        const elementMenuLabel = Eli.build('span', {
            className: 'mdc-button__label',
            innerHTML: StyleKit.selectedStyle.title
        });
        const elementMenu = Eli.build('button', {
            className: 'mdc-button mdc-button--unelevated',
        }, [ elementMenuLabel ]);
        sectionActions.append(elementMenu);
        const rippleMenu = new MDCRipple(elementMenu);

        // StyleMenu
        this.menu.init(sectionActions);
        this.menu.events.selectStyle = (index, title) => {
            elementMenuLabel.innerHTML = title;
            this.events.selectStyle(index);
        };
        rippleMenu.listen('click', () => this.menu.open() );

        // App bar
        const elementAppBar = Eli.build('header', {
            className: 'mdc-top-app-bar',
        }, [
            Eli.build('div', {
                className: 'mdc-top-app-bar__row',
            }, [
                Eli.build('section', {
                    className: [
                        'mdc-top-app-bar__section',
                        'mdc-top-app-bar__section--align-start'
                    ].join(' '),
                }, [
                    Eli.build('span', {
                        className: 'mdc-top-app-bar__title',
                        innerHTML: 'Mapler',
                    }),
                ]),
                sectionActions,
            ]),
        ]);

        this.parent.append(elementAppBar);
        this.parent.append(Eli.build('div', {
            className: 'mdc-top-app-bar--fixed-adjust'
        }));
        new MDCTopAppBar(elementAppBar);
    }
}