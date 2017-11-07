// On page load
jQuery( document ).ready( function() {
    var sources_url = 'https://newsapi.org/v1/sources';
    var news_sources = [];

    // Get News Sources
    $.ajax({
        type: 'GET',
        success: function( data )
        {   
            data.sources.forEach( function( data_source, index ) {
                $( '#news_source_choices' ).append( '<option value="' + data_source.id + '">' + data_source.name + '</option>' );
            } );
        },
        error: function( error, err_str )
        {
            console.log( error );
            console.log( err_str );
        },
        url: sources_url
    });

    

    $( '#news_source_choices' ).on( 'change', function() {
        $( '#selected_sources' ).append( '<li>' + $( this ).val() + '</li>' );
        var my_news_sources = Array.from( document.getElementById( 'selected_sources' ).children );
        if( typeof my_news_sources != 'undefined' )
        {
            news_sources = [];
            my_news_sources.forEach( function( value, index ) {
                news_sources.push( value.innerHTML );
            } );
        }
        populateData( news_sources );
    } );

    $( '#clear_button' ).on( 'click', function() {
        $( '#all_story_container' ).html( '' );
        $( '#selected_sources' ).html( '' );
    } );

    $( '#all_story_container' ).on( 'click', 'i[name="collapse_me"]', function() {
        console.log( $( this ).parent().find( 'a[name="story_info"]' ) );
        $( this ).parent().find( 'a[name="story_info"]' ).toggle( 'collapse' );
        if( $( '#collapse_button' ).html() == 'hide' )
        {
            $( '#collapse_button' ).html( 'show' );
        }
        else
        {
            $( '#collapse_button' ).html( 'hide' );
        }
    } );

    $( '#show_button' ).on( 'click', function() {
        $( 'div[name="story_div"]' ).removeClass( 'collapse' );
    } );    
} );

// Functions
function format_content( story )
{
    var html = '';
    html += '<div><i name="collapse_me" class="fa fa-chevron-circle-right"></i><a name="story_info" href="' + story.url + '" target="_blank"><div name="story_div">';
    html += '<h2>' + story.title + '</h2>';
    html += '<img class="story_image_format" src="' + story.urlToImage + '">';
    html += '<p>' + story.description + '</p>';
    html += '<footer>' + story.publishedAt + '<br>by: ' + story.author + '</footer>';

    html += '</div></a></div>';
    return html;
}

function populateData( arr )
{
    // Get information from each News Source
    arr.forEach( function( news_outlet, index ) {
        $( '#news_source_choices' ).append( '<option value="' + news_outlet + '">' + news_outlet + '</option>' );
        var api_url = 'https://newsapi.org/v1/articles?source=' + news_outlet + '&apiKey=345ae09477f3476596dd1722015ff41a';
        $.ajax({
            type: 'GET',
            success: function( data ) {
                // Handle API data
                var articles = data.articles;
                articles.forEach( function( value, index ) {
                    $( '#all_story_container' ).append( format_content( value ) );
                } );
            },
            error: function(error, err_str){
                console.log(error);
                console.log(err_str);
            },
            url: api_url
        });
    } );
}
