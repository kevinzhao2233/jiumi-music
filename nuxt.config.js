export default {
  mode: 'spa',
  server: {
    port: 2233 // default: 3000
    // host: '0.0.0.0' // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_1685834_742cxsca80m.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f54691' },
  /*
   ** Global CSS
   */
  css: ['~/assets/common.css', '~/assets/global.css', '~/assets/animation.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-awesome-swiper', '~/plugins/vue-virtual-scroller', '~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'http://39.100.63.235/',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
