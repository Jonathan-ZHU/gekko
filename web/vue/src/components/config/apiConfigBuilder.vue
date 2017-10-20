<template lang='jade'>
.grd.contain
  h3 增加 API key
  p 确保API密钥具有创建和取消订单和查看余额的权限。
  .grd-row
    .grd-row-col-3-6.mx1
      h3 交易所
      exchange-picker.contain(v-on:exchange='updateExchange', only-tradable='true')
    .grd-row-col-3-6.mx1
      h3 证书
      template(v-for='cred in requires')
        label {{ cred }}
        input(v-model='credentials[cred]')
  .txt--center
    a.w100--s.my1.btn--blue(href='#', v-on:click.prevent='upload') 增加
</template>

<script>

import exchangePicker from '../global/configbuilder/exchangepicker.vue'
import _ from 'lodash'
import { post } from '../../tools/ajax';

export default {
  data: () => {
    return {
      exchange: false,
      credentials: {}
    }
  },
  components: {
    exchangePicker
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys;
    },
    exchanges: function() {
      return this.$store.state.exchanges;
    },
    requires: function() {
      if(!this.exchanges)
        return [];

      if(!this.exchange)
        return [];

      return this.exchanges[this.exchange].requires;
    },
    config: function() {
      let config = {
        exchange: this.exchange,
        values: this.credentials
      };

      return config;
    }
  },
  watch: {
    credentials: function() {
      this.emitConfig();
    }
  },
  methods: {
    updateExchange: function(exchange) {
      this.credentials = {};
      this.exchange = exchange;
      this.emitConfig();
    },
    emitConfig: function() {
      this.$emit('config', this.config);
    },
    upload: function() {

      let exchange = this.config.exchange;

      if(
        this.exchanges &&
        this.apiKeySets.includes(exchange) &&
        !confirm(`You already have API keys for ${exchange} defined, do you want to overwrite them?`)
      )
          return;

      post('addApiKey', this.config, (error, response) => {
        if(error)
          return alert(error);

        this.credentials = {};
      });
    }
  }
}
</script>

<style>
</style>
