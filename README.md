# ![](./assets/banner.svg)

[![Release](https://img.shields.io/github/v/release/lucka-me/mapler)](https://github.com/lucka-me/mapler/releases/latest "Last release") [![Author](https://img.shields.io/website?url=https%3A%2F%2Flucka.moe%2Fmapler)](https://lucka.moe/mapler "Website") [![License](https://img.shields.io/github/license/lucka-me/mapler)](./LICENSE "License")

Web app to make map as wallpaper, under development. Native Android app is [available](https://github.com/lucka-me/mapler-android).

Finally I can change my wallpaper again, after two years, [read more](https://lucka.moe/2018/07/23/wallmapper/ "Wallmapper | Lucka") (Chinese).

We are working on migrating to Webpack and TypeScript, the website and old code are available in `legacy` branch.

## Features
- Generate image from map in any size, with styles created with [Mapbox Studio](https://www.mapbox.com/mapbox-studio/).

## Dependencies
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/overview/)<sup>`0.3.0~`</sup>  
  Provides way to display the map
- [Material Components Web](https://github.com/material-components/material-components-web)<sup>`0.5.0~`</sup>  
  Provides Material Design UI.

<details><summary>Previous</summary>
<p>

- [Lucka's CSS](https://github.com/lucka-me/toolkit/tree/master/Web/CSS)<sup>`~0.4.x`</sup>    
  Provides basic stylesheet for the page
- [Leaflet](https://leafletjs.com/examples/quick-start/)<sup>`0.2.x`</sup>  
  Provides way to display the map
- [leaflet-image](https://github.com/mapbox/leaflet-image)<sup>`0.2.x`</sup>  
  Provides way to convert map to image

</p>
</details>

## To-Do
- [ ] Add new styles from URI

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).

## License
The source code are [licensed under MIT](./LICENSE).

The default styles included in the application all credit to their designers.

Please notice that the Mapbox Token included in the source code is owned by [Lucka](https://github.com/lucka-me) and **ONLY** for public useage in [the demo pages](http://lucka.moe/mapler/).
