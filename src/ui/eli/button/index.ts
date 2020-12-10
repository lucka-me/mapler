import { eli } from '@lucka-labs/eli';

import './style.scss';

const ClassName = {
    button: 'mdc-button mdc-button--outlined',
    ripple: 'mdc-button__ripple',
    label: 'mdc-button__label'
}

export function eliButton(title: string) {
    return eli('button', {
        className: ClassName.button,
    }, [
        eli('div', { className: ClassName.ripple }),
        eli('span', {
            className: ClassName.label,
            innerHTML: title
        })
    ]);
}