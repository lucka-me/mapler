import Eli from "./eli";

export default class UIKitPrototype {
    parent: HTMLElement = null;

    constructor() {
        Object.defineProperty(this, 'parent', {
            enumerable: false,
        });
    }
    
    /**
     * Initiate the Component
     * @param parent Parent element
     */
    init(parent: HTMLElement) {
        this.parent = parent;
    }

    /**
     * Build element and render
     */
    render() { }
}

export { Eli };