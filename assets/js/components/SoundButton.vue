<template>
  <div class="button-style">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'SoundButton'
  }
</script>

<style scoped>
  .button-style {
    align-items: center;
    aspect-ratio: 1/1;
    min-width: 100%;
    justify-content: center;
    border-radius: 4px;
    display: flex;
    transition: all .2s;
    outline: 1px solid transparent;
    fill: var(--text-1-color);
  }

  .button-style:hover {
    cursor: pointer;
    box-shadow: 0 0 4px 2px #6e6d77;
  }
</style>