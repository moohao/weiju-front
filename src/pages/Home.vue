<template>
  <div class="layout">
    <Layout>
      <Header :style="{background: '#fff', padding: '0 20px'}">
        <Row>
          <Col span="2">
            <img src="../assets/logo.png" height="60px">
          </Col>
          <Col span="18">
            <h1>微聚-微信公众号管理平台</h1>
          </Col>
          <Col span="4" style="text-align: center">
          <Badge>
            <Icon type="ios-bell-outline" size="20"></Icon>
          </Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Dropdown>
            <a href="javascript:void(0)">
              {{this.user.email}}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><router-link to="/login">退出</router-link></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{minHeight: '92vh'}">
          <Menu :active-name="this.$route.meta.menuName" theme="dark" width="auto">
            <MenuGroup title="平台管理">
              <MenuItem name="Operator" @click.native="linkPage('OperatorTable')">
                <Icon type="person-stalker"></Icon>
                  运营者管理
              </MenuItem>
              <MenuItem name="WeChatInfo" @click.native="linkPage('WeChatInfoTable')">
                <Icon type="chatbubbles"></Icon>
                  微信公众号管理
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', margin: '24px 0', minHeight: '650px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    linkPage (name) {
      if (name === 'OperatorTable') {
        this.$router.push('/operators')
      } else if (name === 'WeChatInfoTable') {
        this.$router.push('/wechatinfos')
      } else if (name === 'Chart') {
        this.$router.push('/chart')
      }
    },
    handleSpinShow () {
      this.$Spin.show()
      setTimeout(() => {
        this.$Spin.hide()
      }, 3000)
    },
    instance (type) {
      switch (type) {
        case 'success':
          this.$Modal.success({
            title: '公众号授权',
            content: '微信公众号授权登录成功!点击确定获取公众号信息!',
            onOk: () => {
              window.location.href = '/admin/#/wechatinfos'
            }
          })
          break
        case 'error':
          this.$Modal.error({
            title: '公众号授权',
            content: '微信公众号授权登录失败!请您重新授权!',
            onOk: () => {
              window.location.href = '/admin/#/wechatinfos'
            }
          })
          break
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    // 判断是否有auth_code
    let result = (window.location.href).match(/auth_code=(\S*)&expires/)
    // console.log(result)
    if (result !== null) {
      this.handleSpinShow()
      this.$http.post('/openweixin/login', {auth_code: result[1]}).then((res) => {
        // console.log(res.data)
        this.instance('success')
      }).catch(() => {
        // console.log(err.response)
        this.instance('error')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  min-width: 1200px;
}
</style>
