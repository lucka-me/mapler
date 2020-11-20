import { eli } from 'eli/eli';

import './style.scss';

const ClassName = {
    switch: 'mdc-switch',
    track: 'mdc-switch__track',
    thumbUnderlay: 'mdc-switch__thumb-underlay',
    thumb: 'mdc-switch__thumb',
    control: 'mdc-switch__native-control'
};

export function eliSwitch(id: string): HTMLDivElement {
    return eli('div', { className: ClassName.switch }, [
        eli('div', { className: ClassName.track }),
        eli('div', {
            className: ClassName.thumbUnderlay,
        }, [
            eli('div', { className: ClassName.thumb }),
            eli('input', {
                type: 'checkbox',
                className: ClassName.control,
                id: id,
                role: 'switch',
            }),
        ]), 
    ]);
}