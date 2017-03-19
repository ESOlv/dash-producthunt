<!-- CSS -->
<style lang="stylus" src="./PostsList.styl"></style>

<!-- HTML -->
<template>
  <div class="wrapper">

    <div class="posts-list-filters">
      <select v-model="daysAgo" @change="getPosts()" name="day">
      <!-- v-model: a chaque changement de user, j'update daysAgo -->
        <option v-for="day in days" :value='day'>{{ selectDaysLabel(day) }}</option>
      </select>
    </div>

    <ul class="posts-list-stats">
      <li v-for="stat in stats" :value='stat'>
        <h2 class="posts-list-stats__number">{{ stat.count }}</h2>
        <div>{{ stat.label }}</div>
      </li>
    </ul>

    <ul class="posts-list">
      <posts-list-item v-for="post in posts" :post="post" :key="post.id">
      </posts-list-item>
    </ul>

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

    components: {
      'posts-list-item': PostsListItem
    },

    data() {
      return {
        posts: null,
        daysAgo: 0,
        days: _.range(31),
        stats: {
          posts: {
            count: 0,
            label: 'Posts'
          },
          votes: {
            count: 0,
            label: 'Votes'
          },
          comments: {
            count: 0,
            label: 'Comments'
          },
          makers: {
            count: 0,
            label: 'Makers'
          }
        }
      }
    },

    created() {

      this.getPosts()

    },

    methods: {

      getPosts() {
        // Utilisez axios pour récupérer les posts de l'API ProductHunt
        // Variable à modifier : this.posts
        console.log('getPosts...')

        //get route ProductHunt, selectedDay => daysAgo
        axios.get('/v1/posts', {
            params: {
              days_ago: this.daysAgo
              // ou days_ago: selectedDays, avec argument daysAgo dans la funct (et ds le select)
            }
          })
          .then((response) => {
            console.log(response.data.posts)
            this.posts = response.data.posts
            //rempli la data avec la variable d'axios

            //pour appeler la fonction countStats apres getPosts
            this.countStats()
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      countStats() {
        // Appeler cette méthode pour calculer les stats à chaque fois qu'on récupère les posts
        console.log('countStats...')
        this.stats.votes.count = 0
        this.stats.comments.count = 0
        this.stats.makers.count = 0
        this.stats.posts.count = 0
        return _.forEach(this.posts, (post) => {
          this.stats.posts.count += 1
          this.stats.votes.count += post.votes_count
          this.stats.comments.count += post.comments_count
          this.stats.makers.count += post.makers.length
        })


        // for (var post in this.posts) {
        //   this.stats.posts.count += 1
        //   this.stats.votes.count += this.posts[post].votes_count
        //   this.stats.comments.count += this.posts[post].comments_count
        //   this.stats.makers.count += (this.posts[post].makers).length
        // }

      },

      selectDaysLabel(day) {
        // Retourne "Today", "Yesterday", ou "X days ago" en fonction de "day"
        let label
        if (day === 0) label = 'Today'
        else if (day === 1) label = 'Yesterday'
        else label = `${day} days ago`
        return label
      }

    }

  }

</script>
