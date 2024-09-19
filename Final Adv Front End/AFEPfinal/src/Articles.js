import {useState, useEffect} from 'react';
import {filterQuery, getTopStories, getArticlesAtDate, getMostViewedArticles1} from './APICalls.js';


function ArticleList({ArticlesBoxComponent}) {

	const [articles, setArticles] = useState([]); 
	const [sentiments, setSentiments] = useState("");


	return (
  		<ArticlesBoxComponent articles={articles} setArticles={setArticles}>
			<p> Articles </p>
		</ArticlesBoxComponent>
	);
}
export {ArticleList};


function ArchiveSearch(props) {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [error, setError] = useState(null);


	async function searchFunction(year, month) {

		try {
			const response = await getArticlesAtDate(year, month);
			props.setArticles(response.response.docs.slice(0, 100)); 
		} 
		catch (error) {
		  console.log(error.message);
		}
	}

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
	searchFunction(year, month);
  };

  return (
   	<div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>{props.children}</h1>
        <form  onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Year:
            <input type="number" value={year} onChange={handleYearChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Month:
            <input type="number" value={month} onChange={handleMonthChange} style={styles.input} />
          </label>
		  <button type="submit" style={styles.button}> Search </button>
        </form>
		<div style={styles.articlesSection}>
      		{props.articles.map(article => (
        		<ArticleCard key={article.id} article={article} />
      		))}
		</div>

    </div>
	</div> 
  );

}
export {ArchiveSearch};


function FilterSearch(props) {
	const [search, setSearch] = useState('');
    const [headline, setHeadline] = useState('');
    const [source, setSource] = useState('');
    const [section, setSection] = useState('');
	const [pageNumber, setPageNumber] = useState(0);
    const [error, setError] = useState(null);
  

	// all handles for changes
    const handleHeadlineChange = (e) => {
      setHeadline(e.target.value);
    };
	
	const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
		
	const handleSourceChange = (e) => {
      setSource(e.target.value);
    };

	const handleSectionChange = (e) => {
      setSection(e.target.value);
    };

	const handlePageChange = (e) => {
		setPageNumber(e.target.value);
	}

	
  
    async function searchFunction(query, page, headline, source, sectionName) {

		try {
			const response = await filterQuery(query, page, headline, source, sectionName);
			props.setArticles(response.response.docs); 
		} 
		catch (error) {
		  console.log(error.message);
		}
	}

  
    const handleSubmit = (e) => {
    	e.preventDefault();

		var _search = search;
		var _headline = headline;
		var _source = source;
		var _section = section;
		
		// getting all filters
		if(search == "")
			_search = null;
		if(headline == "")
			_headline = null;
		if(source == "")
			_source = null;
		if(section == "")
			_section = null;

		searchFunction(search, pageNumber, _headline, _source, _section);
    };
  

    return (
   	<div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Filter Search</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="search" value={search} onChange={handleSearchChange} style={{...styles.input, marginBottom:"10pt"}}/>
          <label style={styles.label}>
            Headline:
            <input type="search" value={headline} onChange={handleHeadlineChange} style={styles.input}/>
          </label>
          <label style={styles.label}>
            News Source: 
            <input type="search" value={source} onChange={handleSourceChange} style={styles.input}/>
          </label>
		  <label style={styles.label}>
            Section: 
            <input type="search" value={section} onChange={handleSectionChange} style={styles.input}/>
          </label>
	
		<label style={styles.label}>
		  Page: 
		  <input type="number" value={pageNumber} onChange={handlePageChange} style={{...styles.input, width:"35pt"}}/> 
		</label>
			
		  <button type="submit" style={styles.button}> Search </button>
        </form>
        <div>
          {props.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
		</div>
        </div>
      </div>
    );
}
export {FilterSearch};


function MostViewed() {
  
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getMostViewedArticles1()
    .then(data => {
      if (data && data.results) {
        setArticles(data.results);
      } else {
        console.error("Error: Invalid data format");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })
  }, []);


  return (
    <div style={styles.container}>
 	  <div style={styles.box}>
      <h1>Most Viewed Articles Past Day</h1>
      <div>
        {articles.map(article => (
        <ArticleCard key={article.id} article={article}/>
        ))}
      </div>
	  </div>
    </div>
  )
}


export {MostViewed};


function TopStories(props) {
   const [section, setSection] = useState('');
   const [error, setError] = useState('');

  async function searchFunction(section) {

		try {
			const response = await getTopStories(section);

			props.setArticles(response.results); 
		} 
		catch (error) {
		  console.log(error.message);
		}
	}


	const handleSectionChange = (e) => {

		searchFunction(e.target.value);
	}
	

  return (
    <div style={styles.container}>
	  <div style={styles.box}>
      <h1>Top Stories</h1>
		<h3> Choose a Section </h3>
		<form style={{marginBottom:"10pt"}}>

          	<label style={{margin:"5pt"}}>
			Arts
			<input type="radio" name="section" value="arts" onChange={handleSectionChange}/>
			</label>
			|
			<label style={{margin:"5pt"}}>
			Home
			<input type="radio" name="section" value="home" onChange={handleSectionChange}/>
			</label>
			|
			<label style={{margin:"5pt"}}>
			US
			<input type="radio" name="section" value="us" onChange={handleSectionChange}/>
			</label>
			|
			<label style={{margin:"5pt"}}>
			World
			<input type="radio" name="section" value="world" onChange={handleSectionChange}/>
			</label>	

		</form>

      <div>
        {props.articles.map(article => (
          <ArticleCard key={article.id} article={article}/>
        ))}
      </div>
	  </div>
    </div>
  )
}

export {TopStories};


// first page when weebsite is opened
function FrontPage() {
	return (
		<div class="p-3 mb-2 bg-primary text-white">
      Welcome to Article Search
		</div>
	)	
}
export {FrontPage};


// this component displays the basic info of an article
function ArticleCard({ article }) {
  const { headline, web_url, word_count, sentiment } = article;

  return (
    <div style={styles.articleCard}>
      <div>
	  	
        <h2>{article.title || headline.main}</h2>
        <p>URL: <a href={article.url || headline.main}>{article.url || web_url}</a></p>
        <p>Word Count: {article.word_count || "N/A"}</p>
      </div>
    </div>
  );
}

export default ArticleCard;


// all styles used in this file
const styles = {
 	container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  box: {
    width: '600px',
    height: '100%',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'black',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  label: {
    marginBottom: '10px',
    color: 'black',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
	marginBottom: '15pt',
	borderBottom: "1pt solid black",

  }, 
  articleCard: {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
  }
};
