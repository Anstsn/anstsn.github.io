const url = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const appleUrl = 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8';

const getMediaSource = () => {
    if (window.ManagedMediaSource) {
        return new window.ManagedMediaSource();
    }
    if (window.MediaSource) {
        return new window.MediaSource();
    }

    throw new Error('No MediaSource API available');
}

const playWithHlsChecking = () => {
    const video = document.getElementById('video');

    if(Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
    }
        // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
        // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('canplay',function() {
            video.play();
        });
    }
}

const playWithoutHlsChecking = () => {
    const video = document.getElementById('video');

    const hls = new Hls();

    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
}

const playWithMediaSource = () => {
    console.log('playWithMediaSource');

    const video = document.getElementById('video');

    const mediasource = getMediaSource();

    const videoSource1 = document.createElement('source');
    videoSource1.type = 'video/mp4' ;
    videoSource1.src = URL.createObjectURL(mediasource);
    video.appendChild(videoSource1);

    const videoSource2 = document.createElement('source');
    videoSource2.type = 'application/x-mpegURL';
    videoSource2.src = "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8";
    video.appendChild(videoSource2);


    // const mediaSource = getMediaSource();
    //
    // const video = document.getElementById('video');
    //
    //
    // const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    //
    // console.log(mediaSource.readyState); // closed
    // mediaSource.addEventListener('sourceopen', sourceOpen);
    // video.src = URL.createObjectURL(mediaSource);
    //
    // function sourceOpen() {
    //     console.log(this.readyState); // open
    //     const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    //
    //     fetchAB(url, (buf) => {
    //         sourceBuffer.addEventListener("updateend", () => {
    //             mediaSource.endOfStream();
    //             video.play();
    //             console.log(mediaSource.readyState); // ended
    //         });
    //         sourceBuffer.appendBuffer(buf);
    //     });
    // }

    // mediaSource.addEventListener('sourceopen', onMediaSourceOpen);
    //
    // mediaSource.addEventListener('startstreaming', (e) => {
    //     console.log('Browser recommends to start streaming', e);
    // });
    //
    // mediaSource.addEventListener('endstreaming', (e) => {
    //     console.log('Browser recommends to end streaming', e);
    // });
    //
    // mediaSource.addEventListener('qualitychange', (e) => {
    //     console.log('Browser recommends to change video quality', e);
    // });
}

// function fetchAB (url, cb) {
//     console.log(url);
//     var xhr = new XMLHttpRequest;
//     xhr.open('get', url);
//     xhr.responseType = 'arraybuffer';
//     xhr.onload = function () {
//         cb(xhr.response);
//     };
//     xhr.send();
// };

const btnWithHlsChecking = document.getElementById('btnWithHlsChecking');
const btnWithoutHlsChecking = document.getElementById('btnWithoutHlsChecking');
const btnWithMediaSource = document.getElementById('btnWithMediaSource');

btnWithHlsChecking.addEventListener('click', playWithHlsChecking);
btnWithoutHlsChecking.addEventListener('click', playWithoutHlsChecking);
btnWithMediaSource.addEventListener('click', playWithMediaSource);
