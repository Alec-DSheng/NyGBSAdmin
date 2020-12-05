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
      <a-table :columns="columns" :data-source="dataSource.data" :scroll="{ x: 1250 }" 
                rowKey="ID"
                size="middle"  bordered 
                :pagination="{
                  pageSizeOptions: ['10', '20', '30', '40', '50'],
                  showSizeChanger: true,
                  showTotal: function () {
                    return '共 ' + dataSource.total + '条'
                  }
                }"
                >
        <template slot="scan" slot-scope="text">
            <a-button v-if="text.Online" type="link" size="small" @click="$router.push({path: 'device/channel', query: {deviceId: text.ID}})"> <a-icon type="eye" /> </a-button>
        </template>
        <template slot="refresh" slot-scope="text">
          <a-button v-if="text.Online" type="link" size="small"> <a-icon  type="sync" /> </a-button>
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
    dataIndex: 'ID'
  },
  {
    title: '名称',
    width: 200,
    align: 'center',
    dataIndex: 'Name',
  },
  {
    title: '传输模式',
    width: 100,
    align: 'center',
    dataIndex: 'MediaTransport',
  },
  {
    title: '通道数',
    align: 'center',
    dataIndex: 'ChannelCount',
  },
  {
    title: '在线状态',
    width: 100,
    align: 'center',
    dataIndex: 'Online',
    scopedSlots: { customRender: 'onlineStatus' },
  },
  {
    title: 'IP',
    width: 160,
    align: 'center',
    dataIndex: 'RemoteIP',
  },
  {
    title: '端口',
    align: 'center',
    dataIndex: 'RemotePort',
  },
  // {
  //   title: '创建时间',
  //   width: 200,
  //   align: 'center',
  //   dataIndex: 'createTime',
  // },
  // {
  //   title: '更新时间',
  //   width: 200,
  //   align: 'center',
  //   dataIndex: 'updateTime',
  // },
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
import {mapState} from 'vuex'
import {deviceList} from '@/services/device'
export default {
  name: 'device',
  data () {
    return {
      searchStatus: 'all',
      columns,
      searchParams: {
        pageNo: 1,
        pageSize: 10
      },
      dataSource: {}
    }
  },
  methods: {
    onSearch () {
      this.loadData()
    },
    loadData () {
      deviceList(this.searchParams).then(res => {
        let data = res.data
        this.dataSource = {total: data.DeviceCount, data: data.DeviceList}
        console.log(this.dataSource)
      })
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>

</style>