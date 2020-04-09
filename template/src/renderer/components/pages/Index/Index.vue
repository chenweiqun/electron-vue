<template lang="pug">
  .Index.flex-center.flex-column(style="height: 100vh")
    img(:src="icon", width="100px", height="100px")
    div.mt2(style="font-size: 15px") {{name}}
    div.mt1(style="font-size: 15px") v{{appVersion}}
</template>

<script>

import appInfo from 'src/utils/appInfo'
export default {
  name: 'Index',
  props: {

  },
  data () {
    return {
      icon: appInfo.getIcon(),
      name: appInfo.getName(),
      appVersion: appInfo.getVersion()
    }
  },
  mounted () {

  },
  methods: {

  },
  computed: {
  },
  components: {

  }
}
</script>

<style scoped>

</style>
