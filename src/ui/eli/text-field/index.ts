import { eli } from '@lucka-labs/eli';

import './style.scss';

const ClassName = {
    textField: [
        'mdc-text-field',
        'mdc-text-field--outlined',
    ].join(' '),
    textfieldTextarea: [
        'mdc-text-field--textarea',
        'mdc-text-field--fullwidth'
    ].join(' '),
    textFieldWitchIcon: 'mdc-text-field--with-leading-icon',
    textFieldIcon: [
        'fa',
        'mdc-text-field__icon',
        'mdc-text-field__icon--leading'
    ].join(' '),
    input: 'mdc-text-field__input',
    outline: 'mdc-notched-outline',
    outlineLeading: 'mdc-notched-outline__leading',
    outlineNotch: 'mdc-notched-outline__notch',
    label: 'mdc-floating-label',
    outlineTrailing: 'mdc-notched-outline__trailing',

    helper: 'mdc-text-field-helper-line',
    helperText: 'mdc-text-field-helper-text mdc-text-field-helper-text--persistent',
};

interface EliTextFieldOptions {
    id: string,
    label: string,
    textarea?: boolean,
    icon?: string,
    inputType?: string,
    inputMode?: string,
    pattern?: string,
    required?: boolean,
}

export function eliTextField(options: EliTextFieldOptions): HTMLDivElement {
    let classNameRoot = ClassName.textField;
    const contents: Array<HTMLElement> = [
        eli('div', {
            className: ClassName.outline,
        }, [
            eli('div', { className: ClassName.outlineLeading }),
            eli('div', {
                className: ClassName.outlineNotch,
            }, [
                eli('span', {
                    className: ClassName.label,
                    id: options.id,
                    innerHTML: options.label,
                }),
            ]),
            eli('div', { className: ClassName.outlineTrailing }),
        ])
    ];
    if (options.textarea) {
        classNameRoot += ` ${ClassName.textfieldTextarea}`;
        contents.push(eli('textarea', {
            className: ClassName.input,
            id: options.id,
            rows: 8, cols: 80
        }));
    } else {
        if (options.icon) {
            classNameRoot += ` ${ClassName.textFieldWitchIcon}`;
            contents.push(eli('i', {
                className: ClassName.textFieldIcon,
                innerHTML: options.icon,
            }));
        }
        const elementInput = eli('input', {
            className: ClassName.input,
            ariaLabelledby: options.id,
        });
        if (options.inputType) elementInput.type = options.inputType;
        if (options.inputMode) elementInput.inputMode = options.inputMode;
        if (options.pattern) elementInput.pattern = options.pattern;
        if ('required' in options) elementInput.required = options.required;

        contents.push(elementInput);
    }
    
    return eli('div', { className: classNameRoot, }, contents);
}

export namespace eliTextField {
    export function helper(contents: Array<HTMLElement>) {
        return eli('div', {
            className: ClassName.helper,
        }, [
            eli('div', {
                className: ClassName.helperText,
            }, contents),
        ]);
    }
}