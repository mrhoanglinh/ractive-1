import createOutro from '../utils/createOutro';
import deprecateToString from '../utils/deprecateToString';

const getImportPath = imported => imported.href.replace( /\.[a-zA-Z]+$/, '' );
const quote = str => `"${str}"`;
const getDependencyName = ( x, i ) => `__import${i}__`;

export default function amd ( definition ) {
	const outro = createOutro( definition, '\t' );

	const dependencies = definition.imports.map( getImportPath ).concat( definition.modules );

	const paths = dependencies.map( quote ).concat( '"require"', '"ractive"' );
	const args = dependencies.map( getDependencyName ).concat( 'require', 'Ractive' );

	const code = `
define([ ${paths.join( ', ' )} ], function ( ${args.join( ', ' )} ) {

	var component = { exports: {} };

${definition.script}
${outro}

	return Ractive.extend( component.exports );

});`.slice( 1 );

	// TODO sourcemap support

	return deprecateToString( code, null, 'amd' );
}
