import { generateSourceMap } from 'rcu';
import createOutro from '../utils/createOutro';
import deprecateToString from '../utils/deprecateToString';

export default function es6 ( definition, options = {} ) {
	let outro = createOutro( definition );

	let imports = [ `import Ractive from 'ractive';` ];
	let counter = 0;

	definition.imports.forEach( imported => {
		let path = imported.href;

		if ( !options.preserveExtensions ) {
			path = path.replace( /\.[a-zA-Z]+$/, '' );
		}

		imports.push( `import __import${counter}__ from '${path}';` );
		counter += 1;
	});

	let dependencyBlock = '';

	if ( definition.modules.length ) {
		let dependencies = [];

		definition.modules.forEach( path => {
			imports.push( `import __import${counter}__ from '${path}';` );
			dependencies.push( `\t'${path}': __import${counter}__` );
			counter += 1;
		});
	}

	const importBlock = imports.join( '\n' );

	const beforeScript = [
		importBlock,
		dependencyBlock,
		'var component = { exports: {} };'
	].join( '\n' );

	const code = [
		beforeScript,
		definition.script,
		outro,
		'export default Ractive.extend( component.exports );'
	].join( '\n' );

	const map = options.sourceMap ?
		generateSourceMap( definition, {
			offset: beforeScript.split( '\n' ).length,
			hires: options.hires !== false,
			file: options.sourceMapFile,
			source: options.sourceMapSource,
			content: definition.source
		}) :
		null;

	return deprecateToString( code, map, 'es6' );
}
