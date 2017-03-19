// On importe Vue
import Vue from 'vue'

// On importe VueRouter
import VueRouter from 'vue-router'

// On importe axios
import axios from 'axios'

// On importe les composants Home etc
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Post from './components/Post/Post.vue'

//On utilise VueRouter
Vue.use(VueRouter)

//Config routes
const routes = [
	{
		path: '/',
		component: Home,
		name: 'home_component'
	},
	{
		path: '/post/:postId',
		component: Post,
		name: 'post_component'
	}
]

//init router
const router = new VueRouter({
	routes
})


// On configure axios
const token = '4815a410628bba9c82e5e20865147b997e98292209f0c543176386942a449bec'
axios.defaults.baseURL = 'https://api.producthunt.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

// On initialise l'application
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
// new Vue({
//   el: '#app',
//   render: h => h(Home)
// })