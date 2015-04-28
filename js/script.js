function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you wanna live at ' + address + '?');

    //streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //NYT     
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=cb7683eb13d6ba9c195c961d1d78c71e:19:7141829';
    $.getJSON(nytimesUrl, function (data) {
    	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
    	var nytArticles = data.response.docs;
		for (var i = 0; i < nytArticles.length; i++) {
			var nytArticle = nytArticles[i];
			$nytElem.append('<li class="article">' + '<a href="' + nytArticle.web_url + '">' + nytArticle.headline.main + '</a>' + '<p>' + nytArticle.snippet + '</p>' + '</li>');
		}
	});





    return false;
};

$('#form-container').submit(loadData);

// 1600 pennsylvania ave
// washington dc


//a
//p