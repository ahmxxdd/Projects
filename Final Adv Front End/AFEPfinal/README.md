# What is This Project?

This project is a Website that takes New York Times articles and alaysis 
their sentiment (Are they positive, negative, or Nuetral).


# How to use Web API's

Public API's (API's which can be used by anyone) can either require an authentication token or not. 
API's that do not require tokens are easier to access. If an API requires a token, read the 
documentation for how to get one, it often requires making an account. 

The API's used in this project are three API's provided by New York Times which are the Archive 
API, Article Search API, and Most Popular API, along with an API provided by google named the Cloud
Natural Language API.

Each API provides a set of functions which can be accessed through a url. Each API function has its 
own url. Look at the API's documentation to find the url of each function. use the fetch() javascript 
function with the url to use the given API function. For Example:
```
fetch("https://api.nytimes.com/svc/archive/v1/2018/3.json?api-key=kdjfdjJVZnDIRj1OS7eFWxBI8LAMvri8")
```

This API call is using the Archive API by the New York Times. The first part of the url is the base. 
Every time you want to call this function you will use this base url: https://api.nytimes.com/svc/archive/v1 

The next part of the url is the function parameters. The function in this example gets a list of all
articles within a given year and month and therefor has two parameters (year, month). The example 
uses the month March of 2018 as shown by this part of the url: 2018/3.json?. If this were a 
javascript function with the name archive, the equivalent would be archive(2018, 3).

The last part of this url is the authentication token represented by the part: 
api-key=kdjfdjJVZnDIRj1OS7eFWxBI8LAMvri8. If this API did not require an authentication token this
part of the url would be removed.

Looking at this example the structure of this API is:
	{function base url}/{function parameters}/api-key={authentication token}


The structure of other API's may be different so reading the API's documentation is required.


## Bypassing Secuirity Like a Fucking g

Now usually when creating a website, you usually first create a server and write your own code for it.
Any API call would go through this server and then to the browser of the user. API calls are not 
allowed to be directly called from the user's browser for secuirity reasons. Since we are not writing 
our own server and are only doing front-end development we can't make these calls in our javascript 
and are therefor going to use another website to bypass this. 

https://cors-anywhere.herokuapp.com allows us to make these API calls in our code through their 
website.

STEP 1:
	go to this link: https://cors-anywhere.herokuapp.com/corsdemo and click "Request temporary access 
	to the demo server". After this you can run your code. After some time you will have to do this 
	step again as this is temporary.

STEP 2:
	whenever you use fetch() in your code include the url https://cors-anywhere.herokuapp.com/ before 
	the rest of the url of the API function. For Example:
```
fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/2018/3.json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
```

Structure: fetch(https://cors-anywhere.herokuapp.com/{API Function url})


No other change in your code is neccessary.


## What Does fetch() Return

Check your website and console to make sure the fetch was succesful. The fetch will return an 
object with useful variables and functions. Lets call the return value of fetch() "return".

return.ok is a bool specifying if the fetch was successful.
response.json() will give you the data that the API function returned.


## API Call Example

```javascript
fetch("https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/2018/3.json?api-key=owlzZQJVZnDIRj1OS7eFWxBI8LAMvri8")
	.then(response => {
		if(response.ok) 
			return response.json();

		throw new Error("Failed to fetch API Call");
	})
	.then(json => {
		... do whatever stuff with json like console.log(json) to see result
	})
	.catch(error => {
		console.log(error);
	})
```

The only neccessary thing needed to get the data from the API function is the result of fetch().
So you could just write:
```
const response = fetch(...url...)
```

But this lacks any error checking which could mess up your website if an error occurs. For example, 
if you entered the wrong url into fetch().

The first .then checks respond.ok to see if fetch() succeeded. If it did return the json, else throw 
an error. The throw new Error assures that if an error occurs it won't stop or mess up the website 
and will print error to console. "response" is the return value of fetch() and you can name this 
variable whatever you want.

If fetch() was succesful it proceeds to the next ".then". this ".then" is run if there are no errors
in which case you can do whatever you want with the json data :) "json" is the return value of the 
previous ".then" and you can name this variable whatever you want.

The .catch is in case any error which did not trigger response.ok (which could happen) slipped by.
