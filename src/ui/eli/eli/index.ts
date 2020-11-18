interface EliOptions {
    className?: string,
    cssText?: string,
    innerHTML?: string,
    title?: string,
    dataset?: any,
    hidden?: boolean,
    src?: string,
    [propName: string]: any;
}

export function eli<K extends keyof HTMLElementTagNameMap>(
    tag: K, options: EliOptions, children?: Array<HTMLElement | SVGElement | string>
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(options)) {
        switch (key) {
            case 'cssText':
                element.style.cssText = value;
                break;
            case 'dataset':
                for (const [dataKey, dataValue] of Object.entries(value)) {
                    element.dataset[dataKey] = dataValue as any;
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

export namespace eli {
    export function copy(text: string) {
        const textarea = eli('textarea', {
            value: text,
            readOnly: true
        });
        document.body.append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    }
}