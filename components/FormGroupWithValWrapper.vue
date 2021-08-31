<template>
  <div class="form-group" :class="{ hasError: hasErrors, hasSuccess: isValid }">
    <div class="label">
      {{ label }}
    </div>
    <div class="control">
      <slot :validator="preferredValidator"/>
    </div>
    <div class="control-helper text-red mt-4 text-sm" v-if="hasErrors">
      <div v-for="error in activeErrorMessages" :key="error">{{ error }}</div>
    </div>
  </div>  
</template>
<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";

export default {
  mixins: [singleErrorExtractorMixin]
};
</script>
