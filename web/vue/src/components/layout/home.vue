<template lang='jade'>
  section.contain.grd-row
    .grd-row-col-3-6(v-html='left')
    .grd-row-col-3-6.txt--center
      img(src='/assets/me.jpg')
      p
        em Do Something Awesome
</template>

<script>
import marked from '../../tools/marked';

const left = marked(`

## Scout

Scout 是基于 Gekko 的一个比特币交易机器人和回测平台。
连接到世界范围内流行的比特币交易所。由 Tiny Calf 团队进行二次扩展开发，使用 JavaScript 并在 npm 上运行。

[了解 Gekko](https://gekko.wizb.it/)<br>
[了解 Tiny Calf](https://www.tiny-calf.com/)

*Scout 100% 开源免费*

`);

export default {
  data: () => {
    return {
      left
    }
  }
}
</script>

<style scoped>
  img {
    width:300px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 1);
    border-radius: 16px;
  }
</style>
