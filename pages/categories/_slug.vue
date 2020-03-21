<template>
  <div>
    <v-img
      src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/49442049_2136301306456649_298560287894667264_o.jpg?_nc_cat=110&_nc_oc=AQm6SjyaXB34cG_zdLx5Rjuk7CQAXyr58Z3aMAGzJl1DIXZB1Of2MDH4kvU0-XyVTEKNOFVRFe6z2rOIb-vMisPO&_nc_ht=scontent-nrt1-1.xx&oh=b49d0781ed640818ae9d70e2c4e43499&oe=5EBAF5BD"
      max-height="250"
      to="/"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        height="80"
        width="80"
        elevation="6"
        class="mt-5 ml-5"
      />
    </v-img>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      width="350"
      bottom
      temporary
    >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>箕輪編集室</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn width="300" class="mx-auto my-2" href="/">
              TOP
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              エンジニアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              デザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              PRチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              学生チーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              ライターチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              メディアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              イベントプロデュースチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              コミュニティデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              キャリアデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              神社プロデュースチーム
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>マイプロジェクト</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn width="300" class="mx-auto my-2">
              箕輪編集室
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              エンジニアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              デザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              PRチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              学生チーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              ライターチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              メディアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              イベントプロデュースチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              コミュニティデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              キャリアデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              神社プロデュースチーム
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <h1></h1>
    <v-row
      justify="center"
    >
    <v-col
      cols="12"
      sm="11"
      md="10"
      xl="8"
    >
      <v-row v-if="relatedPosts.length">
        <v-col
          v-for="(post, i) in relatedPosts"
          :key="i"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <v-card
            max-width="500"
            class="mx-auto"
          >
            <v-img
              :src="post.fields.image.fields.file.url"
              :alt="post.fields.image.fields.title"
              :aspect-ratio="16/9"
              max-height="200"
            >
            <v-card-text>
              <v-chip
                :color="categoryColor(post.fields.category)"
                small
                dark
                class="font-weight-bold"
              >
                {{ post.fields.category.fields.name }}
              </v-chip>
            </v-card-text>
            </v-img>
            <v-row>
              <v-btn
                @click.stop="onClickBtn(post)"
                color="accent"
                text
                class="ml-6 my-1"
              >
                ABOUT
              </v-btn>
              <v-spacer />
              <v-btn
                :href="post.fields.url"
                color="accent"
                text
                class="mr-6 my-1"
              >
                Jump
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-dialog
          v-model="dialog"
          v-if="currentBook"
          max-width="700"
          activator
        >
          <v-card>
            <v-img
              :src="currentBook.fields.image.fields.file.url"
              :alt="currentBook.fields.image.fields.title"
              :aspect-ratio="16/9"
            >
            </v-img>
            <v-col>
              <template v-if="currentBook.fields.tags">
                <v-chip
                  v-for="(tag) in currentBook.fields.tags"
                  :key="tag.sys.id"
                  :to="linkTo('tags', tag)"
                  small
                  outlined
                  label
                  class="ml-3 my-3"
                >
                  <v-icon
                    left
                    size="18"
                    color="grey"
                  >
                    mdi-label
                  </v-icon>
                  {{ tag.fields.name }}
                </v-chip>
              </template>
            </v-col>
            <v-card-text>
              {{ currentBook.fields.body }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                :href="currentBook.fields.url"
                text
                color="primary"
                class="mr-3"
              >
                JUMP
              </v-btn>
              <v-spacer />
              <v-btn
                @click="dialog = false"
                color="green darken-1"
                text
                class="mr-3"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <div v-else class="text-center">
        投稿された記事はありません。
      </div>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      drawer: false,
      currentBook: null,
      group: null
    }
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    relatedPosts () {
      return this.$store.getters.relatedPosts(this.category)
    },
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'イベント・ミーティング': return '#C73A31'
          case '自己紹介・雑談等': return '#236244'
          case 'お知らせ': return 'primary'
          case '作品制作・プロジェクト': return '#0e2b3c'
          case '講座・勉強会': return '#aa00aa'
          case '質問・アンケート': return '#aaaa00'
          default: return '#777'
        }
      }
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  async asyncData ({ payload, store, params, error }) {
    const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)

    if (category) {
      return { category }
    } else {
      return error({ statusCode: 400 })
    }
  },
  methods: {
    onClickBtn (post) {
      this.currentBook = post
      this.dialog = true
    }
  }
}
</script>
