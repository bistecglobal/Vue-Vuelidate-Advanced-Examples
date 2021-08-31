<template>
  <base-errors v-bind="$attrs">
    <div class="text-red" slot-scope="{ errorMessage }">{{ errorMessage }}</div>
  </base-errors>
</template>
<script>
import { templates } from "vuelidate-error-extractor";
export default {
  inheritAttrs: false,
  components: {
    baseErrors: templates.multiErrorExtractor.baseMultiErrorExtractor
  }
};
</script>