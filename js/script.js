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
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=cb7683eb13d6ba9c195c961d1d78c71e:19:71418291';
    $.getJSON(nytimesUrl, function (data) {
    	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
    	var nytArticles = data.response.docs;
		for (var i = 0; i < nytArticles.length; i++) {
			var nytArticle = nytArticles[i];
			$nytElem.append('<li class="article">' + '<a href="' + nytArticle.web_url + '">' + nytArticle.headline.main + '</a>' + '<p>' + nytArticle.snippet + '</p>' + '</li>');
		}
	}).error(nytimesUrl, function (data) {
    	$nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
	});

	//wiki
	var wikiRequestTimeout = setTimeout(function() {
		$wikiElem.text("Failed to get wikipedia resources");
	}, 8000);

	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		//jsonp: "callback",
		success: function(response) {
			var wikiList = response[1];
			for (var i = 0; i < wikiList.length; i++) {
				var wikiArticle = wikiList[i];
				var url = 'http://en.wikipedia.org/wiki/' + wikiArticle;
				$wikiElem.append('<li><a href="' + url + '">' + wikiArticle + '</a></li>');
			}
			clearTimeout(wikiRequestTimeout);
		}
	});

    return false;
};

$('#form-container').submit(loadData);

console.log('1600 pennsylvania ave');
console.log('washington dc');