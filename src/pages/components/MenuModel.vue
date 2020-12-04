<!-- 控制摄像头操作 -->
<template>
    <div>
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
              <a-button type="link" size="small" 
                @mousedown="startMoveUp"
                @mouseup="stop"
                @mouseenter="mouseInner(3)" 
                @mouseleave="mouseOut"> 
                  <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 3}" type="up" />
              </a-button>
            </a-col>
            <a-col :span="8" class="grid">
                <a-button type="link" size="small"
                @mousedown="startMoveLeft"
                @mouseup="stop"
                @mouseenter="mouseInner(5)" 
                @mouseleave="mouseOut"> 
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
                <a-button type="link" size="small" 
                  @mousedown="startMoveRight"
                  @mouseup="stop"
                  @mouseenter="mouseInner(6)"  
                  @mouseleave="mouseOut"> 
                  <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 6}" type="right" />
              </a-button>
            </a-col>
            <a-col :span="24" class="grid">
              <a-button type="link" size="small" 
                  @mousedown="startMoveDown"
                  @mouseup="stop"
                  @mouseenter="mouseInner(4)" 
                  @mouseleave="mouseOut"> 
                  <a-icon class="icon"  :class="{itemHouver: itemHouverIndex == 4}" type="down" />
              </a-button>
            </a-col>
        </a-row>
      </div>
    </div>
</template>

<script>
import {moving} from '@/services/video'
export default {
  name: 'MenuVideoModel',
  props: {
    serial: {
      type: String,
      default: '',
      required: true
    },
    code: {
      type: String,
      default: '',
      required: true
    },
  },
  data () {
    return {
      itemHouverIndex: null,
      showMenu: false,
      params: {
        command: null,
        serial: null,
        code: null,
        speed: 129
      }
    }
  },
  methods: {
    mouseInner(index) {
      this.itemHouverIndex = index
    },
    mouseOut () {
       this.itemHouverIndex = null
    },
    startMoveLeft () {
      this.params.command = 'left'
      moving(this.params)
    },
    startMoveRight () {
      this.params.command = 'left'
      console.log('开始现右移动')
    },
    startMoveUp () {
      console.log('开始现上移动')
    },
    startMoveDown () {
      console.log('开始现下移动')
    }, 
    stop () {
      this.params.command = 'stop'
      console.log('停止向左移动')
    },
    show () {
      this.showMenu = true
    },
    hide () {
      this.showMenu = false
    }
  },
  mounted(){
    this.params.serial = this.serial
    this.params.code = this.code
    console.log(this.params)
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