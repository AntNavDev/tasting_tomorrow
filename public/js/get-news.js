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
        if( $( '#selected_sources' ).find( 'li[name="' + $( this ).val() + '"]' ).length == 0 )
        {
            $( '#selected_sources' ).append( '<li name="' + $( this ).val() + '">' + $( this ).val() + '</li>' );
            $( '#viewed_selected_sources' ).append( '<li><button name="' + $( this ).val() + '" class="remove_source">&times;</button> ' + $( '#news_source_choices option:selected' ).html() + '</li>' );
            news_sources = [];
            getNewsSources( news_sources );
            renderNewsSources( news_sources );
        }
        $( this ).val( 'default' );
    } );

    $( '#clear_button' ).on( 'click', function() {
        $( '#all_story_container' ).html( '' );
        $( '#selected_sources' ).html( '' );
        $( '#viewed_selected_sources' ).html( '' );
    } );

    $( '#all_story_container' ).on( 'click', 'i[name="collapse_me"]', function() {
        $( this ).parent().find( 'a[name="story_info"]' ).toggle( 'collapse' );
        $( this ).parent().find( 'span[name="hidden_story_title"]' ).toggle( 'display' );
    } );

    $( '#viewed_selected_sources' ).on( 'click', '.remove_source', function() {
        $( this ).parent().remove();
        $( 'li[name="' + $( this ).attr( 'name' ) + '"]' ).remove();
        news_sources = [];
        getNewsSources( news_sources );
        renderNewsSources( news_sources );
    } );

    $( '#test' ).on( 'click', function() {
        console.log( 'news_sources', news_sources );
    } );
} );

// Functions
function formatContent( story )
{
    var html = '';
    html += '<div name="story_container"><i name="collapse_me" class="fa fa-chevron-circle-right"><span name="hidden_story_title" style="display: none">' + story.title + '</span></i><a name="story_info" href="' + story.url + '" target="_blank"><div name="story_div">';
    html += '<h2>' + story.title + '</h2>';
    html += '<img class="story_image_format" src="' + story.urlToImage + '">';
    html += '<p>' + story.description + '</p>';
    html += '<footer>' + story.publishedAt + '<br>by: ' + story.author + '</footer>';

    html += '</div></a></div>';
    return html;
}

function getNewsSources( arr )
{
    var my_news_sources = Array.from( document.getElementById( 'selected_sources' ).children );
    if( typeof my_news_sources != 'undefined' )
    {
        my_news_sources.forEach( function( value, index ) {
            arr.push( value.innerHTML );
        } );
    }
}

function renderNewsSources( arr )
{
    $( '#all_story_container' ).html( '' );
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
                    $( '#all_story_container' ).append( formatContent( value ) );
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
