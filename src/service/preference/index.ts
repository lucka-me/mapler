import data from "../../data/preferences.json";

/**
 * Save and get preference from Local Storage
 */
export default class Preference {

    private defaults = new Map<string, any>();

    constructor() {
        for (const value of data) {
            this.defaults.set(value.key, value.def);
        }
    }

    /**
     * Save preference to Local Storage
     * @param key Key of the preference
     * @param value Value to save
     */
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Get preference value from Local Storage
     * @param key Key of the preference
     * @returns Value or default value if available, otherwise null
     */
    get(key: string): any {
        const value = localStorage.getItem(key);
        if (value !== null) return JSON.parse(value);
        if (this.defaults.has(key)) return this.defaults.get(key);
        return null;
    }
}