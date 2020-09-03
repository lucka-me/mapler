import data from "../data/styles.json";
import Preference from "./Preference";

class Style {
    uri: string;
    title: string;
}

class StyleKit {

    styles = new Array<Style>();

    constructor() {
        this.styles = data;
    }

    /**
     * Get selected style from preference
     * @returns The style in preference, first style as default
     */
    getFromPreference(): Style {
        let index = Preference.get('preference.misc.selectedStyle');
        if (index < 0 || index > this.styles.length - 1) {
            index = 0;
            Preference.set('preference.misc.selectedStyle', index);
        }
        return this.styles[index];
    }
}

export default new StyleKit();