import CleanCSS from 'clean-css';
import toSource from 'tosource';

export default function createOutro ( definition, indent = '' ) {
	const css = definition.css ? new CleanCSS().minify( definition.css ).styles : '';
	const imports = definition.imports.map( getImportKeyValuePair );

	let outro = [
		`${indent}component.exports.template = ${toSource( definition.template, null, '' )};`
	];

	if ( css ) outro.push( `${indent}component.exports.css = ${toSource( css )};` );
	if ( imports.length ) outro.push( `${indent}component.exports.components = { ${imports.join( ', ')} };` );

	return outro.join( '\n' );
}

function getImportKeyValuePair ( imported, i ) {
	return `${stringify(imported.name)}: __import${i}__`;
}

function stringify ( key ) {
	if ( /^[a-zA-Z$_][a-zA-Z$_0-9]*$/.test( key ) ) {
		return key;
	}

	return JSON.stringify( key );
}
