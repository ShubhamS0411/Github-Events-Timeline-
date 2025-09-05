import { parseStringPromise } from "xml2js";
import fetch from "node-fetch";

export default async function getEvents() {
    const res = await fetch("https://github.com/timeline");
    const xmlResponse = await res.text();
    const jsonFormat = await parseStringPromise(xmlResponse);
  
    
    const events = jsonFormat.feed.entry.slice(0, 3).map((entry) => {
      return {
        title: entry.title[0]._ ,      
        updated: entry.updated[0]   
      };
    });
     
  
  
    let emailBody = "Events:\n";
    events.forEach((e) => {
      emailBody += `- ${e.title} (${e.updated})\n`;
    });
  
    return emailBody;
  
    
  }