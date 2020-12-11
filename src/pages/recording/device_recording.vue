<template>
  <div>
    <a-card :bordered="false"  :style="{width: '100%', minHeight: pageMinHeight + 68 + 'px'}">
      <a-row  slot="title">
        <a-col :span="24" style="text-align:center;padding-bottom:20px;font-size:20px;">
          录像时间轴(34020000001180000002-34020000001170000001)
        </a-col>
        <a-col :span="12">
          <a-button type="danger" size="default"  @click="$router.go(-1)"> <a-icon type="left"/> 返回 </a-button>
        </a-col>
        <a-col :span="12" style="text-align:right">
          <a-button-group>
            <a-date-picker size="default" :default-value="moment(new Date, dateFormat)" :format="dateFormat"/>
            <a-button type="primary" size="default">
              <a-icon type="unordered-list" />
              列表视图
            </a-button>
            <a-button type="primary" size="default">
              <a-icon type="menu-unfold" />
              时间轴视图
            </a-button>
          </a-button-group>
        </a-col>
      </a-row>
      <a-card style="width: 100%;height: 380px;display:flex;justify-content:center;margin-top:-10px;" :bodyStyle="{paddingTop: 0, marginTop:0}">
        <live-player videoUrl="http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8"  style="width: 650px;"  muted live stretch  object-fit="fillCrop" mode="live"></live-player>
      </a-card>
      <video-process :videos="videos" ref="timeRule" />
    </a-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LivePlayer from '@liveqing/liveplayer'
import VideoProcess from '../components/VideoProcess'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'VideoRecording',
  components: {
    'live-player': LivePlayer,
    'video-process': VideoProcess
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
  data () {
    return {
       dateFormat: 'YYYY-MM-DD',
       videos: []
    }
  },
  methods: {
    moment
  }
}
</script>

<style>

</style>