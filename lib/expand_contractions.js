/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isCapitalized = require( '@stdlib/assert-is-capitalized' );
var uncapitalize = require( '@stdlib/string-uncapitalize' );
var capitalize = require( '@stdlib/string-capitalize' );
var tokenize = require( '@stdlib/nlp-tokenize' );
var isString = require( '@stdlib/assert-is-string' ).isPrimitive;
var format = require( '@stdlib/string-format' );
var CONTRACTIONS = require( './contractions.json' );


// VARIABLES //

var KEYS = Object.keys( CONTRACTIONS );


// MAIN //

/**
* Expands all contractions to their formal equivalents.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string
* @returns {string} string with expanded contractions
*
* @example
* var str = 'I won\'t be able to get y\'all out of this one.';
* var out = expandContractions( str );
* // returns 'I will not be able to get you all out of this one.'
*
* @example
* var str = 'It oughtn\'t to be my fault, because, you know, I didn\'t know';
* var out = expandContractions( str );
* // returns 'It ought not to be my fault, because, you know, I did not know'
*/
function expandContractions( str ) {
	var tokens;
	var token;
	var out;
	var key;
	var i;
	var j;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	out = '';
	tokens = tokenize( str, true );
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isCapitalized( token ) ) {
			for ( j = 0; j < KEYS.length; j++ ) {
				key = KEYS[ j ];
				if ( uncapitalize( token ) === key ) {
					token = capitalize( CONTRACTIONS[ key ] );
					break;
				}
			}
		} else {
			for ( j = 0; j < KEYS.length; j++ ) {
				key = KEYS[ j ];
				if ( token === key ) {
					token = CONTRACTIONS[ key ];
					break;
				}
			}
		}
		out += token;
	}
	return out;
}


// EXPORTS //

module.exports = expandContractions;
