/** 
 * 
 * Author: Jamar Flowers
 * Date: 6-2-23
 * Des: Node web scrapper using axios,cheerio
 * 
 * Goal: This project is being used as compentacy building for data
 *       aquisition from differet sources
 * 
**/ 
// axio for the http request 
const axios = require("axios");
// cheerio is used for parsing HTML and XML
const cheerio = require("cheerio");
const pretty = require("pretty");

const url = "https://news.ycombinator.com";
//first attempt with yahoo finace note: think i need py
// The path we need to get to the data ( [div:Lead-4-YFinListTable-Proxy] > [section:yfin-list ] > [div[2]])
// Cheerio Practice.
// const html = '<div id="Lead-4-YFinListTable-Proxy"><section id="yfin-list"><div id="one">one</div><div id="two">two</div></section></div>';
// const $ = cheerio.load(html);
// console.log(pretty($.html()));

async function scrapeData() {
    try {
        // use axios to get HTML 
        const { data } = await axios.get(url);
        // Load HTML with cheerio
        const $ = cheerio.load(data);
       
        const titles = $('td.title span');
        const titlelist = [];

        titles.each((idx, el) => { const title = { Title: "", Link: "" };
            title.Title = $(el).children('a').text();
            title.Link = $(el).children('span').text();
            titlelist.push(title);
        });
        // console.log(titles);
        // console.log(data);
        
        
       console.dir(titlelist);
        










        // const titles = $('td');
      
        // const Titlenames = [];      
        
        // titles.each((el) => {
        //     const title = {name:""};
        //     title.name = $(el).children("span").text();
        //     console.log(el);
        //     Titlenames.push(titles);

        // });
        // console.dir(Titlenames);
    } catch (err) {
        console.error(err)
    }
}

//call functon 
scrapeData();