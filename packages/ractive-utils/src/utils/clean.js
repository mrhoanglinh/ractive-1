export default function clean ( str ) {
	return str.replace( /^\t\t/gm, '' ).replace( /(^\s*\n){2,}/gm, '\n\n' ).trim();
}
