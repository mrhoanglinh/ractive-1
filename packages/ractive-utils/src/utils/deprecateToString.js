let alreadyWarned = false;

export default function deprecateToString ( code, map, type ) {
	return {
		code, map,
		toString () {
			if ( !alreadyWarned ) {
				console.error( `[DEPRECATION] As of 0.4.0, rcu-builders.${type} returns a { code, map } object, rather than returning code directly` ); // eslint-disable-line no-console
				alreadyWarned = true;
			}

			return code;
		}
	};
}
