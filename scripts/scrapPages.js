const puppeteer = require("puppeteer");

const pageScrapper = async (site) => {
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();
    await page.goto(site.url);
    
    const jobData = await page.evaluate((site)=>{
        let results = [];
        let items = document.querySelectorAll(site.selector);
        for(let item of items){
            results.push({job_title: item.innerText, company:site.name});
        }
        return results;
    }, site /*site must be passed here as an argument of evaluate function, and as an argument in the callback of this function*/ )
    return jobData;
    await browser.close();
}

const scrapPages = async (sites) => {
    const scrappedPages = [];
    for(let site of sites){
        const returnedData = await pageScrapper(site);
        scrappedPages.push(...returnedData);
    }
    return scrappedPages;
};

module.exports = scrapPages;