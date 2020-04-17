import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import VueToasted from 'vue-toasted'

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'show'
  return Vue.toasted[type](message, {duration: timeout})
}

Vue.use(VueToasted)

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)