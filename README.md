<h1 align=center><img src="./Resource/Banner.png"></img></h1>

<p align=center>
  <a href="./CHANGELOG.md"><img alt="Version" src="https://img.shields.io/badge/version-0.4.3-brightgreen.svg"/></a>
  <a href="https://lucka.moe/Wallmapper"><img alt="Demo" src="https://img.shields.io/badge/demo-available-brightgreen.svg"/></a>
  <a href="https://lucka.moe"><img alt="Author" src="https://img.shields.io/badge/author-Lucka-2578B5.svg"/></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-A31F34.svg"/></a><br>
  <a href="https://www.apple.com/safari/"><img alt="Safari Support" src="https://img.shields.io/badge/safari-support-brightgreen.svg"/></a>
  <a href="https://www.google.com/chrome/"><img alt="Chrome Support" src="https://img.shields.io/badge/chrome-support-brightgreen.svg"/></a>
  <a href="https://www.mozilla.org/firefox/"><img alt="Firefox Support" src="https://img.shields.io/badge/firefox-support-brightgreen.svg"/></a>
  <a href="https://www.microsoft.com/windows/microsoft-edge"><img alt="Edge Support" src="https://img.shields.io/badge/edge-support-brightgreen.svg"/></a>
  <a href="http://microsoft.com/ie"><img alt="IE Broken" src="https://img.shields.io/badge/ie-broken-red.svg"/></a>
  <a href="https://www.opera.com/"><img alt="Opera Support" src="https://img.shields.io/badge/opera-support-brightgreen.svg"/></a>

</p>

<p align=center>
Generate wallpaper from map<br/>
Under development<br/>
</p>

## Description
A web application to create wallpaper from map, in some special map styles.

Finally I can change my wallpaper again, after two years.  
[Read more](https://lucka.moe/2018/07/23/wallmapper/ "Wallmapper | Lucka")<sup>Chinese</sup>

### Style List
- [Color](https://api.mapbox.com/styles/v1/lucka-me/cjk2n7ybobuuk2smu9zwlugy9.html?fresh=true&title=true&access_token=pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw) by [@lucka-me](https://github.com/lucka-me)  
  A new style that allows users to set their own colors for land, water, city and roads with Color Panel.
- [Dark](https://api.mapbox.com/styles/v1/lucka-me/cjjvmr0mn5csl2rmx5cbgmb0y.html?fresh=true&title=true&access_token=pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw) (Default) by [@lucka-me](https://github.com/lucka-me)  
  First style. Black ground, white roads, deep gray water, and nothing else. Suitable for AMOLED.
- [Hack](https://api.mapbox.com/styles/v1/lucka-me/cjjzm06vz0cwl2rnnzgdgkf7j.html?fresh=true&title=true&access_token=pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw) by [@lucka-me](https://github.com/lucka-me)  
  Map in terminal way: background in black, roads and annotation in light green.
- [Standard](https://api.mapbox.com/styles/v1/lucka-me/cjk2hmfmi3soj2rqfgr140hqp.html?fresh=true&title=true&access_token=pk.eyJ1IjoibHVja2EtbWUiLCJhIjoiY2poa2xyN3J4MGJ0bTM3bjV5bjdvNDh3ZSJ9.QztckHrHyEuKp5_pVXmpIw) by [@samanpwbb](https://github.com/samanpwbb)  
  A style from [Mapbox designers](https://www.mapbox.com/designer-maps/), inspired by early 20th century Standard Oil Company road maps.

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

## Known Issues
- In IE, Download is unavailable

## To-Do
- [x] Fix the boundary of output image to the displayed
- [x] Select map style
- [ ] More map styles
- [x] Set center and zoom level
- [x] Fix download issue in Chrome
- [x] Fix `toBlob` unsupported issue in Edge and IE

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).

## License
The source code are [licensed under MIT](./LICENSE).

Please notice that the Mapbox Token included in the source code is owned by [Lucka](https://github.com/lucka-me) and **ONLY** for public useage in [the demo pages](http://lucka.moe/Wallmapper/).
