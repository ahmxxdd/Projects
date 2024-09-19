import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {filterQuery, getArticlesAtDate, getMostViewedArticles7, getMostViewedArticles1, getMostViewedArticles30, getTopStories} from './APICalls.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {FrontPage, ArticleList, ArchiveSearch, FilterSearch, MostViewed, TopStories} from './Articles.js';

function App() {


	/*useEffect(() => {

			filterQuery("Politics", 0, null, null, null)
			.then(json => {
				// prints full response
				console.log(json);
			})	
			.catch(error => {
				
				console.log(error);
			})		
	}, [])*/

  return (
    <div className="App">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
		<BrowserRouter>
			<div>
				<nav style={styles.header}>
					<Link to="/archive">Archive</Link> | {" "}
					<Link to="/filters">Filters</Link> | {" "}
					<Link to="/mostViewed">Most Viewed</Link> | {" "}
					<Link to="/topStories">Top Stories</Link>
				</nav>
				<Routes>
					<Route index element={<FrontPage/>}/>
					<Route path="/archive" element={<ArticleList ArticlesBoxComponent={ArchiveSearch} />}/>
            		<Route path="/filters" element={<ArticleList ArticlesBoxComponent={FilterSearch} />} />
            		<Route path="/mostViewed" element={<ArticleList ArticlesBoxComponent={MostViewed}/>} />
            		<Route path="/topStories" element={<ArticleList ArticlesBoxComponent={TopStories} />} />	
				</Routes>
			</div>
		</BrowserRouter>
    </div>
  );
}
export default App;

const styles = {

	header: {
		display: "flex",	
		alignItems: "center",
		justifyContent: "center",
		gap: "10pt",

		padding: "15pt",
		marginBottom: "10pt",
		borderBottom: "1pt solid black",
			
		fontFamily: "Lucida Console",
	}
};

