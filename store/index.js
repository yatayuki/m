import client from '~/plugins/contentful'

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
})

export const getters = {
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) { posts.push(state.posts[i]) }
    }
    return posts
  },
  relateedPosts: state => (tag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.tag.sys.id
      if (tag.sys.id === catId) { posts.push(state.posts[i]) }
    }
    return posts
  }
}
export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setCategories (state, payload) {
    state.categories = payload
  },
  setTags (state, payload) {
    state.tags = payload
    console.log(state.tags)
  }

}
export const actions = {
  async getCategories ({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    }).then(res =>
      commit('setCategories', res.items)
    ).catch(console.error)
  },
  async getTags ({ commit }) {
    await client.getEntries({
      content_type: 'tag'
    }).then(res =>
      commit('setTags', res.items)
    ).catch(console.error)
  },
  async getPosts ({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishdate' // desc
    }).then(res =>
      commit('setPosts', res.items)
    ).catch(console.error)
  }
}
