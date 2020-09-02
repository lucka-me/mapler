/**
 * A toolkit to build HTML elements
 */
export default class Eli {
    /**
     * Build a HTML element
     * @param tag Element tag
     * @param options Options, like cssText, dataset
     * @param children List of children or text string
     * @returns The element
     */
    static build<K extends keyof HTMLElementTagNameMap>(
        tag: K, options: any, children?: Array<HTMLElement | string>
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(tag);
        for (const [key, value] of Object.entries(options)) {
            switch (key) {
                case 'cssText':
                    element.style.cssText = value as string;
                    break;
                case 'dataset':
                    for (const [dataKey, dataValue] of Object.entries(value)) {
                        element.dataset[dataKey] = dataValue;
                    }
                    break;
                default:
                    (element as any)[key] = value;
                    break;
            }
        }
        if (children) element.append(...children);
        return element;
    }
};