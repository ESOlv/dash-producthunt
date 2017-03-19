<!-- CSS -->
<style lang="stylus" src="./PostsListItem.styl"></style>

<!-- HTML -->
<template>

  <li class="posts-list-item">
  	<router-link :to="{ name:'post_component', params: { postId: post.id } }">
		<img :src="post.thumbnail.image_url" />
		<!-- <figure class="post-list-item__thumb" :style: "{backgroundImage: `url(${post.screenshot_url['300px']})`}"></figure> -->
		<div class="posts-list-item-legend">
		  	<h2>{{ post.name }}</h2>
			<div class="posts-list-item-legend__upvotes">{{ post.votes_count }} upvotes</div>
			<div class="posts-list-item-legend__tagline">{{ post.tagline }}</div>
		</div>
	</router-link>
  </li>

</template>

<!-- JS -->
<script>

	export default {
		props: ['post']
	}

</script>
