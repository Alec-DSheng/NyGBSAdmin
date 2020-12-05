<template>
  <div>
     <a-modal
      forceRender
      centered
       :width = "860"
      :visible="modalVisible"
      @cancel="close"
      :footer="null"
    >
      <div slot="title" style="width: 100%; text-align:center;">{{channel.name}}</div>
      <a-row style="padding-bottom: 10px;">
        <a-col :span="12">
           <a-button-group>
              <a-button  size="large" :type="video.type == 'hls' ? 'danger': ''" @click="getHlsUrl">HSL</a-button>
              <a-button  size="large" :type="video.type == 'flv' ? 'danger': ''"  @click="getFlvUrl"> FLV </a-button>
           </a-button-group>
        </a-col>
        <a-col :span="12" style="text-align:right;">
           <a-button type="danger" size="large" > 实时录像 </a-button>
        </a-col>
      </a-row>
      <div style="width: 100%; height: 460px;padding:0;margin:0;" 
                @mouseenter="show"
                @mouseleave="hide">
         <live-player :videoUrl="video.url" style="height: 300px;"
                muted live stretch  object-fit="fillCrop" mode="live"></live-player>
              <menu-model ref="menuModeRef" :serial="serial" :code="code"></menu-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
import MenuModel from '../components/MenuModel'
import {player} from '@/services/video'
export default {
  name: 'PlayerModel',
  components: {
    'live-player': LivePlayer,
    'menu-model': MenuModel
  },
  data () {
    return {
      modalVisible: false,
      video: {
        url: null,
        type: null
      },
      channel: {},
      serial: 'sss',
      code: '333'
    }
  },
  methods: {
    setModalVisible(modalVisible) {
      this.modalVisible = modalVisible
    },
    getHlsUrl () {
      this.video.type = 'hls'
      this.video.url = this.video.hlsUrl
    },
    getFlvUrl () {
      this.video.type = 'flv'
      this.video.url = this.video.flvUrl
    },
    openPlayerModel (channel) {
      this.channel = channel
      console.log(this.channel)
      //this.getFlvUrl()
      this.setModalVisible(true)
      player({deviceId: channel.deviceId, channelId: channel.code}).then(res => {
        let data = res.data.data
        console.log(data)
        this.channel.streamCode = data.streamCode
        this.video.flvUrl = data.flvUrl
        this.video.hlsUrl = data.hlsUrl
        this.getFlvUrl()
      })
    },
    show () {
      this.$refs.menuModeRef.show()
    },
    hide () {
      this.$refs.menuModeRef.hide()
    },
    close () {
      this.setModalVisible(false)
      this.video.url = null
    }
  }
}
</script>

<style lang="less" scoped>
  .optionMenu {
    padding: 20px 2px 2px 2px ;
    width: 150px;
    height: 240px;
    background-color: #000;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 150px;
    margin-right: 24px;
    opacity:0.6;
  }
  .icon-tt {
    font-size: 30px;margin: 5px 10px;
  }
  .icon {
     color: #FFF;
     font-size: 26px;
     margin-top: 10px;
  }
   .icon-c {
      font-size: 32px;
      color: #FFF;
      margin-bottom: 15px;
   }
  .optpanel {
    text-align: center;
    padding-top: 30px;
  }
  .top-div {
    height: 50px;
    width: 100%;
    text-align:center;
  }
  .top-div-up {
    height: 30px;
    width: 100%;
    text-align:center;
    padding: 0;
    margin: 0;
  }
  .top-div-middle {
     height: 60px;
     width: 100%;
     text-align:center;
     margin: 10px 0 10px 0
  }
  .itemHouver {
    color: red!important;
  }
  .grid {
    height: 50px;
  }
</style>