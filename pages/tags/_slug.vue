<template>
  <div>
    <h1>{{ tag.fields.name }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    relateedPosts () {
      return this.$store.getters.relateedPosts(this.tag)
    }
  },
  async asyncData ({ payload, store, params, error }) {
    const tag = payload || await store.state.tags.find(cat => cat.fields.slug === params.slug)

    if (tag) {
      return { tag }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>
