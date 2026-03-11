import DefaultTheme from 'vitepress/theme'
import EspInstallButton from './components/EspInstallButton.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EspInstallButton', EspInstallButton)
  },
}
