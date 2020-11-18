import { eli } from 'eli/eli';

import './style.scss';

const ClassName = {
    button: 'mdc-button mdc-button--unelevated',
    label: 'mdc-button__label'
}

export function eliButton(title: string) {
    return eli('button', {
        className: ClassName.button,
    }, [
        eli('span', {
            className: ClassName.label,
            innerHTML: title
        })
    ]);
}