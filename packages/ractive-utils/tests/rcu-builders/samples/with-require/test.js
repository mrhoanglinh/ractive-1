const assert = require( 'assert' );

module.exports = function test ( Component ) {
	const ractive = new Component();

	assert.equal( ractive.toHTML(), '<p>foo: FOO</p>' );
}
