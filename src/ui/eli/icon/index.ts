import { eli } from '@lucka-labs/eli';

import './style.scss';

export function eliIcon(icon: string): HTMLElement {
    return eli('i', {
        className: 'fa fa-fw',
        innerHTML: icon,
    });
}

export namespace eliIcon {
    export const Icon = {
        search: '\uf002',
        thList: '\uf00b',
        times:  '\uf00d',
        cog:    '\uf013',
        clock:  '\uf017',
        camera: '\uf030',
        edit:   '\uf044',
        infoCircle: '\uf05a',
        arrowUp:    '\uf062',
        plus:   '\uf067',
        calendarAlt:    '\uf073',
        folderOpen: '\uf07c',
        globe:  '\uf0ac',
        angleUp:    '\uf106',
        angleDown:  '\uf107',
        ellipsisV:  '\uf142',
        trash:  '\uf1f8',
        userCircle: '\uf2bd',
        syncAlt:    '\uf2f1',
        redoAlt:    '\uf2f9',
        mapMarkerAlt:   '\uf3c5',
        tachometerAlt:  '\uf3fd',
        brain:  '\uf5dc',
    };
}