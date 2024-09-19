/*  These functions return the result of API calls */






// uses New York Times Archivee API to return list of articles
// from a given year and month going back to 1851
export function getArticlesAtDate(year, month) {
	return fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/" + year.toString() +  "/" + month.toString() + ".json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
			.then(response => {
				if(response.ok) 
					return response.json();

				throw new Error("Failed to fetch API Call");
			})
			.catch(error => {
				console.log(error);
			})
}


// uses new York Times Archive API to return list of most 
// viewed articles from the last seven days
export function getMostViewedArticles7() {

	return fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
			.then(response => {
				if(response.ok) 
					return response.json();

				throw new Error("Failed to fetch API Call");
			})
			.catch(error => {
				console.log(error);
			})

}


// uses new York Times Archive API to return list of most 
// viewed articles from the last day
export function getMostViewedArticles1() {

	return fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
			.then(response => {
				if(response.ok) 
					return response.json();

				throw new Error("Failed to fetch API Call");
			})
			.catch(error => {
				console.log(error);
			})

}


// uses new York Times Archive API to return list of most 
// viewed articles from the last thirty days
export function getMostViewedArticles30() {

	return fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
			.then(response => {
				if(response.ok) 
					return response.json();

				throw new Error("Failed to fetch API Call");
			})
			.catch(error => {
				console.log(error);
			})

}


//uses new york times top stories API to return a list of
//top stories articles from a world genre
export function getTopStories(section) {
	
	return fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
		.then(response => {
			if(response.ok)
				return response.json();

			throw new Error("Failed to fetch API Call");
		})
		.catch(error => {
			console.log(error);
		})
}


// if filter is not wanted it should be null
// query and page is required, everything else is a filter
// query is a keyword which the API will search articles for
// page is which page you want the API to return since it only returns 10 articles at a time
// headline is a keyword in the headline
// source is which news source, like "The New York Times"
// section name is a news suction, like arts or books
export function filterQuery(query, page, headline, source, sectionName) {

	var fetchString = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&page=" + page;
	var firstFilter = true;		// bool specifying whether an added filter is the first filter in search

	let addFilter = (filter) => {

		if(firstFilter == false)
			fetchString += " AND ";

		fetchString += filter;
		firstFilter = false;
	}


		

	if(source != null || headline != null || sectionName != null)
		fetchString += "&fq="		


	// all filters
	if(headline != null)
		addFilter("headline:(\"" + headline + "\")");

	if(source != null)
		addFilter("source:(\"" + source + "\")");
	
	if(sectionName != null)
		addFilter("section_name:(\"" + sectionName + "\")");

	
	fetchString += "&api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8";
	console.log(fetchString);


	return fetch(fetchString)
		.then(response => {
			if(response.ok)
				return response.json();

			throw new Error("Failed to fetch API Call");
		})
		.catch(error => {
			console.log(error);
		})
}	
