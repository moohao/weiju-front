<template>
  <div class="operator">
    <Row>
      <Col offset="21" span="3">
        <Button type="ghost" @click="pull">拉取群发总数据</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="articleTotalInfos" :stripe="true" class="table"></Table>
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
          title: '图文数据',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // console.log('编辑')
                    this.$router.push('/wechatinfos/' + this.$route.params.id + '/seven_days_data?articletotal_infos_id=' + params.row.id)
                  }
                }
              }, '七日数据变化')
            ])
          }
        }
      ],
      articleTotalInfos: [],
      total: null,
      current_page: null
    }
  },
  created () {
    // console.log(this.$route.meta.menuName)
    this.getArticleTotalInfos()
  },
  methods: {
    getArticleTotalInfos () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_articletotal_infos').then((res) => {
        // console.log(res.data)
        this.articleTotalInfos = res.data.wechatinfo.articletotal_infos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pageChange (page) {
      // console.log(page)
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_articletotal_infos' + '?page=' + page).then((res) => {
        this.articleTotalInfos = res.data.wechatinfo.articletotal_infos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pull () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/pull_articletotal_info').then((res) => {
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
