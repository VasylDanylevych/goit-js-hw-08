import Player from '@vimeo/player';
import throttle from 'lodash.throttle'
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const onPlay = function({seconds}) {
localStorage.setItem("videoplayer-current-time", seconds)
};

player.on('timeupdate', throttle(onPlay, 1000));


const currentTime = localStorage.getItem("videoplayer-current-time")
player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
