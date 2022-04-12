const MFA = require('mangadex-full-api');

const queryString = window.location.search;
const urlparams =  new URLSearchParams(queryString);
const title = urlparams.get('Mtitle');
const cover = urlparams.get('cover');
getMangaInfo();

window.onload = function() {
    document.title = title;
}

function getMangaInfo() {
    MFA.Manga.search({
        title: title
    }).then(results => {
        let tags = results[0].tags

        //Creating chapter list
        var chapterlist = document.createElement('div');
        chapterlist.className = "infochapterlist";

        let chapters = MFA.Manga.getFeed(id=results[0].id, {translatedLanguage: ['en'], order: {volume: "asc", chapter: "asc"}},true).then(chapter => {
            chapter.forEach((elem,i) => setChapterList(elem, chapterlist));
        });

        //Creating elements for page
        var elemdiv = document.createElement('div');
        elemdiv.className = "infopanel";

        //Creating image source
        var coverimage = document.createElement('img');
        coverimage.src = cover;
        coverimage.className = "infoimage";
        coverimage.width = 200;

        //Creating div for text
        var textdiv = document.createElement('div');
        textdiv.className = "infotext";

        //Creating title
        var titleh1 = document.createElement('h1');
        titleh1.className = "infotitle";
        titleh1.innerHTML = title;

        //Creating div for tags
        var tagsdiv = document.createElement('div');
        tagsdiv.className = "infotags";

        //creating tags
        for (let i = 0; i < tags.length; i++ ) {
            var tagtext = document.createElement('p');
            tagtext.className = "infotag";
            tagtext.innerHTML = tags[i].localizedName['en'];
            tagsdiv.appendChild(tagtext);
        }

        //Creating description
        var desctext = document.createElement('p');
        desctext.className = "infodesc";
        desctext.innerHTML = results[0].description;

        elemdiv.appendChild(coverimage);
        textdiv.appendChild(titleh1)
        textdiv.appendChild(tagsdiv);
        textdiv.appendChild(desctext);
        elemdiv.appendChild(textdiv);
        elemdiv.appendChild(chapterlist);
        document.body.appendChild(elemdiv);
    })
}

function setChapterList(chapter, chapterlist) {
    var chapter_num = chapter.chapter;
    var chapter_title = chapter.title;
    var cltitle = chapter_num + ' ' + chapter_title;
    var listadd = document.createElement('p');
    listadd.innerHTML = cltitle;
    var attrib = document.createElement('a');
    attrib.href = "#";
    attrib.appendChild(listadd);
    chapterlist.appendChild(attrib);
}