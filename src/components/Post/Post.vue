<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>

<!-- HTML -->
<template>

<div class="wrapper">

  <section class="post-header">
      <div class="post-header-img">
        <img :src="detailledpost.thumbnail.image_url" />
      </div>

      <div class="post-header-infos">
        <h1>{{ this.detailledpost.name }}</h1>
        <p class="post-header-infos__tagline">{{ this.detailledpost.tagline }}</p>
        <div class="post-header-infos-hunter">
          <div class="post-header-infos-hunter__label">Hunted by: </div>
          <div class="post-header-infos-hunter__name">{{ this.detailledpost.user.name }}</div>
        </div>
        <div class="post-header-infos-makers">
          <div class="post-header-infos-makers__title">Makers: </div>
          <ul class="post-header-infos-makers-list">
            <li v-for="maker in this.detailledpost.makers" :value='maker'>
              <div v-if="maker" class="post-header-infos-makers__maker">NO ONE. This product made itself.</div>
              <div v-else class="post-header-infos-makers__maker">{{ maker.name }}</div>
            </li>
          </ul>
        </div>
      </div>
  </section>

  <section class="post-infos">
    <div class="post-infos-topics">
      <h2>Topics:</h2>
      <ul class="post-infos-topics-list">
        <li v-for="topic in this.detailledpost.topics" :value='topic'>
          <p class="post-infos__topic">#{{ topic.name }}</p>
        </li>
      </ul>
    </div>

    <div class="post-infos-stats">
      <div class="post-infos-stats-votes">
        <h2>Votes</h2>
          <div class="post-infos-stats-votes__number">{{ this.detailledpost.votes_count }}</div>
      </div>

      <div class="post-infos-stats-comments">
        <h2>Comments</h2>
          <div class="post-infos-stats-comments__number">{{ this.detailledpost.comments_count }}</div>
      </div>

    </div>

  </section>



  <section class="post-content">
    <h2>Want to see images ?</h2>
    <ul class="post-content-slider">
      <li class="post-content-slider-slide" v-for="media in this.detailledpost.media">
        <div class="post-content-slider-slide__img">
          <img :src="media.image_url" />
        </div>
      </li>
    </ul>
  </section>

  <section class="post-comments">
    <h2>Comments</h2>
    <ul>
      <li class="post-comments-body" v-for="comment in this.detailledpost.comments" :value='comment'>
        <p>🤘 {{ comment.body }}</p>
      </li>
    </ul>
  </section>

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
        detailledpost: []
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
            this.detailledpost = response.data.post,
            getComments()

          })
          .catch(function (error) {
            console.log(error)
          })
      },

      getStats() {
        console.log("getStats...")
      }

    }

  }

</script>
