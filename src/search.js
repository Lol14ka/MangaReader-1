const MFA = require('mangadex-full-api');

const queryString = window.location.search;
const urlparams =  new URLSearchParams(queryString);
let term = urlparams.get('term');
console.log(term);

search();

async function search() {
    //let manga = await MFA.Manga.getByQuery(term);
    //let id = manga.id;
    //MFA.Manga.getCovers(id).then(results => {
    //    const cover = results[0].image256;
    //});

    await MFA.Manga.search({
        title: term,
        limit: Infinity,
    }).then(results => {
        for (let i = 0; i < results.length; i++ ) {
            results[i].getCovers().then(res => {
                let coverimage = res[0].image256;
                let text = coverimage.split("/");
                let id = text[4];
                let title = results[i].title;
                let desc = results[i].description;
                let tags = results[i].tags;


                //Creating the panels for the manga

                //div of entire panel
                var elemdiv = document.createElement("div");
                elemdiv.className = "panel";
                elemdiv.addEventListener('click', function() {
                    window.location = 'page.html?Mtitle='+title+"&cover="+coverimage+"&term="+term;
                })

                //cover image of manga
                var mangaimage = document.createElement("img");
                mangaimage.src = coverimage;
                mangaimage.className = 'panelimage';
                mangaimage.width = 125;

                //new div for text
                var textdiv = document.createElement("div");
                textdiv.className = "paneltext";

                //create title of manga
                var mangatitle = document.createElement("h3");
                mangatitle.className = "paneltitle"
                mangatitle.innerHTML = title;

                //Create tags div
                var tagdiv = document.createElement('div');
                tagdiv.className = "paneltags";

                //Create tags
                for (let x = 0; x < tags.length; x++ ) {
                    var tagtext = document.createElement('p');
                    tagtext.className = "tag";
                    tagtext.innerHTML = tags[x].localizedName['en'];
                    tagdiv.appendChild(tagtext);
                }

                //Add everything to document
                textdiv.appendChild(mangatitle);
                textdiv.appendChild(tagdiv);
                elemdiv.appendChild(mangaimage);
                elemdiv.appendChild(textdiv);

                var searchbar = document.getElementById('search-terms');
                searchbar.appendChild(elemdiv);
            })
        }
    })
}