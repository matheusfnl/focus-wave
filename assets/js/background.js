let sounds = [];
let dark_theme = true;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'playAudio') {
    const index = sounds.push({
      name: request.audio_data.name,
      volume: request.audio_data.volume,
      src: request.audio_data.src,
      playing: true,
      audio: new Audio(request.audio_data.src)
    })

    const current_sound = sounds[index - 1];
    current_sound.audio.volume = current_sound.volume / 600;
    current_sound.audio.play();
  }

  if (request.action === 'unpauseAudio') {
    const current_sound = sounds.find(sound => sound.name === request.audio_data.name)
    current_sound.audio.play();
    current_sound.playing = true;
  }

  if (request.action === 'pauseAudio') {
    const current_sound = sounds.find(sound => sound.name === request.audio_data.name)
    current_sound.audio.pause();
    current_sound.playing = false;
  }

  if (request.action === 'changeVolume') {
    const current_sound = sounds.find(sound => sound.name === request.audio_data.name)
    current_sound.volume = request.audio_data.volume / 600;
    current_sound.audio.volume = current_sound.volume;
  }

  if (request.action === 'changeTheme') {
    dark_theme = request.dark_theme;
  }

  chrome.storage.local.set({ 'sounds': sounds });
  chrome.storage.local.set({ 'dark_theme': dark_theme });
});
