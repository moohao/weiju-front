<template>
  <div class="OperatorShow" v-if="operator">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="operator" :label-width="100">
      <FormItem label="运营者姓名">
        <Input v-model="operator.name"></Input>
      </FormItem>
      <FormItem label="邮箱">
        <Input v-model="operator.email"></Input>
      </FormItem>
      <FormItem label="联系方式">
        <Input v-model="operator.contact_number"></Input>
      </FormItem>
      <FormItem label="微信号">
        <Input v-model="operator.weixinhao"></Input>
      </FormItem>
      <FormItem label="管理的公众号" v-for="(wechatinfo, index) in operator.wechatinfos" :key="index">
        <Input v-model="wechatinfo.nick_name"></Input>
      </FormItem>
      <FormItem>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formTitle: '查看运营者信息',
      operator: null
    }
  },
  created () {
    this.getOperator()
  },
  methods: {
    getOperator () {
      this.$http.get('/operators/' + this.$route.params.id).then((res) => {
        // console.log(res.data)
        this.operator = res.data.operator
      })
    },
    back () {
      this.$router.push('/operators')
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
