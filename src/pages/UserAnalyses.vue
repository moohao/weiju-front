<template>
  <div class="">
    <Row>
      <Col span="16">
        <h2 style="margin-left: 20px;">用户数据总量变化</h2>
      </Col>
      <Col span="8">
        <Button type="info" @click="pull">拉取昨日数据</Button>
      </Col>
    </Row>
    <!--为echarts准备一个具备大小的容器dom-->
  <div id="userAnalyses" style="width: 900px;height: 600px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      userAnalyses: null
    }
  },
  created () {
    this.$http.get('/wechatinfos/' + this.$route.params.id + '/get_all_user_analyses').then((res) => {
      this.userAnalyses = res.data.wechatinfo.user_analyses
      this.$nextTick(function () {
        this.drawUserAnalyses('userAnalyses')
      })
    })
  },
  methods: {
    drawUserAnalyses (id) {
      var myChart = echarts.init(document.getElementById(id))
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['用户来源', '新增用户数量', '取关用户数量', '用户总数量']
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
            data: this.userAnalyses.map((v) => { return v.ref_date })
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '用户来源',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: this.userAnalyses.map((v) => { return v.user_source })
          },
          {
            name: '新增用户数量',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: this.userAnalyses.map((v) => { return v.new_user })
          },
          {
            name: '取关用户数量',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: this.userAnalyses.map((v) => { return v.cancel_user })
          },
          {
            name: '用户总数量',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: this.userAnalyses.map((v) => { return v.cumulate_user })
          }
        ]
      }
      myChart.setOption(option)
    },
    pull () {
      this.$http.get('/wechatinfos/' + this.$route.params.id + '/pull_user_analysis').then((res) => {
        this.$router.go(0)
      })
    }
  }
}
</script>

<style scoped>

</style>
