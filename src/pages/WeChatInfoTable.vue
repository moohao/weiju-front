<template>
  <div class="wechatinfo">
    <Row>
      <Col offset="21" span="3">
        <Button type="ghost" @click="pull">微信公众号授权</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="wechatinfos" :stripe="true" class="table"></Table>
    <Modal
      v-model="modal"
      title="删除公众号"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此公众号？</p>
    </Modal>
    <Page :total="total" show-elevator :current="current_page" @on-change="pageChange" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '公众号名称',
          key: 'nick_name'
        },
        {
          title: 'APPID',
          key: 'authorizer_appid'
        },
        {
          title: '运营者',
          key: 'operators',
          render: (h, params) => {
            return h('div', params.row.operators.map((v) => { return '<' + v.name + '>' }))
          }
        },
        {
          title: '关注人数',
          key: 'follower_count',
          sortable: true
        },
        {
          title: '认证到期时间',
          key: 'renzheng_time',
          sortable: true
        },
        {
          title: '公众号网址',
          key: 'url_address'
        },
        {
          title: '网站检测字符',
          key: 'check_strings'
        },
        {
          title: '网站状态',
          key: 'status',
          sortable: true
        },
        {
          title: '用户数据总量变化',
          key: 'action',
          width: 90,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // console.log('编辑')
                    this.$router.push('/wechatinfos/' + params.row.id + '/user_analyses')
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '图文数据',
          key: 'action',
          width: 130,
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
                    this.$router.push('/wechatinfos/' + params.row.id + '/article_infos')
                  }
                }
              }, '单日'),
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
                    this.$router.push('/wechatinfos/' + params.row.id + '/article_total_infos')
                  }
                }
              }, '群发')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // console.log('编辑')
                    this.$router.push('/wechatinfos/' + params.row.id)
                  }
                }
              }, '查看'),
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
                    this.$router.push('/wechatinfos/' + params.row.id + '/edit')
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // console.log('删除')
                    // console.log(params.row)
                    this.showModal(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      wechatinfos: [],
      total: null,
      current_page: null,
      modal: false,
      deleteWeChatInfo: null
    }
  },
  created () {
    this.getWeChatInfos()
  },
  methods: {
    getWeChatInfos () {
      this.$http.get('/wechatinfos').then((res) => {
        // console.log(res.data)
        this.wechatinfos = res.data.wechatinfos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pageChange (page) {
      // console.log(page)
      this.$http.get('/wechatinfos' + '?page=' + page).then((res) => {
        this.wechatinfos = res.data.wechatinfos
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    showModal (row) {
      this.modal = true
      this.deleteWeChatInfo = row
    },
    ok () {
      this.wechatinfos.splice(this.deleteWeChatInfo._index, 1)
      this.$http.delete('/wechatinfos/' + this.deleteWeChatInfo.id).then((res) => {
        this.pageChange(this.current_page)
      })
      this.$Message.info('已删除此公众号！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    pull () {
      this.$http.get('/openweixin/l').then((res) => {
        // console.log(res.data)
        let preAuthCode = res.data.pre_auth_code
        let redirectURL = window.location.href
        window.location.href = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=wxbd246bf45ac74904&pre_auth_code=' + preAuthCode + '&redirect_uri=' + redirectURL + '&auth_type='
      })
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
