<template>
  <a-row type="flex" :style="`height: ${pageMinHeight + 60}px`">
    <a-col flex="300px">
         <a-card
            style="width:100%;height:100%;"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key => onTabChange(key, 'key')"
          >
            {{ contentList[key] }}
          </a-card>
    </a-col>
    <a-col flex="auto">
       <a-card  style="width:100%;height:100%;">
          <div slot="title">2</div>
          <div></div>
       </a-card>
    </a-col>
  </a-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
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
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'article',
        },
        {
          key: 'app',
          tab: 'app',
        },
        {
          key: 'project',
          tab: 'project',
        },
      ],
      key: 'tab1',
      noTitleKey: 'app',
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
  },
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  }
}
</script>

<style>
 html body{
   height: 100%;
 }
</style>