<template>
  <div class="OperatorShow" v-if="wechatinfo">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="wechatinfo" :label-width="100">
      <FormItem label="授权方APPID">
        <Input v-model="wechatinfo.authorizer_appid"></Input>
      </FormItem>
      <FormItem label="公众号主体名称">
        <Input v-model="wechatinfo.principal_name"></Input>
      </FormItem>
      <FormItem label="公众号签名">
        <Input v-model="wechatinfo.signature"></Input>
      </FormItem>
      <FormItem label="授权方公众号所设置的微信号">
        <Input v-model="wechatinfo.alias"></Input>
      </FormItem>
      <FormItem label="二维码图片">
        <img :src="wechatinfo.qrcode_url" />
      </FormItem>
      <FormItem label="授权方头像">
        <img :src="wechatinfo.head_img" />
      </FormItem>
      <FormItem label="授权方公众号类型">
        <Input v-if="wechatinfo.service_type_info === 0" value="订阅号"></Input>
        <Input v-if="wechatinfo.service_type_info === 1" value="由历史老帐号升级后的订阅号"></Input>
        <Input v-if="wechatinfo.service_type_info === 2" value="服务号"></Input>
      </FormItem>
      <FormItem label="授权方认证类型">
        <Input v-if="wechatinfo.verify_type_info === -1" value="未认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 0" value="微信认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 1" value="新浪微博认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 2" value="腾讯微博认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 3" value="资质认证通过、还未通过名称认证，但通过了新浪微博认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 4" value="资质认证通过、还未通过名称认证"></Input>
        <Input v-if="wechatinfo.verify_type_info === 5" value="资质认证通过、还未通过名称认证，但通过了腾讯微博认证"></Input>
      </FormItem>
      <FormItem label="授权方公众号的原始ID">
        <Input v-model="wechatinfo.user_name"></Input>
      </FormItem>
      <FormItem label="微信门店功能的开通状况">
        <Checkbox :false-value="0" :true-value="1" v-model="wechatinfo.open_store">{{wechatinfo.open_store === 0 ? '未开通' : '已开通'}}</Checkbox>
      </FormItem>
      <FormItem label="微信扫商品功能的开通状况">
        <Checkbox :false-value="0" :true-value="1" v-model="wechatinfo.open_scan">{{wechatinfo.open_scan === 0 ? '未开通' : '已开通'}}</Checkbox>
      </FormItem>
      <FormItem label="微信支付功能的开通状况">
        <Checkbox :false-value="0" :true-value="1" v-model="wechatinfo.open_pay">{{wechatinfo.open_pay === 0 ? '未开通' : '已开通'}}</Checkbox>
      </FormItem>
      <FormItem label="微信卡券功能的开通状况">
        <Checkbox :false-value="0" :true-value="1" v-model="wechatinfo.open_card">{{wechatinfo.open_card === 0 ? '未开通' : '已开通'}}</Checkbox>
      </FormItem>
      <FormItem label="微信摇一摇功能的开通状况">
        <Checkbox :false-value="0" :true-value="1" v-model="wechatinfo.open_shake">{{wechatinfo.open_shake === 0 ? '未开通' : '已开通'}}</Checkbox>
      </FormItem>
      <FormItem label="公众号授权给开发者的权限集列表">
        <!-- <Input v-model="wechatinfo.func_info"></Input> -->
        <CheckboxGroup v-model="wechatinfo.func_info">
          <Checkbox :label="func_info.label" :key="func_info.label" v-for="func_info in func_infos">{{func_info.value}}</Checkbox>
        </CheckboxGroup>
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
      formTitle: '查看公众号信息',
      wechatinfo: null,
      func_infos: [
        {label: 1, value: '消息管理权限'},
        {label: 2, value: '用户管理权限'},
        {label: 3, value: '帐号服务权限'},
        {label: 4, value: '网页服务权限'},
        {label: 5, value: '微信小店权限'},
        {label: 6, value: '微信多客服权限'},
        {label: 7, value: '群发与通知权限'},
        {label: 8, value: '微信卡券权限'},
        {label: 9, value: '微信扫一扫权限'},
        {label: 10, value: '微信连WIFI权限'},
        {label: 11, value: '素材管理权限'},
        {label: 12, value: '微信摇周边权限'},
        {label: 13, value: '微信门店权限'},
        {label: 14, value: '微信支付权限'},
        {label: 15, value: '自定义菜单权限'},
        {label: 16, value: '获取认证状态及信息'},
        {label: 17, value: '帐号管理权限（小程序）'},
        {label: 18, value: '开发管理与数据分析权限（小程序）'},
        {label: 19, value: '客服消息管理权限（小程序）'},
        {label: 20, value: '微信登录权限（小程序）'},
        {label: 21, value: '数据分析权限（小程序）'},
        {label: 22, value: '城市服务接口权限'},
        {label: 23, value: '广告管理权限'},
        {label: 24, value: '开放平台帐号管理权限'},
        {label: 25, value: '开放平台帐号管理权限（小程序）'},
        {label: 26, value: '微信电子发票权限'}
      ]
    }
  },
  created () {
    this.getWeChatInfo()
  },
  methods: {
    getWeChatInfo () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_auth_info').then((res) => {
        // console.log(res.data)
        this.wechatinfo = res.data.wechatinfo
      })
    },
    back () {
      this.$router.push('/wechatinfos')
    }
  }
}
</script>

<style scoped>
.form-title {
  margin-bottom: 20px;
  margin-left: 10px;
}
img {
  height: 200px;
  width: 200px;
}
</style>
