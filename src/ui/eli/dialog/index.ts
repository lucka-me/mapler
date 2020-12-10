import { eli } from '@lucka-labs/eli';

import './style.scss';

const ClassName = {
    dialog: 'mdc-dialog',
    container: 'mdc-dialog__container',
    surface: 'mdc-dialog__surface',
    content: 'mdc-dialog__content',
    title: 'mdc-dialog__title',
    actions: 'mdc-dialog__actions',
    scrim: 'mdc-dialog__scrim',

    button: 'mdc-button mdc-dialog__button',
    buttonRipple: 'mdc-button__ripple',
    buttonLabel: 'mdc-button__label',
};

interface DialigAction {
    action: string,
    text: string,
}

interface EliDialogOptions {
    title?: string,
    contents: Array<HTMLElement>,
    actions?: Array<DialigAction>
}

export function eliDialog(name: string, options: EliDialogOptions): HTMLDivElement {
    const surface = [];
    if (options.title) {
        surface.push(eli('h2', {
            className: ClassName.title, innerHTML: options.title
        }));
    }
    surface.push(eli('div', { className: ClassName.content }, options.contents));
    if (options.actions) {
        surface.push(eli(
            'footer', { className: ClassName.actions },
            options.actions.map((action) => eli(
                'button',
                {
                    className: ClassName.button,
                    dataset: { mdcDialogAction: action.action, },
                }, 
                [
                    eli('div', { className: ClassName.buttonRipple }),
                    eli('span', {
                        className: ClassName.buttonLabel, innerHTML: action.text
                    }),
                ]
            ))
        ));
    }
    return eli('div', {
        className: `${ClassName.dialog} ${name}`,
        role: 'dialog',
        ariaModal: true,
    }, [
        eli('div', { className: ClassName.container }, [
            eli('div', { className: ClassName.surface }, surface),
        ]),
        eli('div', { className: ClassName.scrim }),
    ]);
}

export namespace eliDialog {
    /**
     * Build a hyperlink elementpm
     * @param text Text to display in the link, will use `title` if not provided
     * @param href URL
     * @param title Text to show when mouse hovers
     */
    export function link(
        text: string,
        href: string,
        title?: string
    ): HTMLAnchorElement {
        return eli('a', {
            href: href,
            title: title || text,
            target: '_blank',
            rel: 'noopener',
            innerHTML: text,
        });
    }
}