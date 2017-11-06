var express = require( 'express' );
var app = express();

var exphbs = require( 'express-handlebars' );
app.engine( 'handlebars', exphbs( { defaultLayout: '../../../views/layouts/app-shell' } ) );
app.set( 'view engine', 'handlebars' );

const path = require( 'path' );
app.use( '/', express.static( '../public' ) );

app.get( '/', function( request, response ) {
    response.render( '../../views/home' );
} );

app.listen( 8080 );
console.log( 'Get a taste of tomorrow, today!' );
