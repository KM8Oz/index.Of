//
// Copyright (c) 2017 by Fedir Bobylev. All Rights Reserved.
//

export default class indexOf {

    /**
     * Function for index of search
     *
     * @param  {string} url    search filed url
     * @return {Promise}        Returns a promise, with an array of found href's and innerHTML
     */
    static get(url) {
        return new Promise( (resolve, reject) => {
                  let result = [] ;
            // Fetches Items from Google Image Search URL
            fetch("https://cors-anywhere.herokuapp.com/"+url)
            .then( res => {

                // Transforms HTML string into DOM object
                let parser = new DOMParser()
                doc = parser.parseFromString(res, "text/html")

                // Gets DOM element with image results
               
                Array.from(doc.getElementsByTagName("pre")[0].children).forEach(child => {
                    if(child.getAttribute("href") != "../"){
                      result.push([child.getAttribute("href") , child.innerHTML.replace("."," ") .replace("/","")])
                     } })

                    resolve(result)

            })
            .catch( err => reject(err) )
        })
    }

}
