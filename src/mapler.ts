import UIKit from "./ui/UIKit";

import './css/extended.css'

const ui = new UIKit();
ui.init();

/*
const process = {
    snapshot: () => {
        const mapDiv = document.createElement('div');
        // Modify size for HiDPI devices
        const pixelRadio = ui.dialog.preference.size.pixelRadio.value;
        const width  = ui.dialog.preference.size.width.value  / pixelRadio;
        const height = ui.dialog.preference.size.height.value / pixelRadio;
        mapDiv.style = `width:${width}px;height:${height}px;position:fixed;top:0;left:0;`;
        document.body.appendChild(mapDiv);
        const map = new mapboxgl.Map({
            container: mapDiv,
            style: ui.map.ctrl.getStyle(),
            bounds: ui.map.ctrl.getBounds(),
            preserveDrawingBuffer: true
        });
        map.once('idle', () => {
            // Save png from canvas
            //   Ref: https://stackoverflow.com/a/49521638
            map.getCanvas().toBlob((blob) => {
                const element = document.createElement('a');
                element.href = URL.createObjectURL(blob);
                element.download = 'Mapler.png';
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                map.remove();
                document.body.removeChild(mapDiv);
            });
        });
    },
};

// For Edge and IE which don't support toBlob()
//   Ref: https://stackoverflow.com/a/47487073
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function() {
                var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

                for (var i = 0; i < len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            });
        }
    });
}*/