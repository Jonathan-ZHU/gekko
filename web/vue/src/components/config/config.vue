<template lang='jade'>
div.contain
  h2 注册交易所
  .hr
  h3 可用 API keys
  p(v-if='!apiKeySets.length')
    em 您还没有注册任何 API keys.
  ul
    li(v-for='exchange in apiKeySets') {{ exchange }} (
      a(href='#', v-on:click.prevent='removeApiKey(exchange)') 移除
      | )
  a(href='#', v-if='!addApiToggle', v-on:click.prevent='openAddApi') 增加一个 API key
  template(v-if='addApiToggle')
    .hr
    apiConfigBuilder
  .hr

</template>

<script>
import apiConfigBuilder from './apiConfigBuilder.vue';
import { post } from '../../tools/ajax';

export default {
  components: {
    apiConfigBuilder
  },
  data: () => {
    return {
      addApiToggle: false,
    }
  },
  methods: {
    openAddApi: function() {
      this.addApiToggle = true;
    },
    removeApiKey: function(exchange) {
      if(!confirm('Are you sure you want to delete these API keys?'))
        return;

      post('removeApiKey', {exchange}, (error, response) => {
        if(error)
          return alert(error);
      });
    }
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys
    }
  },
  watch: {
    apiKeySets: function() {
      this.addApiToggle = false;
    }
  }
}
</script>
