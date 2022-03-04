export class Youtube {
  private player;

  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      console.log('call onYouTubeIframeAPIReady')
      // @ts-ignore
      window.player2 = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'dRgz1DrRhH0',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    };


    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      console.log('onPlayerReady');
      // event.target.playVideo();



      // player.mute();
    }

    function onPlayerStateChange(event) {
      var playerDiv = document.getElementById('player');

      switch (event.data) {
        // @ts-ignore
        case window.YT.PlayerState.PAUSED:
          playerDiv.style.display = "none";
          break;
        // @ts-ignore
        case window.YT.PlayerState.PLAYING:
          playerDiv.style.display = "none";
          break;
      }
    }
  }

  play() {
    // @ts-ignore
    window.player2.playVideo();
  }

  stop() {
    // @ts-ignore
    window.player2.stopVideo();
  }

  getCurrentTime() {
    // @ts-ignore
    return window.player2.getCurrentTime();
  }
}
