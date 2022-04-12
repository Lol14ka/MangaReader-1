const {ipcRenderer} = require('electron')
const MFA = require('mangadex-full-api');
const fs = require('fs');

window.onload = function() {
    console.log("Loaded");
    fs.readFile('src/user_data.txt', 'utf8', function(err,data) {
        const userdata = data.split(/(\s+)/);
        const username = userdata[0];
        document.getElementById('welcome-message').innerHTML = "Welcome " + username;
    })

    document.getElementById('searchbutton').addEventListener('click', function() {
        let term = document.getElementById("manga_search").value;
        console.log(term);

        window.location = 'search.html?term='+term;
    })
}