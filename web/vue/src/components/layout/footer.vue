<template lang='jade'>
  footer.p2.bg--off-white
    .contain
      p
        em 使用 Scout 风险自负。
      p 基于 Gekko v{{ version.gekko }} 和 Gekko UI v{{ version.ui }}.
</template>

<script>
const gekkoPackage = require('../../../../../package.json');
const uiPackage = require('../../../package.json');

export default {
  data: () => {
    return {
      version: {
        gekko: gekkoPackage.version,
        ui: uiPackage.version
      }
    }
  }
}
</script>
