<template>
  <div>
    <a-card :bordered="false"  :style="{width: '100%', minHeight: pageMinHeight + 68 + 'px'}">
       <a-row  slot="title">
        <a-col :span="12">
          <a-button type="danger" size="default"  @click="$router.go(-1)"> <a-icon type="left"/> 返回 </a-button>

          <a-select
            v-model="searchStatus"
            size="default"
            enter-button
            style="width: 200px; margin-left: 10px;"
          >
            <a-select-option value="all">
              全部
            </a-select-option>
            <a-select-option value="online">
              在线
            </a-select-option>
            <a-select-option value="offline">
              离线
            </a-select-option>
          </a-select>

          <a-select
            v-model="searchType"
            enter-button
            size="default"
            style="width: 200px;margin-left: 10px;"
          >
            <a-select-option value="all">
              全部
            </a-select-option>
            <a-select-option value="device">
              设备
            </a-select-option>
            <a-select-option value="channel">
              子目录
            </a-select-option>
          </a-select>

        </a-col>
        <a-col :span="12" style="text-align: right;">
          <a-input-search style="width: 300px;" v-model="searchParams.channelId" size="default" placeholder="关键字" enter-button @search="onSearch" />
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="dataSource.data" :scroll="{ x: 1400 }" 
          rowKey="code"
          size="middle"  bordered 
          :pagination="{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            showSizeChanger: true,
            showTotal: function () {
              return '共 ' + dataSource.total + '条'
            }
          }">
        <template slot="tape" slot-scope="text">
            <a-button type="link" @click="$router.push({path: 'channel/recording', params: text})"> 
              <a-icon style="fontSize:18px" type="video-camera" /> 
            </a-button>
        </template>
        <template slot="play" slot-scope="text">
          <a-button  type="link" @click="player(text)">
             <a-icon style="fontSize:18px" type="play-circle" /> 
          </a-button>
        </template>
        <template slot="stop">
          <a-button  type="link" @click="stopPlayer"> <a-icon style="fontSize:18px" type="pause-circle" /> </a-button>
        </template>
        <template slot="onlineStatus" slot-scope="status">
            <label :style="{color: status == 1 ? '#19be6b' : '#ed4014'}">{{status == 1 ? '在线' : '离线'}}</label>
        </template>
        <template slot="cloudVideotape" slot-scope="status">
            <label>{{status == 1 ? '已开启' : '未开启'}}</label>
        </template>
        <template slot="imageView" slot-scope="text">
            <a-popover v-if="text.image != null"  placement="left">
              <template slot="content">
                 <h5 v-text="'通道' + text.code + ':' + text.name"/>
                 <a-card hoverable :bodyStyle="{padding:0,margin:0}"  style="width:300px; height: 200px;">
                    <img
                      slot="cover"
                      style="height: 200px; max-width: 300px;"
                      :src="text.image"
                    />
                 </a-card>
              </template>
              <!-- <img :src="text.image == null ? '@/assets/img/logo.png' : text.image" style="width: 50px; max-height: 30px;" /> -->
              <img style="width: 50px; max-height: 30px;" :src="text.image"/>
            </a-popover>
            <img v-if="text.image == null" style="width: 50px; max-height: 30px;" src="@/assets/img/no_img.png"/>
        </template>
      </a-table>
      <!--引入组件 -->
      <player-model ref="playerModelRef"/>
    </a-card>
  </div>
</template>

<script>
const columns = [
   {
    title: '通道号',
    width: 100,
    align: 'center',
    dataIndex: 'no'
  },
  {
    title: '通道国际编号',
    width: 220,
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '通道名称',
    width: 200,
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '在线状态',
    width: 100,
    align: 'center',
    dataIndex: 'status',
    scopedSlots: { customRender: 'onlineStatus' },
  },
  {
    title: '快照',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'imageView' },
  },
  {
    title: '云端录像',
    align: 'center',
    width: 100,
    dataIndex: 'cloudVideotape',
    scopedSlots: { customRender: 'cloudVideotape' },
  },

  {
    title: '在线人数',
    width: 100,
    align: 'center',
    dataIndex: 'viewers',
  },
  {
    title: '子节点数',
    align: 'center',
    width: 100,
    dataIndex: 'secret',
  },
  {
    title: '厂家',
    align: 'center',
    dataIndex: 'manufacturer',
  },
  {
    title: '播放',
    fixed: 'right',
    align: 'center',
    width: 60,
    scopedSlots: { customRender: 'play' },
  },
  {
    title: '播放',
    fixed: 'right',
    align: 'center',
    width: 60,
    scopedSlots: { customRender: 'stop' },
  },
  {
    title: '录像',
    fixed: 'right',
    align: 'center',
    width: 60,
    scopedSlots: { customRender: 'tape' },
  }
]
import {mapState} from 'vuex'
import {deviceChannelList} from '@/services/device'
import PlayerModel from '../components/PlayerModel'
export default {
  name: 'device_channel',
  components: {
    'player-model': PlayerModel
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
  data () {
    return {
      searchParams: {
        deviceId: null,
        channelId: null,
        pageSize: 10,
        pageNo: 1
      },
      searchStatus: 'all',
      searchType: 'all',
      columns,
      dataSource: {total: 0, data: []}
    }
  },
  methods: {
    onSearch () {
      this.loadData()
    },
    loadData () {
      deviceChannelList(this.searchParams).then(res => {
        let data = res.data
        if (data.code == this.SUCCESS) {
          this.dataSource = {total: data.data.total, data: data.data.list}
        } else {
          this.dataSource = {total: 0, data: []}
        }
        console.log(this.dataSource)
      })
    },
    player (channel) {
      let play = this.$refs.playerModelRef
      play.openPlayerModel(channel)
    },
    stopPlayer (channel) {
      console.log(channel)
    }
  },
  mounted () {
    let deviceId =  this.$route.query.deviceId
    this.searchParams.deviceId = deviceId
    this.loadData()
  }
}
</script>