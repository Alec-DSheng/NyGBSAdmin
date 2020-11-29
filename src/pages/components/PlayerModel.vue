<template>
  <div>
     <a-modal
      forceRender
      centered
       :width = "860"
      :visible="modalVisible"
      @cancel="() => setModalVisible(false)"
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
                @mouseenter="showMenu=true"
                @mouseleave="showMenu=false">
         <live-player :videoUrl="null" style="height: 300px;"
                muted live stretch  object-fit="fillCrop" mode="live"></live-player>
            <div class="optionMenu" v-if="showMenu">
              <div class="top-div">
                  <i class="iconfont icon-jia icon icon-tt" 
                    :class="{itemHouver: itemHouverIndex == 1}" @mouseenter="mouseInner(1)" 
                    @mouseleave="mouseOut"></i> 
                  <i class="iconfont icon-jian icon icon-tt" 
                    :class="{itemHouver: itemHouverIndex == 2}" @mouseenter="mouseInner(2)" 
                    @mouseleave="mouseOut"></i>  
              </div> 
          
              <a-row class="top-div-middle">
                 <a-col :span="24" class="grid">
                    <a-button type="link" size="small" @mouseenter="mouseInner(3)" 
                      @mouseleave="mouseOut"> <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 3}" type="up" />
                    </a-button>
                 </a-col>
                  <a-col :span="8" class="grid">
                     <a-button type="link" size="small" @mouseenter="mouseInner(5)"  @mouseleave="mouseOut"> 
                        <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 5}" type="left" />
                    </a-button>
                  </a-col>
                  <a-col :span="8" class="grid">
                     <a-button type="link" size="small" @mouseenter="mouseInner(7)"  @mouseleave="mouseOut"> 
                        <i v-if="itemHouverIndex != 7" class="iconfont icon-iconhuatongguanbixuanzhong icon-c"></i>  
                        <i v-if="itemHouverIndex == 7" class="iconfont icon-huatong icon-c itemHouver"></i>  
                    </a-button>
                  </a-col>
                  <a-col :span="8" class="grid">
                     <a-button type="link" size="small" @mouseenter="mouseInner(6)"  @mouseleave="mouseOut"> 
                        <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 6}" type="right" />
                    </a-button>
                  </a-col>
                  <a-col :span="24" class="grid">
                    <a-button type="link" size="small" @mouseenter="mouseInner(4)" 
                      @mouseleave="mouseOut"> <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 4}" type="down" />
                    </a-button>
                 </a-col>
              </a-row>
            </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
export default {
  name: 'PlayerModel',
  components: {
    'live-player': LivePlayer
  },
  data () {
    return {
      itemHouverIndex: null,
      modalVisible: false,
      showMenu: false,
      video: {
        url: null,
        type: null
      },
      channel: {}
    }
  },
  methods: {
    setModalVisible(modalVisible) {
      this.modalVisible = modalVisible
    },
    getHlsUrl () {
      this.video.type = 'hls'
      this.video.url = this.VIDEO_URL + this.channel.streamCode + '/hls.m3u8'
      console.log(this.video)
    },
    getFlvUrl () {
      this.video.type = 'flv'
      this.video.url = this.VIDEO_URL + this.channel.streamCode + '.flv'
    },
    openPlayerModel (channel) {
      this.channel = channel
      this.getFlvUrl()
      this.setModalVisible(true)
    },
    mouseInner(index) {
      this.itemHouverIndex = index
    },
    mouseOut () {
       this.itemHouverIndex = null
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