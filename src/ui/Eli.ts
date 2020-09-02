class Eli {
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

export default Eli;