<template>
  <div class="layout">
    <Layout>
      <Header :style="{background: '#fff'}">
        <Row>
          <Col span="3">
            <img src="../assets/logo.png" height="60px">
          </Col>
          <Col span="17">
            <h1>微聚</h1>
          </Col>
          <Col span="1">
            <Badge dot>
              <Icon type="ios-bell-outline" size="20"></Icon>
            </Badge>
          </Col>
          <Col span="3">
          <Dropdown>
            <a href="javascript:void(0)">
              admin@qq.com
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><router-link to="/login">退出</router-link></DropdownItem>
              <DropdownItem>修改</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{minHeight: '92vh'}">
          <Menu active-name="1" theme="dark" width="auto">
            <MenuGroup title="平台管理">
              <MenuItem name="1" @click.native="linkPage(1)">
                <Icon type="person-stalker"></Icon>
                  运营者管理
              </MenuItem>
              <MenuItem name="2" @click.native="linkPage(2)">
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
export default {
  data () {
    return {
    }
  },
  methods: {
    linkPage (name) {
      if (name === 1) {
        this.$router.push('/operators')
      } else if (name === 2) {
        this.$router.push('/wechatinfos')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
