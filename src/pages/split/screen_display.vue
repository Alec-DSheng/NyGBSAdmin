<template>
  <a-row type="flex" :style="`height: ${pageMinHeight + 68}px`">
    <a-col flex="300px">
         <a-card
            style="width:100%;height:100%;"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key => onTabChange(key, 'key')"
          >
              <a-directory-tree default-expand-all @select="onSelect" :selectedKeys="treeNode">
                <a-tree-node :key="drive.id" :title="drive.name" v-for="drive in channelTreeData">
                  <a-tree-node :key="channel.id" v-for="channel in drive.channels" :title="channel.name" is-leaf />
                </a-tree-node>
              </a-directory-tree>
          </a-card>
    </a-col>
    <a-col flex="auto" style="padding: 0;">
       <a-card  style="width:100%;height:100%;" 
          :headStyle="{height: '55px', marginBottom: '20px'}"
          :bodyStyle="{height: pageMinHeight + 'px', margin: 0, marginTop: '-10px', padding: '0 10px 10px 10px'}">
          <div slot="title">
                <label class="title-label">分屏：</label>
                <div class="title-content">
                  <i class="iconfont icon-yifenping icon" style="left: 10px;"
                  :style="{color: mouseFlag == 1 || clickFlag == 1 ? '#ed4014': '#dcdee2'}"
                  @mouseover="onmouseoverIn(1)" @mouseleave="leave()" @click="changeTab(1)"/>
                  <i class="iconfont icon-sifenping icon" style="left: 10px;"
                  :style="{color: mouseFlag == 4 || clickFlag == 4 ? '#ed4014': '#dcdee2'}"
                  @mouseover="onmouseoverIn(4)" @mouseleave="leave()" @click="changeTab(4)"/>
                  <i class="iconfont icon-jiufenping icon" style="left: 10px;" alt="ss"
                  :style="{color: mouseFlag == 9 || clickFlag == 9 ? '#ed4014': '#dcdee2'}"
                  @mouseover="onmouseoverIn(9)" @mouseleave="leave()" @click="changeTab(9)"/>
                </div>
          </div>
          <!-- 多屏显示区域 -->
           <a-row style="height: 100%;" :gutter="8" justify="space-around" align="middle">
            <a-col
              v-for="panel in videoPanel.video" :key="panel.id"
              @click="selectPlayContent(panel.id)"
              :span="videoPanel.span" 
              :style="{border: '1px solid ' + (playerIndex == panel.id ? '#ed4014' : '#DEDEDE'), height:    videoPanel.height + '%', paddingTop: '2px'}">
                <live-player :videoUrl="panel.url"
                 aspect='fullscreen' 
                muted live stretch resolution='hd,sd' object-fit="fillCrop" mode="live"></live-player>
            </a-col>
          </a-row>
       </a-card>
    </a-col>
  </a-row>
</template>
<script>
import LivePlayer from '@liveqing/liveplayer'
import {mapState} from 'vuex'
import {getScanData, cleanScan} from '@/utils/scan.data'
export default {
  components: {
    'live-player': LivePlayer
  },
  data() {
    return {
      mouseFlag: 4,
      clickFlag: 4,
      treeNode: null,
      playerIndex: null,
      tabList: [
        {
          key: 'tab1',
          tab: '设备列表',
        },
        {
          key: 'tab2',
          tab: '设备分组',
        },
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2',
      },
      key: 'tab1',
      noTitleKey: 'app',
      videoPanel: {},
      channelTreeData: [
        {
          name: '市民服务中心',
          id: '1',
          channels: [
            {
              name: '0BEBC750',
              id: '0BEBC750'
            },
            {
              name: '0BEBC39C',
              id: '0BEBC39C'
            },
            {
              name: '0BEBC7FD',
              id: '0BEBC7FD'
            }
          ]
        }
      ]
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    selectPlayContent (id) {
      this.playerIndex = id
    },
    //标记下一个播放窗口
    flagNextWindow (index) {
      if (this.playerIndex == null) {
        this.playerIndex = this.videoPanel.video[0].id
      } else {
        let count = this.videoPanel.video.length
        if (index == count -1) {
          this.playerIndex = this.videoPanel.video[0].id
        } else {
           let i = index + 1
           this.playerIndex = this.videoPanel.video[i].id
        } 
      }
    },
    play (id) {
      console.log('播放' + id + '视频')
      //得到URL
      let url =  this.VIDEO_URL + id + '.flv'
      console.log(url)
      //得到当前播放窗口
      console.log(this.videoPanel)
      let pindex = 0
      this.videoPanel.video.forEach((element, index) => {
        console.log(index)
        if (element.id == this.playerIndex) {
          console.log('当前窗口播放视频 ' + element.id )
          element.url = url
          this.$forceUpdate()
          pindex = index
        }
      });
       this.flagNextWindow(pindex)
    },
    onSelect (id, v) {
      if(v.node.isLeaf) {
        this.treeNode = id
        this.play(id)
      }
    },
    onmouseoverIn (id) {
       this.mouseFlag = id
    },
    leave () {
      this.mouseFlag = 0
    },
    clean () {
      cleanScan(this.clickFlag)
      this.treeNode = null
    },
    changeTab (id) {
      console.log(this.treeNode)
      if (id  && id != null) {
        this.clean()
        this.clickFlag = id
      }
      this.playerIndex = null
      this.videoPanel = getScanData(this.clickFlag)
      console.log(this.videoPanel)
      this.flagNextWindow()
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
  mounted () {
     this.changeTab()
  }
}
</script>

<style scoped>
.icon {
 font-size:28px;color:#FFF;margin-right: 15px;
}
.title-label {
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 20px;
  position: absolute;
  top: 16px;
}
.title-content {
  position: absolute;
  top: 10px;
  left: 80px;
}
</style>