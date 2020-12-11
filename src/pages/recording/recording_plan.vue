<template>
    <div>
       <a-card :bordered="false" :bodyStyle="{textALign: 'left', paddingTop: '5px'}" :style="{width: '100%', minHeight: pageMinHeight + 68 + 'px'}">
          <h4 slot="title" style="text-align:center;color:#f5222d;margin:0;">录像计划</h4>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item
              label="配置方式"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
                <a-radio-button value="horizontal">
                  单个配置
                </a-radio-button>
                <a-radio-button value="vertical">
                  批量配置
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="当前通道"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
                <label style="color:#f5222d;font-size:16px;">通道 1 </label>
            </a-form-item>
            <a-form-item
              label="编辑通道"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
               <a-input-number  :min="1" :max="10" style="width: 180px;" />
            </a-form-item>
            <a-form-item
              label="录像保留(天)"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
               <a-input-number  :min="1" :max="10" style="width: 180px;"  />
            </a-form-item>
            <a-form-item
              label="录像时段"
              style="width: 100%;"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
                <div style="white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
                    <a-card :bordered="false" :bodyStyle="{width: '1280px', padding: '0px', margin: '0px', border: 'none'}">
                      <a-card-grid  style="width:80px;height: 30px; min-height: 2px;   padding: 5px 0;text-align: center; background-color: #f5222d;color:#fff;">
                        通道001
                      </a-card-grid>
                     <a-card-grid  v-for="t in planData" :key="t.td" style="width:50px;height: 30px; min-height: 2px; 
                          padding: 5px 0;text-align: center; background-color: #f5222d;color:#fff;">
                        {{t.td}}
                      </a-card-grid>
                      <div v-for="w in timeData" :key="w.id">
                        <a-card-grid  style="width:80px;height: 30px; min-height: 2px; border:none; padding: 5px 0;text-align: center; background-color: #f5222d;color:#fff;border: none;">
                            {{w.name}}
                        </a-card-grid>
                        <a-card-grid :bordered="false" :hoverable="false" v-for="t in planData" :key="t.td" style="width:50px;height: 30px;border:none; min-height: 2px; border: 0px solid blue;
                              padding: 5px 0;text-align: center; background-color: #f5222d;color:#fff;">
                         
                        </a-card-grid>
                  
                      </div>
                    </a-card>
                </div>
                <!-- <a-card :bodyStyle="{width: '1400px',padding: 0, margin: 0}">
                   <a-card-grid style="width:100px;text-align:center;height: 5px;">
                    
                  </a-card-grid>
                  <a-card-grid v-for="td in planData" :key="td.td" style="width: 50px;text-align:center;height: 5px;">
                    
                  </a-card-grid>
                </a-card> -->
                  <!-- <a-row type="flex" style="width: 1180px; border: 1px solid red;">
                    <a-col :span="1" :order="4" style="border: 1px solid red;">
                      1 col-order-4
                    </a-col>
                    <a-col :span="1" :order="3">
                      2 col-order-1
                    </a-col>
                    <a-col :span="1" :order="2">
                      3 col-order-2
                    </a-col>
                    <a-col :span="1" :order="1">
                      4 col-order-1
                    </a-col>
                  </a-row> -->
            </a-form-item>
          </a-form>
       </a-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'RecordingPlan',
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  },
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 22 },
        },
      },
      planData: [],
      timeData: []
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'plan' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleFormLayoutChange (e) {
      this.formLayout = e.target.value;
    }
  },
  mounted () {
    for(var i = 0; i< 24; i ++) {
      this.planData.push({td: i + '时'})
    }
    let week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    for(var j = 1; j<= 7; j ++) {
      this.timeData.push({id: j, name: week[j -1]})
    }
  }
}
</script>

<style>

</style>