<template>
  <div class="login">
    <div class="logo"><img src="../assets/logo.png"></div>
    <div class="content">
      <h1 class="header">用户登录</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :inline="false">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="电子邮箱">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
        </FormItem>
      </Form>
    </div>
    <div class="footer">技术支持：链都科技 &copy; 2015 - 2018</div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Icon, Button } from 'iview'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Icon,
    Button
  },
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的格式, 例如:lindo@lindo.io', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}
.login {
  background-color: rgb(60, 60, 60);
  height: 100%;
  width: 100%;
  position: absolute;
}
.logo {
  width: 80px;
  margin-top: 200px;
  margin-right: auto;
  margin-left: auto;
}
.logo img {
  height: 80px;
}
.content {
  background-color: rgb(255, 255, 255);
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border-radius: 10px;
}
.header {
  text-align: center;
  margin-bottom: 40px;
}
.footer {
  width: 200px;
  color: rgb(255, 255, 255);
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}
</style>
