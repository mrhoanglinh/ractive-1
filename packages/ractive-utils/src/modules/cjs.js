import createOutro from '../utils/createOutro';
import deprecateToString from '../utils/deprecateToString';

export default function cjs ( definition ) {
	const outro = createOutro( definition );

	const requires = definition.imports.map( ( imported, i ) => {
		var path = imported.href.replace( /\.[a-zA-Z]+$/, '' );
		return `var __import${i}__ = require('${path}');`;
	});

	const code = `
var Ractive = require('ractive');
${requires.join( '\n' )}

var component = { exports: {} };
${definition.script}
${outro}

module.exports = Ractive.extend( component.exports );`.slice( 1 );

	// TODO sourcemap support

	return deprecateToString( code, null, 'cjs' );
}
