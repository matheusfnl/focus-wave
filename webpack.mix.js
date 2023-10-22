let mix = require('laravel-mix')
require('mix-env-file');

mix.setPublicPath('./')
  // .env(process.env.SUPABASE_URL)
  // .env(process.env.SUPABASE_KEY)
  .sass('assets/sass/popup.scss', 'dist/css')
  .js('assets/js/background.js', 'dist/js')
  .js('assets/js/supabaseClient.js', 'dist/js')
  .js('assets/js/popup.js', 'dist/js').vue()
  .options({
    processCssUrls: false,
  })