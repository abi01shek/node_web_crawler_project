
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("node-fetch");

function normalizeURL(url){
    // Normalize the given URL:
    // Take a URL and strip away everything
    // except the host name and path
    // also removes any "/" in the end of the URL
    const urlObj = new URL(url);
    const host = urlObj.host;
    const path = urlObj.pathname;
    let newUrl = host+path; // path begins with /
    if(newUrl.length > 0 && newUrl.slice(-1) === '/'){
	newUrl = newUrl.slice(0,-1);
    }
    return(newUrl);
}


function getURLsFromHTML(htmlBody, baseURL){
    // Read HTML body and get all href URLs from it
    // If any href URL is relative, converit to absolute URL 
    let linksList = []
    const dom = new JSDOM(htmlBody);

    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements){
	if (aElement.href.slice(0,1) === '/'){
	    try {
		linksList.push(new URL(aElement.href, baseURL).href)
	    } catch (err){
		console.log(`${err.message}: ${aElement.href}`)
	    }
	} else {
	    try {
		linksList.push(new URL(aElement.href).href)
	    } catch (err){
		console.log(`${err.message}: ${aElement.href}`)
	    }
	}
    }
    return linksList;
}

async function crawlPage(baseURL, currentURL, pages){
    // Make sure the currentURL is on the same domain as the baseURL. If it's not, just return the current pages. We don't want to crawl the entire internet, just the domain in question.
    // Get a normalized version of the currentURL.
    // If the pages object already has an entry for the normalized version of the current URL, just increment the count and return the current pages.
    // Otherwise, add an entry to the pages object for the normalized version of the current URL, and set the count to 1.
    // If we've gotten here, we haven't yet made a request to the current URL, so let's do that, and maybe add a console.log so you can watch your crawler go in real-time.
    // Assuming all went well with the fetch request, get all the URLs from the response body HTML
    // Recursively crawl each URL you found on the page and update the pages to keep an aggregate count
    // Finally, return the updated pages object
    
    baseURLObj = new URL(baseURL);
    currentURLObj = new URL (currentURL);
    if(baseURL.host.toString() === currentURLObj.host.toString()){
	console.log(baseURLObj.host)
	console.log(currentURLObj.host)
	return pages;
    }

    currentURLNorm = normalizeURL(currentURL);
    console.log(currentURLNorm);
    return;


    try{
	const resp = await fetch(currentURL, {
	    method:'GET',
	    mode:'cors',
	    headers:{
		'Content-Type':'text/html'
	    }
	});
	
	if(resp.status >= 400){
	    console.error("Error encountered:", resp.status);
	    return
	}
	
	const contentType = resp.headers.get('content-type')
	if (!contentType.includes('text/html')){
	    console.error(`Got non-html response: ${contentType}`)
	    return
	}

	const respText = await resp.text();
	console.log(respText);
    } catch(err){
	console.error(err.message);
    }
}


// Export functions from this module
module.exports = {
  normalizeURL,
    getURLsFromHTML,
    crawlPage
}
