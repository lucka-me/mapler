import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';

import { base } from 'ui/base';
import { eliAppBar } from 'eli/app-bar';
import { eliButton } from 'eli/button';
import { eliIcon } from 'eli/icon';
import { eliIconButton } from 'eli/icon-button';
import { service } from 'service';

import './styles.scss';

import StyleMenu from './style-menu';

/**
 * Events for {@link AppBar}
 */
interface AppBarEvent {
    /**
     * Triggered when click the preference button
     */
    openPanel: () => void,
    /**
     * Triggered when style selected
     * @param index The index of selected style
     */
    selectStyle: (index: number) => void,
}

/**
 * The app bar component
 */
export default class AppBar extends base.Prototype {

    private menu = new StyleMenu();
    
    private actionPanel: MDCRipple = null;
    private actionMenu: MDCRipple = null;

    events: AppBarEvent = {
        openPanel: () => { },
        selectStyle:    () => { },
    };

    init(parent: HTMLElement) {
        super.init(parent);
        this.render();
    }

    render() {
        // Action: Preference
        const elementPreference = eliIconButton(eliIcon.Icon.cog, 'Preference');

        // Button: Style
        const elementMenu = eliButton(service.style.selectedStyle.title);

        // App bar
        const elementAppBar = eliAppBar('Mapler', [ elementPreference, elementMenu ]);
        this.parent.append(elementAppBar);

        // StyleMenu
        this.menu.init(elementAppBar.querySelector('.mdc-top-app-bar__section--align-end'));
        this.menu.events.selectStyle = (index, title) => {
            elementMenu.querySelector('span').innerHTML = title;
            this.events.selectStyle(index);
        };

        this.actionPanel = new MDCRipple(elementPreference);
        this.actionPanel.unbounded = true;
        this.actionPanel.listen('click', () => this.events.openPanel());

        this.actionMenu = new MDCRipple(elementMenu);
        this.actionMenu.listen('click', () => this.menu.open());

        this.parent.append(eliAppBar.fixedAdjust());
        new MDCTopAppBar(elementAppBar);
    }

    /**
     * Enable the actions in app bar
     */
    enable() {
        this.actionPanel.disabled = false;
        this.actionMenu.disabled = false;
    }

    /**
     * Disable the actions in app bar
     */
    disable() {
        this.actionPanel.disabled = true;
        this.actionMenu.disabled = true;
    }
}