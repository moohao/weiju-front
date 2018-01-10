<template>
  <div class="OperatorEdit">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="wechatinfo" :label-width="100">
      <FormItem label="运营者">
        <Select v-model="test02" multiple style="width:260px">
          <Option v-for="t in test" :value="t.value" :key="t.value">{{ t.label }}</Option>
        </Select>
        <!-- <Input v-model="wechatinfo.operators" placeholder="请输入姓名"></Input> -->
      </FormItem>
      <FormItem label="公众号网址">
        <Input v-model="wechatinfo.url_address" placeholder="请输入公众号网址"></Input>
      </FormItem>
      <FormItem label="网站检测字符">
        <Input v-model="wechatinfo.check_strings" placeholder="请输入网站检测字符"></Input>
      </FormItem>
      <FormItem label="认证到期时间">
        <DatePicker :value="wechatinfo.renzheng_time" type="date" placeholder="请选择认证到期时间" style="width: 200px"></DatePicker>
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
      test: [
        {
          value: '11',
          label: '22'
        }
      ],
      test01: [],
      test02: ['11']
    }
  },
  created () {
    // console.log(this.$route.name)
    this.formTitle = '编辑公众号'
    // console.log(this.$route.params.id)
    this.$http.get('/wechatinfos/' + this.$route.params.id).then((res) => {
      console.log(res.data)
      this.wechatinfo = res.data.wechatinfo
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
