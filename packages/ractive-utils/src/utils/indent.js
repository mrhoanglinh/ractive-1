export default function indent ( str, indentation ) {
	return '\t' + str.replace( /\n/g, `\n${indentation || '\t'}` );
}
