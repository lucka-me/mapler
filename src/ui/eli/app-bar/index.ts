import { eli } from 'eli/eli';

import './style.scss';

const ClassName = {
    appBar: 'mdc-top-app-bar mdc-top-app-bar--fixed',
    row: 'mdc-top-app-bar__row',
    sectionStart: [
        'mdc-top-app-bar__section',
        'mdc-top-app-bar__section--align-start'
    ].join(' '),
    sectionEnd: [
        'mdc-top-app-bar__section',
        'mdc-top-app-bar__section--align-end'
    ].join(' '),
    title: 'mdc-top-app-bar__title',
    fixedAdjust: 'mdc-top-app-bar--fixed-adjust',
};

export function eliAppBar(title: string, actions: Array<HTMLElement>) {
    return eli('header', {
        className: ClassName.appBar,
    }, [
        eli('div', {
            className: ClassName.row,
        }, [
            eli('section', {
                className: ClassName.sectionStart,
            }, [
                eli('span', {
                    className: ClassName.title,
                    innerHTML: title,
                }),
            ]),
            eli('section', {
                className: ClassName.sectionEnd,
                role: 'toolbar'
            }, actions)
        ]),
    ]);
}

export namespace eliAppBar {
    export function fixedAdjust() {
        return eli('div', { className: ClassName.fixedAdjust });
    }
}