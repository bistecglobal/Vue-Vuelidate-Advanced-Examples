import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";

//import FormGroup from "@/components/FormGroupWithValWrapper.vue";

// NOTE : uncomment below line when to reduce the boilerplate code
import FormGroup from "@/components/FormGroupWithValWrapper.vue";

import FormSummary from "@/components/FormSummary.vue";

Vue.use(Vuelidate);

Vue.use(VuelidateErrorExtractor, {
  i18n: false,
  // Define common validation messages.
  messages: {
    required: "{attribute} is required!",
    isJoe: "{attribute} must be Joe",
    notGmail: "{attribute} must not be gmail",
    email: "{attribute} is not a valid Email address.",
    isEmailAvailable:
      "{attribute} is not available. Must be at least 10 characters long."
  },
  attributes: {
    name: "Name",
    email: "Email"
  }
});

// NOTE : Error display with custom error extractor
//Vue.component("form-group", templates.singleErrorExtractor.foundation6);

// NOTE : Enable below line only when to work with custom error component
Vue.component("form-group", FormGroup);

// NOTE : Validation Summary
Vue.component("form-summary", FormSummary);

Vue.component("form-wrapper", templates.FormWrapper);