const ffmpeg = require('ffmpeg');
const fs = require('fs');
const ytdl = require('ytdl-core');

// let nodePath = process.argv[0];
// let appPath = process.argv[1];
let link = process.argv[2];

let linkID = ytdl.getURLVideoID(link);

ytdl.getInfo(linkID, (err, info) => {
    if (err) throw err;
    const videoTitile = info.player_response.videoDetails.title;
    const videoTitleWithoutSpaces = videoTitile.replace(/ /g, '_');
    console.log('Processing...');
    ytdl(link)
        .pipe(fs.createWriteStream(`files/video.avi`));
        setTimeout(function() {
            try {
                const process = new ffmpeg(`files/video.avi`);
                process.then(function (video) {
                    // Callback mode
                    video.fnExtractSoundToMP3(`files/${videoTitleWithoutSpaces}.mp3`, function (error, file) {
                        if (!error)
                            console.log('Audio file: ' + file);
                    });
                }, function (err) {
                    console.log('Error: ' + err);
                });
            } catch (e) {
                console.log(e.code);
                console.log(e.msg);
            }  
        }, 10000)
  });