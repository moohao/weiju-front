<template>
  <div class="operator">
    <Row>
      <Col offset="22" span="2">
        <Button type="ghost" @click="createOperator">新建</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="operators" :stripe="true" class="table"></Table>
    <Modal
      v-model="modal"
      title="删除运营者"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此运营者？</p>
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
          title: '运营者姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '微信号',
          key: 'weixinhao'
        },
        {
          title: '联系方式',
          key: 'contact_number'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '创建时间',
          key: 'created_at',
          sortable: true
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
                    // console.log('查看')
                    this.$router.push('/operators/' + params.row.id)
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
                    this.$router.push('/operators/' + params.row.id + '/edit')
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
      operators: [],
      total: null,
      current_page: null,
      modal: false,
      deleteOperator: null
    }
  },
  created () {
    // console.log(this.$route.meta.menuName)
    this.getOperators()
  },
  methods: {
    getOperators () {
      this.$http.get('/operators').then((res) => {
        // console.log(res.data)
        this.operators = res.data.operators
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pageChange (page) {
      // console.log(page)
      this.$http.get('/operators' + '?page=' + page).then((res) => {
        this.operators = res.data.operators
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    showModal (row) {
      this.modal = true
      this.deleteOperator = row
    },
    ok () {
      this.operators.splice(this.deleteOperator._index, 1)
      this.$http.delete('/operators/' + this.deleteOperator.id).then((res) => {
        this.pageChange(this.current_page)
      })
      this.$Message.info('已删除此运营者！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    createOperator () {
      this.$router.push('/operators/new')
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
