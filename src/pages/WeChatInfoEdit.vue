<template>
  <div class="OperatorEdit">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="wechatinfo" :label-width="100">
      <FormItem label="运营者">
        <Select v-model="wechatinfo.operators" multiple style="width:300px">
          <Option v-for="(operator, key) in operators" :value="operator.id" :key="key">{{ operator.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="公众号网址">
        <Input v-model="wechatinfo.url_address" placeholder="请输入公众号网址"></Input>
      </FormItem>
      <FormItem label="网站检测字符">
        <Input v-model="wechatinfo.check_strings" placeholder="请输入网站检测字符"></Input>
      </FormItem>
      <FormItem label="认证到期时间">
        <DatePicker :value="wechatinfo.renzheng_time" type="date" placeholder="请选择认证到期时间" style="width: 300px"></DatePicker>
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
      wechatinfo: {},
      operators: null
    }
  },
  created () {
    // console.log(this.$route.name)
    this.formTitle = '编辑公众号'
    // console.log(this.$route.params.id)
    this.$http.get('/wechatinfos/' + this.$route.params.id + '/edit').then((res) => {
      // console.log(res.data)
      this.wechatinfo = res.data.wechatinfo
      this.wechatinfo.operators = this.wechatinfo.operators.map((v) => { return v.id })
    })
    this.$http.get('/operators/operator_name_show').then((res) => {
      this.operators = res.data.operators
    })
  },
  methods: {
    back () {
      this.$router.push('/wechatinfos')
    },
    commitSave () {
      this.$http.put('/wechatinfos/' + this.$route.params.id, {wechatinfo: this.wechatinfo}).then((res) => {
        this.$router.push('/wechatinfos')
      })
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
