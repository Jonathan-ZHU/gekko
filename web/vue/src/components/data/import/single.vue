<template lang='jade'>
  div.contain.my2
    div(v-if='data && !data.done')
      h2 正在导入数据...
      p Market: {{ data.watch.exchange }}:{{ data.watch.currency }}/{{ data.watch.asset }}
      .grd
        .grd-row
          .grd-row-col-2-6 From:
          .grd-row-col-4-6 {{ fmt(from) }}
        .grd-row
          .grd-row-col-2-6 To:
          .grd-row-col-4-6 {{ fmt(to) }}
        .grd-row(v-if='initialized')
          .grd-row-col-2-6 Imported data until:
          .grd-row-col-4-6 {{ fmt(latest) }}
        .grd-row(v-if='initialized')
          .grd-row-col-2-6 To go:
          .grd-row-col-4-6 {{ fromEnd }}
      spinner(v-if='!initialized')
      .contain(v-if='initialized')
        progressBar(:progress='progress')
      p
        em (您不需要等待导入过程结束,
          | 您已经开始了
          router-link(to='/backtest') 回溯测试
          | ).
    div(v-if='data && data.done').txt--center
      h2 导入完成
      p
        | 用数据
        router-link(to='/backtest') 进行回溯测试
        |  吧！
    div(v-if='!data').txt--center
      h2 ERROR: 未知导入
      p
        我并不知道该导入
</template>

<script>

import _ from 'lodash';
import progressBar from '../../global/progressBar.vue'
import spinner from '../../global/blockSpinner.vue'

export default {
  components: {
    progressBar,
    spinner
  },
  computed: {
    data: function() {
      return _.find(
        this.$store.state.imports,
        { id: this.$route.params.id }
      );
    },
    initialized: function() {
      if(this.data && this.latest.isValid())
        return true
    },
    latest: function() {
      if(this.data)
        return this.mom(this.data.latest);
    },
    fromEndMs: function() {
      if(this.data)
        return this.to.diff(this.latest);
    },
    fromEnd: function() {
      if(!this.latest)
        return 'LOADING'

      return humanizeDuration(this.fromEndMs);
    },
    from: function() {
      if(this.data)
        return this.mom(this.data.from)
    },
    to: function() {
      if(this.data)
        return this.mom(this.data.to)
    },
    timespan: function() {
      if(this.data)
        return this.to.diff(this.from)
    },
    progress: function() {
      if(!this.data)
        return;

      const current = this.timespan - this.fromEndMs;
      return 100 * current / this.timespan;
    }
  },
  methods: {
    fmt: mom => { return mom.format('YYYY-MM-DD HH:mm:ss') },
    mom: str => moment.utc(str)
  }
}
</script>

<style>
</style>
