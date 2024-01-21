app.get('/yt', function(req, res) {
    let ytStr = req.query.url;
    if(ytStr.indexOf('https://') != 0) return;
    if(ytStr.indexOf('youtube') < 0 && ytStr.indexOf('youtu.be') < 0) return;
    let yt = ytStr.substring(ytStr.length - 11);
    if(yt.search(/[a-zA-Z0-9_-]{11}/) != 0) return;
    exec('youtube-dl -x --audio-format mp3 \'' + ytStr + '\'', (err, stdout, stderr) => {
        if (err) {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }

        let fileName = stdout.substring(stdout.lastIndexOf('Destination:') + 13, stdout.indexOf('mp3', stdout.lastIndexOf('Destination:') + 13) + 3);

        let filePath = path.join(__dirname, fileName);
        res.download(filePath);
    });
});
