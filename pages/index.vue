<template>
 <div id="app">
   <h2>Basic Validation</h2>
   <BasicValidation/>
<br>
    <h2>Custom Validation</h2>
   <CustomValidation/>
   <br>
  <h2>Dynamic Rules</h2>
  <DynamicRules/>

   <br>
  <h2>Child Validation</h2>
<ChildValidation/>

 <h2>Child Validation  With Error</h2>
<ChildValidationWithErr/>

<h2>Child Validation  With Vuelidate-Error-Extractor / Custom error extractor with Validation Summary</h2>
<ChildValidationWithErrExtractor/>

<h2> Child Validation by reducing boilerplate code </h2>
<ChildValidationWithExtWrapper/> 
 </div>
</template>

<script>
import BasicValidation from "~/components/BasicValidation.vue";
import CustomValidation from "~/components/CustomValidation.vue";
import DynamicRules from "~/components/DynamicRules.vue";
import ChildValidation from "~/components/ChildValidation.vue";
import ChildValidationWithErr from "~/components/ChildValidationWithErr.vue";
import ChildValidationWithErrExtractor from "~/components/ChildValidationWithErrExtractor.vue";
import ChildValidationWithExtWrapper from "~/components/ChildValidationWithExtWrapper.vue";

export default {  
  name: "App",
  components: {
    BasicValidation, CustomValidation, DynamicRules, ChildValidation, ChildValidationWithErr, ChildValidationWithErrExtractor, ChildValidationWithExtWrapper
  }
};
</script>