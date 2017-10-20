<template lang='jade'>
  .contain
    .text(v-html='intro')
    .hr
    h2 可用数据
    .txt--center.my2(v-if='datasetScanstate === "idle"')
      a.w100--s.btn--blue.scan-btn(href='#', v-on:click.prevent='scan') 扫描可用数据
    .txt--center.my2(v-if='datasetScanstate === "scanning"')
      spinner
    .my2(v-if='datasetScanstate === "scanned"')
      .bg--orange.warning.p1.warning.my1(v-if='unscannableMakets.length')
        p.clickable(v-if='!viewUnscannable', v-on:click.prevent='toggleUnscannable') 部分市场数据无法获取，点击此处查看详情
        template(v-if='viewUnscannable')
          p Unable to find datasets in the following markets:
          .mx2(v-for='market in unscannableMakets')
            | - {{ market.exchange }}:{{ market.currency }}:{{ market.asset }}
      template(v-if='datasets.length')
        table.full.data
          thead
            tr
              th exchange
              th currency
              th asset
              th from
              th to
              th duration
          tbody
            tr(v-for='set in datasets')
              td {{ set.exchange }}
              td {{ set.currency }}
              td {{ set.asset }}
              td {{ fmt(set.from) }}
              td {{ fmt(set.to) }}
              td {{ humanizeDuration(set.to.diff(set.from)) }}
      template(v-if='!datasets.length')
        p It looks like you don't have any local data yet.
    .my2
      h2 导入更多数据
      p.text 您可以使用进口商直接从交易所导入更多的市场数据。
      router-link(to='/data/importer') 去导入数据！
</template>

<script>

import spinner from '../global/blockSpinner.vue'
import marked from '../../tools/marked'
import dataset from '../global/mixins/dataset'
// global moment
// global humanizeDuration

let intro = marked(`

## 本地数据

Scout需要本地市场数据才能进行回测策略。本地的
数据也可以在运行策略预热期间使用

`);

export default {
  mixins: [ dataset ],
  components: {
    spinner
  },
  data: () => {
    return {
      intro,
      viewUnscannable: false
    }
  },
  methods: {
    toggleUnscannable: function() { this.viewUnscannable = true },
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => mom.format('YYYY-MM-DD HH:mm'),
  }
}
</script>

<style>

.warning{
  background-color: orange;
  color: #fff;
  border-radius: 4px;
}

.clickable {
  cursor: pointer;
}

table.full {
  width: 100%;
}

table.full td {
  padding: 0.5rem 0;
}

table.full.data th {
  text-align: center;
}

.warning p {
  margin: 0;
  padding: 0;
}
</style>
