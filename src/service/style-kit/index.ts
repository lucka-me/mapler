import data from 'data/styles.json';
import { service } from 'service';

class Style {
    uri: string;
    title: string;
}

export default class StyleKit {

    styles = new Array<Style>();

    constructor() {
        this.styles = data;
    }

    /**
     * Get selected style from preference
     * @returns The style in preference, first style as default
     */
    get selectedStyle(): Style {
        let index = service.preference.get('mapler.misc.selectedStyle');
        if (index < 0 || index > this.styles.length - 1) {
            index = 0;
            service.preference.set('mapler.misc.selectedStyle', index);
        }
        return this.styles[index];
    }

    /**
     * Select new style and save to preference
     * @param index Index of selected style
     */
    select(index: number): Style {
        if (index < 0 || index > this.styles.length - 1) {
            index = 0;
        }
        service.preference.set('mapler.misc.selectedStyle', index);
        return this.styles[index];
    }
}