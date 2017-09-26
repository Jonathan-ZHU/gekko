<template lang='jade'>
.grd-row-col-3-6
  table.p1
    tr
      th 交易次数
      td {{ report.trades }}
    tr
      th 锐度比
      td {{ round2(report.sharpe) }}
    tr
      th 起始资金
      td {{ round(report.startBalance) }} {{ report.currency }}
    tr
      th 最终资金
      td {{ round(report.balance) }} {{ report.currency }}
    tr
      th 合计利润

  .big.txt--right.price(:class='profitClass') {{ round(report.relativeProfit) }}%

</template>

<script>

export default {
  props: ['report'],
  methods: {
    round2: n => (+n).toFixed(2),
    round: n => (+n).toFixed(5)
  },
  computed: {
    profitClass: function() {
      if(this.report.relativeProfit > 0)
        return 'profit'
      else
        return 'loss'
    }
  }
}
</script>

<style>
.summary td {
  text-align: right;
}

.big {
  font-size: 1.3em;
  width: 80%;
}

.summary table {
  width: 80%;
}

.price.profit {
  color: #7FFF00;
}

.price.loss {
  color: red;
}

</style>
