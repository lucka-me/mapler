export namespace base {
    export interface Camera {
        lon: number,
        lat: number,
        zoom: number,
        bearing: number,
        tilt: number
    }

    export interface Size {
        width: number,
        height: number,
        pixelRatio: number,
    }

    export class Prototype {
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
}