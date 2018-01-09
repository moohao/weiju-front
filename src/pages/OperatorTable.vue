<template>
  <div class="operator">
    <Row>
        <Col span="22">
          <Input placeholder="输入搜索内容" style="width: 200px"></Input>
          <Button type="ghost" icon="ios-search">搜索</Button>
        </Col>
        <Col span="2">
          <Button type="ghost">新建</Button>
        </Col>
    </Row>
    <Table border :columns="columns" :data="operators" :stripe="true" class="table"></Table>
    <Page :total="11" show-elevator show-total style="text-align: right;margin-top: 20px;"></Page>
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
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    console.log('编辑')
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
                    console.log('删除')
                    // this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      operators: []
    }
  },
  created () {
    this.getOperators()
  },
  methods: {
    getOperators () {
      this.$http.get('/operators').then((res) => {
        // console.log(res.data)
        this.operators = res.data.operators
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
