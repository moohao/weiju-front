<template>
  <div class="OperatorNewAndEdit">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="operator" :label-width="100">
      <FormItem label="运营者姓名">
        <Input v-model="operator.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="邮箱">
        <Input v-model="operator.email" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem label="联系方式">
        <Input v-model="operator.contact_number" placeholder="请输入联系方式"></Input>
      </FormItem>
      <FormItem label="微信号">
        <Input v-model="operator.weixinhao" placeholder="请输入微信号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="commitSave">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formTitle: null,
      operator: {
        name: '',
        contact_number: '',
        email: '',
        weixinhao: ''
      }
    }
  },
  created () {
    // console.log(this.$route.name)
    if (this.$route.name === 'OperatorNew') {
      this.formTitle = '新建运营者'
    } else {
      this.formTitle = '编辑运营者'
      // console.log(this.$route.params.id)
      this.$http.get('/operators/' + this.$route.params.id).then((res) => {
        // console.log(res.data)
        this.operator = res.data.operator
      })
    }
  },
  methods: {
    back () {
      this.$router.push('/operators')
    },
    commitSave () {
      if (this.$route.name === 'OperatorNew') {
        this.$http.post('/operators', {operator: this.operator}).then((res) => {
          this.$router.push('/operators')
        })
      } else {
        this.$http.put('/operators/' + this.$route.params.id, {operator: this.operator}).then((res) => {
          this.$router.push('/operators')
        })
      }
    }
  }
}
</script>

<style scoped>
.form-title {
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
