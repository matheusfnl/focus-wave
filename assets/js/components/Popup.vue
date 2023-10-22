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
          :class="{ 'selected-icon': iconSelected(index) }"
          class="sound-button"
          v-for="(sound, index) in sounds"
          :key="index"
        >
          <div
            class="sound-button-wrapper"
            @click="setSelected(index)"
          >
            <component class="icon-size" :is="sound.icon" />
          </div>

          <Transition>
            <div class="volume-bar-container" v-if="shouldShowVolume(index)">
              <div class="volume-bar-wrapper">
                <input v-model="selected_sounds.find(e => e.item_index === index).volume" type="range" min="0" max="100" />
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
import { shallowRef } from 'vue'

  import SoundButton from './SoundButton.vue'
  import MusicHearthIcon from './icons/MusicHearth.vue'
  import SunIcon from './icons/Sun.vue'
  import MoonIcon from './icons/Moon.vue'
  import CloudRainIcon from './icons/CloudRain.vue'
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
  import GitHubIcon from './icons/GitHub.vue'
  import UserIcon from './icons/User.vue'

  export default {
    components: {
      SoundButton,
      MusicHearthIcon,
      GitHubIcon,
      UserIcon,
    },

    data() {
      return {
        dark_theme: false,
        selected_sounds: [],
        button_on_hover: null,
        sounds: [
          { icon: shallowRef(CloudRainIcon) },
          { icon: shallowRef(CloudThunderIcon) },
          { icon: shallowRef(DropsIcon) },
          { icon: shallowRef(WindIcon) },
          { icon: shallowRef(BeachIcon) },
          { icon: shallowRef(JollyRogerIcon) },
          { icon: shallowRef(TreeIcon) },
          { icon: shallowRef(LeafIcon) },
          { icon: shallowRef(CampfireIcon) },
          { icon: shallowRef(CaveIcon) },
          { icon: shallowRef(MoonIcon) },
          { icon: shallowRef(CoffeIcon) },
          { icon: shallowRef(TrainIcon) },
          { icon: shallowRef(PlaneIcon) },
          { icon: shallowRef(SchoolIcon) },
          { icon: shallowRef(ShipIcon) },
          { icon: shallowRef(TentIcon) },
          { icon: shallowRef(ToriiIcon) },
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

    methods: {
      playSound() {

      },

      toggleTheme() {
        this.dark_theme = ! this.dark_theme;

        if (this.dark_theme) {
          return document.body.className = 'dark-theme'
        }

        document.body.className = '';
      },

      setSelected(index) {
        const indexInArray = this.selected_sounds.map(e => e.item_index).indexOf(index);

        if (indexInArray === -1) {
          return this.selected_sounds.push({
            item_index: index,
            volume: 50,
          });
        }

        return this.selected_sounds.splice(indexInArray, 1);
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

      shouldShowVolume(index) {
        return this.button_on_hover === index && this.iconSelected(index)
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 320px;
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
    grid-template-columns: repeat(6,minmax(0,1fr));
    grid-gap: 8px;
    display: grid;
    width: 100%;
  }

  .sound-button {
    position: relative;
    z-index: 5;
  }

  .sound-button-wrapper {
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