export class Youtube {
  private player;

  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log('call onYouTubeIframeAPIReady')
      window.Player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'dRgz1DrRhH0',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    };


    function onPlayerReady(event) {
      console.log('onPlayerReady');
      // event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      const playerDiv = document.getElementById('player');

      switch (event.data) {
        case window.YT.PlayerState.PAUSED:
          playerDiv.style.display = "none";
          break;
        case window.YT.PlayerState.PLAYING:
          playerDiv.style.display = "none";
          break;
      }
    }
  }

  play() {
    window.Player.playVideo();
    window.Player.playVideo();
  }

  stop() {
    window.Player.stopVideo();
  }

  getCurrentTime() {
    return window.Player.getCurrentTime();
  }
}
