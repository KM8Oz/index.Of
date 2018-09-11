//
// Copyright (c) 2018 by kmoz000 . All Rights Reserved.
//


export default class index_Of {
           
    /**
     * Function for index of search
     *
     * @param  {string} url    search filed url
     * @return {Promise}        Returns a promise, with an array of found href's and innerHTML
     */
    static get(url,loader=false){
        return new Promise(resolve => {
    
       var progressBar = document.getElementById("loader"),result=[],Dmc,
      client = new XMLHttpRequest(),parser = new DOMParser;
   client.open("GET", "https://cors-anywhere.herokuapp.com/"+url,true);
   loader ? client.onprogress = function(pe) {
     if(pe.lengthComputable) {
       progressBar.max = pe.total
       progressBar.value = pe.loaded
     }
   } : null;
   client.onloadend = function(pe) {
      loader ? progressBar.value = pe.loaded : null;
     client.readyState == 4 && client.status == 200 ? (
      
       Dmc = parser.parseFromString(client.response,"text/html"),
      // Dmc.getElementsByTagName("pre")[0].children.forEach(element => {console.log(element)})
    // Dmc.getElementsByTagName("pre")[0].children[2].getAttribute("href").replace("/","") .replace('.'," ")       
    Array.from(Dmc.getElementsByTagName("pre")[0].children).forEach(child => {
     if(child.getAttribute("href") != "../"){
       result.push([child.getAttribute("href") , child.innerText.replace("."," ") .replace("/","")])
      } })
     ):null;
   }
   
   client.send();
   resolve(result);

})
   }

}
