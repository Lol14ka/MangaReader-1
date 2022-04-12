const MFA = require('mangadex-full-api');

const queryString = window.location.search;
const urlparams =  new URLSearchParams(queryString);
const title = urlparams.get('Mtitle');
const cover = urlparams.get('cover');
getMangaInfo();

function getMangaInfo() {
    MFA.Manga.search({
        title: title
    }).then(results => {
        console.log(title);
        console.log(cover);
        console.log(results[0].description);
        let chapters = MFA.Manga.getFeed(id=results[0].id, {translatedLanguage: ['en'], order: {volume: "asc", chapter: "asc"}},true).then(chapter => {
            chapter.forEach((elem,i) => console.log(elem));
        });
    })
}