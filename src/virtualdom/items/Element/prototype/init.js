import types from 'config/types';
import namespaces from 'config/namespaces';
import enforceCase from 'virtualdom/items/Element/shared/enforceCase';
import getElementNamespace from 'virtualdom/items/Element/prototype/init/getElementNamespace';
import createAttributes from 'virtualdom/items/Element/prototype/init/createAttributes';
import createTwowayBinding from 'virtualdom/items/Element/prototype/init/createTwowayBinding';
import createEventHandlers from 'virtualdom/items/Element/prototype/init/createEventHandlers';
import Decorator from 'virtualdom/items/Element/Decorator/_Decorator';
import Transition from 'virtualdom/items/Element/Transition/_Transition';
import bubbleSelect from 'virtualdom/items/Element/special/select/bubble';
import findParentSelect from 'virtualdom/items/Element/special/option/findParentSelect';

import circular from 'circular';

var Fragment;

circular.push( function () {
	Fragment = circular.Fragment;
});

export default function Element$init ( options ) {
	var parentFragment,
		template,
		namespace,
		// width,
		// height,
		// loadHandler,
		ractive,
		binding,
		bindings;

	this.type = types.ELEMENT;

	// stuff we'll need later
	parentFragment = this.parentFragment = options.parentFragment;
	template = this.template = options.template;

	this.parent = options.pElement || parentFragment.pElement;

	this.root = ractive = parentFragment.root;
	this.index = options.index;

	this.cssDetachQueue = [];


	this.namespace = getElementNamespace( template, this.parent );
	this.name = ( namespace !== namespaces.html ? enforceCase( template.e ) : template.e );


	// Special case - <option> elements
	if ( this.name === 'option' ) {
		this.select = findParentSelect( this.parent );
		this.select.options.push( this );

		// If the <select> was previously rendered, we may still
		// need to initialise it
		if ( this.select.binding ) {
			this.select.binding.dirty();
		}

		// If the value attribute is missing, use the element's content
		if ( !template.a ) {
			template.a = {};
		}

		// ...as long as it isn't disabled
		if ( !template.a.value && !template.a.hasOwnProperty( 'disabled' ) ) {
			template.a.value = template.f;
		}

		// If there is a `selected` attribute, but the <select>
		// already has a value, delete it
		if ( 'selected' in template.a && this.select.getAttribute( 'value' ) !== undefined ) {
			delete template.a.selected;
		}
	}

	// create attributes
	this.attributes = createAttributes( this, template.a );


	// Special case - <select> elements
	if ( this.name === 'select' ) {
		this.options = [];
		this.bubble = bubbleSelect; // TODO this is a kludge
	}


	// append children, if there are any
	if ( template.f ) {
		// Special case - contenteditable
		/*if ( this.node && this.node.getAttribute( 'contenteditable' ) ) {
			if ( this.node.innerHTML ) {
				// This is illegal. You can't have content inside a contenteditable
				// element that's already populated
				errorMessage = 'A pre-populated contenteditable element should not have children';
				if ( root.debug ) {
					throw new Error( errorMessage );
				} else {
					warn( errorMessage );
				}
			}
		}*/

		this.fragment = new Fragment({
			template: template.f,
			root:     ractive,
			owner:    this,
			pElement: this,
		});
	}


	// create twoway binding
	if ( ractive.twoway && ( binding = createTwowayBinding( this, template.a ) ) ) {
		this.binding = binding;

		// register this with the root, so that we can do ractive.updateModel()
		bindings = this.root._twowayBindings[ binding.keypath ] || ( this.root._twowayBindings[ binding.keypath ] = [] );
		bindings.push( binding );
	}


	// create event proxies
	if ( template.v ) {
		this.eventHandlers = createEventHandlers( this, template.v );
	}

	// create decorator
	if ( template.o ) {
		this.decorator = new Decorator( this, template.o );
	}

	// create transitions
	if ( template.t0 ) {
		this.intro = this.outro = new Transition( this, template.t0 );
	}

	if ( template.t1 ) {
		this.intro = new Transition ( this, template.t1 );
	}

	if ( template.t2 ) {
		this.outro = new Transition ( this, template.t2 );
	}


	// if we're actually rendering (i.e. not server-side stringifying), proceed
	/*if ( docFrag ) {
		// deal with two-way bindings
		if ( root.twoway ) {
			this.bind();

			// Special case - contenteditable
			if ( this.node.getAttribute( 'contenteditable' ) && this.node._ractive.binding ) {
				// We need to update the model
				this.node._ractive.binding.update();
			}
		}

		// name attributes are deferred, because they're a special case - if two-way
		// binding is involved they need to update later. But if it turns out they're
		// not two-way we can update them now
		if ( attributes.name && !attributes.name.twoway ) {
			attributes.name.update();
		}

		// if this is an <img>, and we're in a crap browser, we may need to prevent it
		// from overriding width and height when it loads the src
		if ( this.node.tagName === 'IMG' && ( ( width = this.attributes.width ) || ( height = this.attributes.height ) ) ) {
			this.node.addEventListener( 'load', loadHandler = function () {
				if ( width ) {
					this.node.width = width.value;
				}

				if ( height ) {
					this.node.height = height.value;
				}

				this.node.removeEventListener( 'load', loadHandler, false );
			}, false );
		}

		if ( this.node.tagName === 'OPTION' ) {
			// Special case... if this option's parent select was previously
			// empty, it's possible that it should initialise to the value of
			// this option.
			if ( pNode.tagName === 'SELECT' && ( selectBinding = pNode._ractive.binding ) ) { // it should be!
				selectBinding.deferUpdate();
			}

			// Special case... a select may have had its value set before a matching
			// option was rendered. This might be that option element
			if ( this.node._ractive.value == pNode._ractive.value ) {
				this.node.selected = true;
			}
		}

		if ( this.node.autofocus ) {
			// Special case. Some browsers (*cough* Firefix *cough*) have a problem
			// with dynamically-generated elements having autofocus, and they won't
			// allow you to programmatically focus the element until it's in the DOM
			runloop.focus( this.node );
		}

		updateLiveQueries( this );
	}*/
}
