chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'play') {
    const audio  = new Audio(request.url);

    audio.volume = 0.02;

    audio.play();
  }
});