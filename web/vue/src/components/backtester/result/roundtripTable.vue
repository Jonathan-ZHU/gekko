<template lang='jade'>
  .contain.roundtrips
    h2 交易记录
    table(v-if='roundtrips.length')
      thead
        tr
          th Entry at
          th Exit at
          th Exposure
          th Entry balance
          th Exit balance
          th P&amp;L
          th Profit
        tr(v-for='rt in roundtrips')
          td {{ fmt(rt.entryAt) }}
          td {{ fmt(rt.exitAt) }}
          td {{ diff(rt.duration) }}
          td {{ round(rt.entryBalance) }}
          td {{ round(rt.exitBalance) }}
          template(v-if="Math.sign(rt.pnl)===-1")
            td.loss {{ Math.sign(rt.pnl)*rt.pnl.toFixed(2) }}
            td.loss {{ rt.profit.toFixed(2) }}%
          template(v-else)
            td.profit {{ rt.pnl.toFixed(2) }}
            td.profit {{ rt.profit.toFixed(2) }}%
    div(v-if='!roundtrips.length')
      p 没有足够的数据可供展示
</template>

<script>
export default {
  props: ['roundtrips'],
  data: () => {
    return {}
  },
  methods: {
    diff: n => moment.duration(n).humanize(),
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
  },
}
</script>

<style>

.roundtrips {
  margin-top: 50px;
  margin-bottom: 50px;
}

.roundtrips table {
  width: 100%;
}

.roundtrips table th,
.roundtrips table td {
  border: 1px solid #c6cbd1;
  padding: 8px 12px;
}

.roundtrips table td.loss {
  color: #e06c75;
  text-align: right;
}
.roundtrips table td.profit {
  color: #98c379;
  text-align: right;
}

.roundtrips table tr:nth-child(2n) {
  background-color: #1B1D23;
}

</style>
