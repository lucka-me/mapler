import Preference from './preference';
import StyleKit from './style-kit';

export namespace service {
    export const preference = new Preference();
    export const style      = new StyleKit();
}