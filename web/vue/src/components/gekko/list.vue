<template lang='jade'>
  .contain.py2
    .text(v-html='text')
    .hr
    h3 市场监控
    .text(v-if='!watchers.length')
      p 您现在没有执行任何市场监控
    table.full.clickable(v-if='watchers.length')
      thead
        tr
          th 交易所
          th 货币
          th 资产
          th 起始于
          th 最近更新
          th 持续时间
      tbody
        tr.clickable(v-for='gekko in watchers', v-on:click='$router.push({path: `live-gekkos/watcher/${gekko.id}`})')
          td {{ gekko.watch.exchange }}
          td {{ gekko.watch.currency }}
          td {{ gekko.watch.asset }}
          td
            template(v-if='gekko.firstCandle') {{ fmt(gekko.firstCandle.start) }}
          td
            template(v-if='gekko.lastCandle') {{ fmt(gekko.lastCandle.start) }}
          td
            template(v-if='gekko.firstCandle && gekko.lastCandle') {{ timespan(gekko.lastCandle.start, gekko.firstCandle.start) }}
    h3 在线策略
    .text(v-if='!stratrunners.length')
      p 您还没有运行任何策略
    table.full(v-if='stratrunners.length')
      thead
        tr
          th 交易所
          th 货币
          th 资产
          th 最近更新
          th 持续时间
          th 策略
          th 利润
      tbody
        tr.clickable(v-for='gekko in stratrunners', v-on:click='$router.push({path: `live-gekkos/stratrunner/${gekko.id}`})')
          td {{ gekko.watch.exchange }}
          td {{ gekko.watch.currency }}
          td {{ gekko.watch.asset }}
          td
            template(v-if='gekko.lastCandle') {{ fmt(gekko.lastCandle.start) }}
          td
            template(v-if='gekko.firstCandle && gekko.lastCandle') {{ timespan(gekko.lastCandle.start, gekko.firstCandle.start) }}
          td {{ gekko.strat.name }}
          td
            template(v-if='!gekko.report') 0
            template(v-if='gekko.report') {{ round(gekko.report.profit) }} {{ gekko.watch.currency }}
    .hr
    h2 创建一个新的 Live Scout
    router-link(to='/live-gekkos/new') 创建一个新的 Live Scout!
</template>

<script>

import marked from '../../tools/marked'
// global moment
// global humanizeDuration

const text = marked(`

## Live Scout

在真实交易所中运行您的策略！

`);

export default {
  data: () => {
    return {
      text
    }
  },
  created: function() {
    this.timer = setInterval(() => {
      this.now = moment();
    }, 1000)
  },
  destroyed: function() {
    clearTimeout(this.timer);
  },
  data: () => {
    return {
      text,
      timer: false,
      now: moment()
    }
  },
  computed: {
    stratrunners: function() {
      return this.$store.state.stratrunners
    },
    watchers: function() {
      return this.$store.state.watchers
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),
    moment: mom => moment.utc(mom),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
    timespan: function(a, b) {
      return this.humanizeDuration(this.moment(a).diff(this.moment(b)))
    }
  }
}
</script>

<style>
table.clickable {
  border-collapse: separate;
}

tr.clickable td:nth-child(1) {
  padding-left: 5px;
}

tr.clickable {
  cursor: pointer;
}
tr.clickable:hover {
  background: rgba(216,216,216,.99);
}
</style>
