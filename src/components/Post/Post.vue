<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>

<!-- HTML -->
<template>

<div>
	<span>POST</span>
	<span>{{ this.$route.params.postId }}</span>
	
</div>

</template>

<!-- JS -->
<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'

  // Import du composant PostsListItem
  import PostsListItem from '../PostsListItem/PostsListItem.vue'

  export default {

    data() {
      return {
        post: null,
      }
    },

    created() {

      this.getPost()

    },

    methods: {

      getPost() {
        // Utilisez axios pour récupérer les posts de l'API ProductHunt
        // Variable à modifier : this.posts
        console.log('getPost...')

        //get route ProductHunt, selectedDay => daysAgo
        axios.get('/v1/posts/1')
          .then((response) => {
            console.log(response)
            this.post = response

          })
          .catch(function (error) {
            console.log(error)
          })
      }

    }

  }

</script>
