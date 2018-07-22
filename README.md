<h1 align=center>Wallmapper</h1>

<p align=center>
  <a href="./CHANGELOG.md"><img alt="Version" src="https://img.shields.io/badge/version-0.3.3-brightgreen.svg"/></a>
  <a href="https://lucka.moe/Wallmapper"><img alt="Demo" src="https://img.shields.io/badge/demo-available-brightgreen.svg"/></a>
  <a href="https://lucka.moe"><img alt="Author" src="https://img.shields.io/badge/author-Lucka-2578B5.svg"/></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-A31F34.svg"/></a><br>
  <img alt="Safari Support" src="https://img.shields.io/badge/safari-support-brightgreen.svg"/>
  <img alt="Chrome Support" src="https://img.shields.io/badge/chrome-support-brightgreen.svg"/>
  <img alt="Firefox Support" src="https://img.shields.io/badge/firefox-broken-red.svg"/>
  <img alt="Edge Support" src="https://img.shields.io/badge/chrome-support-brightgreen.svg"/>
  <img alt="IE Support" src="https://img.shields.io/badge/ie-broken-red.svg"/>

</p>

<p align=center>
Generate wallpaper from map<br/>
Under development<br/>
</p>

## Requirement
- [Lucka's CSS](https://github.com/lucka-me/toolkit/tree/master/Web/CSS)  
  Provides basic stylesheet for the page.
- [Mapbox](https://www.mapbox.com/)  
  Provides style of the map and also map data from [OpenStreetMap](https://www.openstreetmap.org/)
- [Leaflet](https://leafletjs.com/examples/quick-start/)<sup>`0.2.x`</sup>  
  Provides way to display the map
- [leaflet-image](https://github.com/mapbox/leaflet-image)<sup>`0.2.x`</sup>  
  Provides way to convert map to image
- [Mapbox GL JS](https://www.mapbox.com/help/how-web-apps-work/#mapbox-gl-js-1)<sup>`0.3+`</sup>  
  Provides way to display the map

## To-Do
- [x] Fix the boundary of output image to the displayed
- [x] More map styles
- [ ] Set center and zoom level
- [x] Fix download issue in Chrome
- [x] Fix `toBlob` unsupported issue in Edge and IE

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).

## License
The source code are [licensed under MIT](./LICENSE).

Please notice that the Mapbox Token included in the source code is owned by [Lucka](https://github.com/lucka-me) and **ONLY** for public useage in [the demo pages](http://lucka.moe/Wallmapper/).
