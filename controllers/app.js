var express = require( 'express' );
var app = express();

var exphbs = require( 'express-handlebars' );
var views_path = __dirname + '/../views';
app.set( 'views', views_path );
app.engine( 'handlebars', exphbs( { defaultLayout: views_path + '/layouts/app-shell',
                                    partialsDir: views_path + '/partials' } ) );

app.set( 'view engine', 'handlebars' );

const path = require( 'path' );
app.use( '/', express.static( '../public' ) );
app.get( '/', function( request, response ) {
    response.render( views_path + '/home' );
} );

app.listen( 8080 );
console.log( 'Get a taste of tomorrow, today!' );
