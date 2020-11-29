<template>
  <div>
    <a-card :bordered="false"  :style="{width: '100%', minHeight: pageMinHeight + 68 + 'px'}">
      <a-row  slot="title">
        <a-col :span="12">
          <a-select
            v-model="searchStatus"
            enter-button
            size="default"
            style="width: 300px"
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
        </a-col>
        <a-col :span="12" style="text-align: right;">
          <a-input-search style="width: 300px;"  size="default" placeholder="关键字" enter-button @search="onSearch" />
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1650 }" size="middle"  bordered>
        <template slot="scan" slot-scope="text">
            <a-button v-if="text.status == 1" type="link" size="small" @click="$router.push({path: 'device/channel', params: {channelId: text.id}})"> <a-icon type="eye" /> </a-button>
        </template>
        <template slot="refresh" slot-scope="text">
          <a-button v-if="text.status == 1" type="link" size="small"> <a-icon  type="sync" /> </a-button>
        </template>
        <template slot="onlineStatus" slot-scope="status">
            <label :style="{color: status == 1 ? '#19be6b' : '#ed4014'}">{{status == 1 ? '在线' : '离线'}}</label>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: '设备国际编号',
    width: 260,
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '名称',
    width: 200,
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '传输模式',
    width: 100,
    align: 'center',
    dataIndex: 'transport',
  },
  {
    title: '通道数',
    align: 'center',
    dataIndex: 'channelNum',
  },
  {
    title: '在线状态',
    width: 100,
    align: 'center',
    dataIndex: 'status',
    scopedSlots: { customRender: 'onlineStatus' },
  },
  {
    title: 'IP',
    width: 160,
    align: 'center',
    dataIndex: 'ip',
  },
  {
    title: '端口',
    align: 'center',
    dataIndex: 'port',
  },
  {
    title: '创建时间',
    width: 200,
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    width: 200,
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '查看通道',
    fixed: 'right',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'scan' },
  },
  {
    title: '更新通道',
    fixed: 'right',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'refresh' },
  }
];

const data = [
  {
    key: 1,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 2,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 0,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 3,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 4,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 0,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 5,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 6,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 7,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 0,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 8,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 9,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 0,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  },
  {
    key: 10,
    code: '34020000001320000003',
    name: '公园跑道',
    transport: 'TCP',
    status: 1,
    ip: '221.213.222.21',
    port: 5060,
    channelNum: 3,
    createTime: '2020-12-21 00:00:00',
    updateTime: '2020-12-21 00:00:00'
  }
];
import {mapState} from 'vuex'
export default {
  name: 'device',
  data () {
    return {
      searchStatus: 'all',
      data,
      columns,
    }
  },
  methods: {
    onSearch () {

    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
}
</script>

<style>

</style>