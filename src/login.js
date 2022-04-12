const MFA = require('mangadex-full-api');
const fs = require('fs');

window.onload = function() {
    let filesize = fs.statSync('src/user_data.txt').size;
    if (filesize != 0) {
        fs.readFile('src/user_data.txt', 'utf8', function(err,data) {
            const userdata = data.split(/(\s+)/);
            const username = userdata[0];
            const password = userdata[2];
            mfalogin(username, password);
        })
    } else {
        console.log("No Prior User")
    }
    document.getElementById("loginbutton").addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        mfalogin(username, password);
    })
}

function mfalogin(username, password) {
    MFA.login(username,password, './bin/.md_cache').then(() => {
        const content = username + " " + password;
        fs.writeFile('src/user_data.txt', content, err => {
            if (err) console.error(err);
        })
        window.location.replace('index.html');
    }).catch(console.error);
}