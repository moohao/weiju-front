<template>
  <div class="operator">
    <Row>
      <Col offset="21" span="3">
        <Button type="ghost" @click="pull">拉取昨日数据</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="articleInfos" :stripe="true" class="table"></Table>
    <Page :total="total" show-elevator :current="current_page" @on-change="pageChange" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '群发日期',
          key: 'ref_date'
        },
        {
          title: '用户阅读图文人口',
          key: 'user_source',
          render: (h, params) => {
            if (params.row.user_source === 0) {
              return h('div', '会话')
            } else if (params.row.user_source === 1) {
              return h('div', '好友')
            } else if (params.row.user_source === 2) {
              return h('div', '朋友圈')
            } else if (params.row.user_source === 3) {
              return h('div', '腾讯微博')
            } else if (params.row.user_source === 4) {
              return h('div', '历史消息页')
            } else if (params.row.user_source === 5) {
              return h('div', '其他')
            }
          }
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '图文页阅读人数',
          key: 'int_page_read_user'
        },
        {
          title: '图文页阅读次数',
          key: 'int_page_read_count'
        },
        {
          title: '原文页阅读人数',
          key: 'ori_page_read_user'
        },
        {
          title: '原文页阅读次数',
          key: 'ori_page_read_count'
        },
        {
          title: '分享人数',
          key: 'share_user'
        },
        {
          title: '分享次数',
          key: 'share_count'
        },
        {
          title: '收藏人数',
          key: 'add_to_fav_user'
        },
        {
          title: '收藏次数',
          key: 'add_to_fav_count'
        }
      ],
      articleInfos: [],
      total: null,
      current_page: null
    }
  },
  created () {
    // console.log(this.$route.meta.menuName)
    this.getArticleInfos()
  },
  methods: {
    getArticleInfos () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_article_infos').then((res) => {
        // console.log(res.data)
        this.articleInfos = res.data.wechatinfo.article_infos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pageChange (page) {
      // console.log(page)
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_article_infos' + '?page=' + page).then((res) => {
        this.articleInfos = res.data.wechatinfo.article_infos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pull () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/pull_article_info').then((res) => {
        this.$router.go(0)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  margin-top: 20px;
}
</style>
