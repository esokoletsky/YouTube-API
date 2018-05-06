function buildApiRequest(searchTerm) {
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			maxResults: '10',
			part: 'snippet',
			q: searchTerm,
			key: 'AIzaSyAU-wxs2Q-MkNO_9yRnW0HX8ToYChGvUiM',
			type: 'video',
		},
		dataType: 'json',
		type: 'GET',
		success: displayResults
	});
}

function renderResults(result) {
	let uTubeBaseUrl = 'http://www.youtube.com/watch?v=' + result.id.videoId;
	return `<div>
	<p>
      <a target='_blank' href='${uTubeBaseUrl}'>
        <img src='${result.snippet.thumbnails.medium.url}'>
        </a> 
    </div>`;
}

function displayResults(data) {
	const results = data.items.map((item) => renderResults(item));
	$('.resultsContainer').html(results);
}

function watchSubmit() {
	$('#submit').submit(function(event) {
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find('#searchInput');
		let search = searchTarget.val();
		searchTarget.val("");
		buildApiRequest(search);
	});
}

$(watchSubmit);