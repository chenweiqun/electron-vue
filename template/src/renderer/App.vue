<template lang="pug">
  div
    {{#isEnabled plugins 'vue-router'}}
    router-view
    {{else}}
    <Index></Index>
    {{/isEnabled}}
</template>

<script>
{{#isEnabled plugins 'vue-router'}}
{{else}}
  import Index from 'pages/Index/Index'

{{/isEnabled}}
  export default {
    name: '{{ name }}'{{#isEnabled plugins 'vue-router'}}{{else}},{{/isEnabled}}
{{#isEnabled plugins 'vue-router'}}
{{else}}
    components: {
      Index
    }
{{/isEnabled}}
  }
</script>

<style>
  /* CSS */
</style>
