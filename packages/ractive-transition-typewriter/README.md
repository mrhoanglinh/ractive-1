Ractive.js typewriter transition plugin
=======================================

*Find more Ractive.js plugins at [ractivejs.org/plugins](http://ractivejs.org/plugins)*

This transition 'writes' characters onto the page one at a time, hiding and showing child elements as necessary.

[See the demo here.](http://ractivejs.github.io/ractive-transitions-typewriter/)

Usage
-----

Include this file on your page below Ractive, e.g:

```html
<script src='lib/ractive.js'></script>
<script src='lib/ractive-transitions-typewriter.js'></script>
```

Or, if you're using a module loader, require this module:

```js
// requiring the plugin will 'activate' it - no need to use the return value
require( 'ractive-transitions-typewriter' );
```

To control the speed at which the typewriting happens, you have three options - you can adjust the `interval`, `speed` or `duration`. The `interval` is the gap between characters in milliseconds, `speed` is the number of characters per second, and `duration` is the number of milliseconds for the entire job. (These should be treated as targets - in all likelihood, the browser will be slightly out.)



License
-------

Copyright (c) 2013 Rich Harris. Licensed MIT

Created with the [Ractive.js plugin template](https://github.com/ractivejs/plugin-template) for Grunt.
