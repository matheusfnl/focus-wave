<template>
  <div class="wrapper">
    <div class="app-title-container">
      <div>
        <MusicHearthIcon />
        Focus Wave
      </div>

      <button class="theme-switch" @click="toggleTheme">
        <component :is="getThemeIcon" />
      </button>
    </div>

    <div class="hr-line" />

    <div class="sound-container">
      <div class="buttons-container">
        <SoundButton
          @mouseover="buttonOnHover(index)"
          @mouseleave="buttonOnLeave(index)"
          :class="{ 'selected-icon': sound.selected }"
          class="sound-button"
          v-for="(sound, index) in sounds"
          :key="index"
        >
          <div
            class="centralized"
            @click="setSelected(sound)"
          >
            <component class="icon-size" :is="getSoundIcon(sound)" />
          </div>

          <Transition>
            <div class="volume-bar-container" v-if="shouldShowVolume(index, sound)">
              <div class="volume-bar-wrapper">
                <input @input="changeVolume($event, sound)" v-model="sound.volume" type="range" min="0" max="100" />
              </div>
            </div>
          </Transition>
        </SoundButton>
      </div>
    </div>

    <div class="hr-line" />

    <div class="footer-container">
      <div class="links-container">
        <UserIcon />
        <span>by</span>
        <a href="https://github.com/matheusfnl" target="_blank">
          matheusfnl
        </a>
      </div>

      <div class="links-container">
        <GitHubIcon />
        <a href="https://github.com/matheusfnl/focus-wave" target="_blank">
          source code
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { supabase } from '../supabaseClient';

  import { shallowRef } from 'vue'

  import SoundButton from './SoundButton.vue'
  import Loader from './Loader.vue'

  import MusicHearthIcon from './icons/MusicHearth.vue'
  import SunIcon from './icons/Sun.vue'
  import MoonIcon from './icons/Moon.vue'
  import CloudRainIcon from './icons/CloudRain.vue'
  import GitHubIcon from './icons/GitHubIcon.vue'
  import CloudThunderIcon from './icons/CloudThunder.vue'
  import DropsIcon from './icons/Drops.vue'
  import WindIcon from './icons/Wind.vue'
  import BeachIcon from './icons/Beach.vue'
  import JollyRogerIcon from './icons/JollyRoger.vue'
  import TreeIcon from './icons/Tree.vue'
  import LeafIcon from './icons/Leaf.vue'
  import CampfireIcon from './icons/Campfire.vue'
  import CaveIcon from './icons/Cave.vue'
  import CoffeIcon from './icons/Coffe.vue'
  import TrainIcon from './icons/Train.vue'
  import PlaneIcon from './icons/Plane.vue'
  import SchoolIcon from './icons/School.vue'
  import ShipIcon from './icons/Ship.vue'
  import TentIcon from './icons/Tent.vue'
  import ToriiIcon from './icons/Torii.vue'
  import UserIcon from './icons/User.vue'


  export default {
    components: {
      SoundButton,
      MusicHearthIcon,
      GitHubIcon,
      UserIcon,
      Loader,
    },

    data() {
      return {
        dark_theme: false,
        button_on_hover: null,
        sounds: [
          { icon: shallowRef(CloudRainIcon), selected: false, loading: false, src: null, name: 'rain' },
          { icon: shallowRef(CloudThunderIcon), selected: false, loading: false, src: null, name: 'rain_3' },
          { icon: shallowRef(DropsIcon), selected: false, loading: false, src: null, name: 'rain_2' },
          { icon: shallowRef(WindIcon), selected: false, loading: false, src: null, name: 'wind' },
          { icon: shallowRef(BeachIcon), selected: false, loading: false, src: null, name: 'tropical' },
          { icon: shallowRef(JollyRogerIcon), selected: false, loading: false, src: null, name: 'pirate' },
          { icon: shallowRef(TreeIcon), selected: false, loading: false, src: null, name: 'nature' },
          { icon: shallowRef(LeafIcon), selected: false, loading: false, src: null, name: 'leaf' },
          { icon: shallowRef(CampfireIcon), selected: false, loading: false, src: null, name: 'campfire' },
          { icon: shallowRef(CaveIcon), selected: false, loading: false, src: null, name: 'cave' },
          { icon: shallowRef(MoonIcon), selected: false, loading: false, src: null, name: 'night' },
          { icon: shallowRef(CoffeIcon), selected: false, loading: false, src: null, name: 'coffe' },
          { icon: shallowRef(TrainIcon), selected: false, loading: false, src: null, name: 'train' },
          { icon: shallowRef(PlaneIcon), selected: false, loading: false, src: null, name: 'plane' },
          { icon: shallowRef(SchoolIcon), selected: false, loading: false, src: null, name: 'school' },
          { icon: shallowRef(ShipIcon), selected: false, loading: false, src: null, name: 'cruise' },
          { icon: shallowRef(TentIcon), selected: false, loading: false, src: null, name: 'tent' },
          { icon: shallowRef(ToriiIcon), selected: false, loading: false, src: null, name: 'tokyo' },
        ]
      }
    },

    computed: {
      getThemeIcon() {
        if (this.dark_theme) {
          return MoonIcon;
        }

        return SunIcon;
      },
    },

    created() {
      chrome.storage.local.get('dark_theme', (data) => {
        if (data.dark_theme) {
          this.dark_theme = data.dark_theme;
          this.setTheme();
        }
      });

      chrome.storage.local.get('sounds', (data) => {
        if (data.sounds) {
          data.sounds.forEach(previous_sound => {
            const sound = this.sounds.find(actual_sound => actual_sound.name === previous_sound.name);
            sound.src = previous_sound.src;
            sound.volume = previous_sound.volume * 600;
            sound.selected = previous_sound.playing;
          });
        }
      });
    },

    methods: {
      toggleTheme() {
        this.dark_theme = ! this.dark_theme;
        chrome.runtime.sendMessage({ action: 'changeTheme', dark_theme: this.dark_theme });
        this.setTheme();
      },

      setTheme() {
        document.body.className = this.dark_theme ? 'dark-theme' : ''
      },

      async setSelected(sound) {
        if (! sound.loading) {
          if (! sound.selected) {
             sound.selected = true;

            if (! sound.src) {
              sound.loading = true;
              const { data } = await supabase.from('audios').select().eq('name', sound.name)
              sound.loading = false;
              sound.src = data[0].audio_path;
              sound.volume = 50;

              return chrome.runtime.sendMessage({ action: 'playAudio', audio_data: {
                name:sound.name,
                volume: sound.volume,
                src: data[0].audio_path,
              } });
            }

            return chrome.runtime.sendMessage({ action: 'unpauseAudio', audio_data: { name:sound.name } });
          }

          sound.selected = false;

          return chrome.runtime.sendMessage({ action: 'pauseAudio', audio_data: { name:sound.name } });
        }
      },

      changeVolume(event, sound) {
        sound.volume = event.target.value;

        return chrome.runtime.sendMessage({ action: 'changeVolume', audio_data: {
          name: sound.name,
          volume: sound.volume,
        }});
      },

      iconSelected(index) {
        return this.selected_sounds.map(e => e.item_index).includes(index);
      },

      buttonOnHover(index) {
        this.button_on_hover = index;
      },

      buttonOnLeave(index) {
        if (this.button_on_hover === index) {
          this.button_on_hover = null;
        }
      },

      shouldShowVolume(index, sound) {
        return this.button_on_hover === index && sound.selected && ! sound.loading;
      },

      getSoundIcon(sound) {
        if (sound.loading) {
          return Loader;
        }

        return sound.icon;
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 240px;
    padding: 12px;
  }

  .app-title-container {
    display: flex;
    justify-content: center;
    position: relative;

    font-size: 16px;
    font-weight: 500;
  }

  .app-title-container div:first-child {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .theme-switch {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    color: var(--text-1-color);
    transition: all .2s;
  }

  .theme-switch:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  .sound-container {
    display: flex;
    gap: 16px;
    max-width: 100%;
  }

  .buttons-container {
    grid-template-columns: repeat(4,minmax(0,1fr));
    grid-gap: 8px;
    display: grid;
    width: 100%;
  }

  .sound-button {
    position: relative;
    z-index: 5;
  }

  .centralized {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .volume-bar-container {
    position: absolute;
    bottom: 100%;
    width: calc(100% + 16px);
    left: -8px;
    background-color: transparent;
  }

  .volume-bar-wrapper {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
  }

  .volume-bar-wrapper input {
    width: 80%;
  }

  .icon-size { width: 32px; }
  .hr-line {
    height: 1px;
    width: 100%;
    background-color: var(--text-0-color);
    margin: 8px 0px;
  }

  .selected-icon {
    background-color: var(--background-inverse-color);
    color: var(--text-1-inverse-color);
    fill: var(--text-1-inverse-color);
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
  }

  .links-container {
    display: flex;
    gap: 4px;
  }

  .links-container svg { width: 18px; }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>