// On page load
jQuery( document ).ready( function() {
    var news_sources = [
        'espn',
        'ars-technica',
        'cnn',
        'recode'
    ];

    news_sources.forEach( function( news_outlet, index ) {
        $( '#news_source_choices' ).append( '<option value="' + news_outlet + '">' + news_outlet + '</option>' );
        var api_url = 'https://newsapi.org/v1/articles?source=' + news_outlet + '&apiKey=345ae09477f3476596dd1722015ff41a';
        $.ajax({
            type: 'GET',
            success: function(data){
                console.log('Success!');
                // Handle API data
                var articles = data.articles;
                articles.forEach( function( value, index ) {
                    $( '#' + news_outlet ).append( format_content( value ) );
                } );
            },
            error: function(error, err_str){
                console.log(error);
                console.log(err_str);
            },
            url: api_url
        });
    } );

    $( '#news_source_choices' ).on( 'change', function() {
        console.log( $( this ).val() );
        $( '#selected_sources' ).append( '<li>' + $( this ).val() + '</li>' );
    } );

} );

// Functions
function format_content( story )
{
    var html = '';
    html += '<div name="story_div"><a href="' + story.url + '" target="_blank">';
    html += '<h2>' + story.title + '</h2>';
    html += '<img class="story_image_format" src="' + story.urlToImage + '">';
    html += '<p>' + story.description + '</p>';
    html += '<footer>' + story.publishedAt + '<br>by: ' + story.author + '</footer>';

    html += '</a></div>';
    return html;
}
