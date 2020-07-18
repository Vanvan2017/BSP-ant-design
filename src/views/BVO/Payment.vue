<script>/* eslint-disable */</script>
<template>
  <div style="width: 30vw; margin-left: 27vw; margin-top: 10vh;">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="Receiver">
      <a-input
        v-decorator="['reveicer', { rules: [{ required: true, message: 'Please input the receiver name!' }] }]"
        placeholder="Please input the receiver name"
      />
    </a-form-item>
    <a-form-item label="Ship To">
      <a-input
        v-decorator="['shipTo', { rules: [{ required: true, message: 'Please input ship address!' }] }]"
        placeholder="Please input the ship address"
      />
    </a-form-item>
    <a-form-item label="State">
      <a-select
        v-decorator="[
          'state',
          { rules: [{ required: true, message: 'Please select your state!' }] },
        ]"
        placeholder="Please select an option"
        @change="handleSelectChange"
      >
        <a-select-option value="aaa">
          aaa
        </a-select-option>
        <a-select-option value="bbb">
          bbb
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="City">
      <a-select
        v-decorator="[
          'city',
          { rules: [{ required: true, message: 'Please select your city!' }] },
        ]"
        placeholder="Please select an option"
        @change="handleSelectChange"
      >
        <a-select-option value="aaa">
          aaa
        </a-select-option>
        <a-select-option value="bbb">
          bbb
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Quantity">
      <a-input
        v-decorator="['quantity', { rules: [{ required: true, message: 'Please input item quantity!' }] }]"
        placeholder="Please input item quantity"
      />
    </a-form-item>
    <a-form-item label="Mobile">
      <a-input
        v-decorator="['mobile', { rules: [{ required: true, message: 'Please input your mobile number!' }] }]"
        placeholder="Please input mobile number"
      />
    </a-form-item>
    <a-form-item label="ZIP code">
      <a-input
        v-decorator="['ZIPCode', { rules: [{ required: true, message: 'Please input your ZIP code!' }] }]"
        placeholder="Please input ZIP code"
      />
    </a-form-item>
    <a-form-item label="Shipment Method">
          <a-radio-group v-decorator="['radio-group']">
            <a-radio value="a">
              2-5days $10
            </a-radio>
            <a-radio value="b">
              5-10days $5
            </a-radio>
          </a-radio-group>
        </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="margin-left: 6vw;">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
    <a-modal v-model="visible" title="Payment" on-ok="handleOk" >
          <template slot="footer">
            <a-row>
                  <a-col :span="7">
                    
                  </a-col>
                  <a-col :span="2">
                    <a-button key="back" @click="handleCancel">
                      Return
                    </a-button>
                  </a-col>
                  <a-col :span="5">
                   
                  </a-col>
                  <a-col :span="2">
                    <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                      Submit
                    </a-button>
                  </a-col>
                  <a-col :span="8">
                   
                  </a-col>
            </a-row>
          </template>
          Total:${{money}}<br/><br/>
          <a-radio-group v-model="value" @change="onChange">
              <a-radio :style="radioStyle" :value="1">
                <img src="/src/views/BVO/icons/paypal.png"></img>My Wallet
              </a-radio><br/>
              Account Balance:${{balance}}
              <a-radio :style="radioStyle" :value="2">
                <img src="/src/views/BVO/icons/gmc.png"></img>Paypal
              </a-radio><br/>
              Total amount you should pay include payment processing fee:${{fee}}
            </a-radio-group>
        </a-modal>
  </a-form>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data() {
    return {
      visible: true,
      value: 1,
      money:12121,
      loading: false,
      balance:6775,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      radioStyle: {
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            },
    };
  },
  methods: {
    onChange(e) {
          console.log('radio checked', e.target.value);
        },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.visible = true;
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  computed:{
    fee:function(){
      return this.money/10;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
