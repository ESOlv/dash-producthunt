<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>

<!-- HTML -->
<template>
  <!-- <span>{{ this.$route.params.postId }}</span> -->

<div class="wrapper">
	<span>POST</span>

  <div>{{ this.detailledpost.name }}</div>
  <img :src="detailledpost.thumbnail.image_url" />
  <div>{{ this.detailledpost.tagline }}</div>
	
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
        detailledpost: [],
      }
    },

    created() {

      this.getPost()

    },

    methods: {

      getPost() {
        // Utilisez axios pour récupérer les posts de l'API ProductHunt
        console.log('getPost...')

        axios.get(`/v1/posts/${this.$route.params.postId}`)
          .then((response) => {
            console.log(response)
            this.detailledpost = response.data.post

          })
          .catch(function (error) {
            console.log(error)
          })
      }

    }

  }

</script>
