const {crawlPage} = require("./crawl.js")

async function main(){

    // Check if there is only 1 input argument 
    if(process.argv.length === 2){
	console.error("BaseURL input argument is expected");
	process.exit(1);
    } else if(process.argv.length >= 4){
	console.error("Only one input argument BaseURL is expected");
	process.exit(1)
    }

    // Got BaseURL, start crawling it
    const baseURL = process.argv[2];
    console.log("Start crawling from", baseURL);
    
    let pages = {}
    await crawlPage(baseURL, baseURL, pages);
}

main();

