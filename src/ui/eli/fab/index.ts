import { eli } from 'eli/eli';

import './styles.scss';

const ClassName = {
    fab: 'mdc-fab mdc-fab--extended',
    ripple: 'mdc-fab__ripple',
    icon: 'fa mdc-fab__icon',
    label: 'mdc-fab__label'
};

export function eliFab(name: string, icon: string, label: string): HTMLButtonElement {
    return eli('button', {
        className: `${ClassName.fab} ${name}`,
    }, [
        eli('div', { className: ClassName.ripple }),
        eli('span', { className: ClassName.icon, innerHTML: icon }),
        eli('span', { className: ClassName.label, innerHTML: label }),
    ]);
}