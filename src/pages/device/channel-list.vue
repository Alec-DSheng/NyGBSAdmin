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
          <a-input-search style="width: 300px;" size="default" placeholder="关键字" enter-button @search="onSearch" />
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1400 }" size="middle"  bordered>
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
          <a-button  type="link"> <a-icon style="fontSize:18px" type="pause-circle" /> </a-button>
        </template>
        <template slot="onlineStatus" slot-scope="status">
            <label :style="{color: status == 1 ? '#19be6b' : '#ed4014'}">{{status == 1 ? '在线' : '离线'}}</label>
        </template>
        <template slot="cloudVideotape" slot-scope="status">
            <label>{{status == 1 ? '已开启' : '未开启'}}</label>
        </template>
        <template slot="imageView" slot-scope="text">
            <a-popover placement="left">
              <template slot="content">
                 <h5 v-text="'通道' + text.key + ':' + text.name"/>
                 <a-card hoverable :bodyStyle="{padding:0,margin:0}"  style="width:300px; height: 200px;">
                    <img
                      slot="cover"
                      style="height: 200px; max-width: 300px;"
                      :src="text.image"
                    />
                 </a-card>
              </template>
              <img :src="text.image" style="width: 50px; max-height: 30px;" />
            </a-popover>
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
    dataIndex: 'key'
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
    dataIndex: 'onlineNum',
  },
  {
    title: '子节点数',
    align: 'center',
    dataIndex: 'childNodes',
  },
  {
    title: '厂家',
    width: 200,
    align: 'center',
    dataIndex: 'manufactor',
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
];
const data = [
  {
    key: 1,
    code: '34020000001320000001',
    name: '公园跑道212',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 2,
     code: '34020000001320000005',
    name: '公园跑道3331',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 3,
    code: '34020000001320000006',
    name: '公园跑道ddsa',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 4,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 5,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 6,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 7,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 8,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 9,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  },
  {
    key: 10,
    code: '34020000001320000003',
    name: '公园跑道',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606332134022&di=d13a637e72f1385f2da17939b8a69b28&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm7%2FM04%2F16%2F78%2FwKhQo1UQKuyEIO2XAAAAAHP6OFo489.jpg..180x180.jpg',
    status: 1,
    cloudVideotape: 1,
    onlineNum: 21,
    channelNum: 3,
    childNodes: 0,
    manufactor: '海康威视'
  }
];
import {mapState} from 'vuex'
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
      searchStatus: 'all',
      searchType: 'all',
      data,
      columns,
    }
  },
  methods: {
    onSearch () {

    },
    player (channel) {
      let play = this.$refs.playerModelRef
      channel.streamCode = '0BEBC7FD'
      play.openPlayerModel(channel)
    }
  }
}
</script>