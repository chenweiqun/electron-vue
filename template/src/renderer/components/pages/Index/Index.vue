<template lang="pug">
  .Index.full-height.flex-center.flex-column
    img(:src="icon", width="100px", height="100px")
    div.mt2(style="font-size: 15px") {{name}}
    div.mt1(style="font-size: 15px") v{{version}}
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
      version: appInfo.getVersion()
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
