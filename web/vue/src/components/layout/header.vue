<template lang='jade'>
  div
    #top
    header.bg--off-white.grd
      .contain.grd-row
        .col-2
          img(src='/assets/logo.png')
    nav.bg--light-gray
      .menu.contain
        router-link(to='/home').py1 主页
        router-link(to='/live-gekkos').py1 实时活动
        router-link(to='/backtest').py1 回溯测试
        router-link(to='/data').py1 本地数据
        router-link(to='/config').py1 注册
        a(href='https://gekko.wizb.it/docs/introduction/about_gekko.html', target='_blank').py1 文档

</template>

<script>
export default {}
</script>

<style>
.col-2 img{
  width:25%;
}

h3 {
display:inline-block;
}

.menu {
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 2rem;
}

.menu a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.menu .router-link-active {
  background-color: rgba(250,250,250,.99);
}

.menu a:hover {
  text-decoration: underline;
}

</style>
