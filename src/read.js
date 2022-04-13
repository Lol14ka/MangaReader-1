const queryString = window.location.search;
const urlparams =  new URLSearchParams(queryString);
const chapter_id = urlparams.get('chapter_id');
console.log(chapter_id);