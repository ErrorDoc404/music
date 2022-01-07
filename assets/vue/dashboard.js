import Router from 'vue-router'

Vue.use(Router)

const index = new Vue({
  el: '#app-dashboard',
  data: {
    modules: null,
  },
  created () {
    fetch('/api/module')
      .then(res => res.json())
      .then(json => {
        this.modules = json
    });
  }
})
