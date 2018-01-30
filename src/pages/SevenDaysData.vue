<template>
  <div class="">
    <h2 style="margin-left: 20px;">七日数据变化</h2>
    <h3 style="margin: 20px;">文章标题: {{title}}</h3>
    <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 900px;height: 600px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      sevenDaysData: null,
      title: null
    }
  },
  created () {
    this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_articletotal_info_7days_data?articletotal_infos_id=' + this.$route.query.articletotal_infos_id).then((res) => {
      this.sevenDaysData = res.data.wechatinfo.articletotal_info
      this.title = res.data.wechatinfo.title
      this.$nextTick(function () {
        this.drawPie('main')
      })
    })
    // console.log(this.$route.query.articletotal_infos_id)
  },
  methods: {
    drawPie (id) {
      // var sevenDaysData = this.sevenDaysData
      var myChart = echarts.init(document.getElementById(id))
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['图文页阅读人数', '图文页阅读次数', '原文页阅读人数', '原文页阅读次数', '分享人数', '分享次数', '收藏人数', '收藏次数']
          // selected: {
          //   '图文页阅读人数': false
          // }
        },
        toolbox: {
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.sevenDaysData.map((v) => { return v.stat_date })
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '图文页阅读人数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.int_page_read_user })
          },
          {
            name: '图文页阅读次数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.int_page_read_count })
          },
          {
            name: '原文页阅读人数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.ori_page_read_user })
          },
          {
            name: '原文页阅读次数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.ori_page_read_count })
          },
          {
            name: '分享人数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.share_user })
          },
          {
            name: '分享次数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.share_count })
          },
          {
            name: '收藏人数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.add_to_fav_user })
          },
          {
            name: '收藏次数',
            type: 'line',
            stack: '总量',
            data: this.sevenDaysData.map((v) => { return v.add_to_fav_count })
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
