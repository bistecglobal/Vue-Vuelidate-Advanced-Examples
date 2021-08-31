<template>
  <div class="form pt-6">
    <form-wrapper :validator="$v.form">
      <form-summary/>
      <form @submit.prevent="submit" novalidate>
        <div class="flex text-center my-6 text-left">
          <div class="w-1/2 px-4">
            <name-component v-model="form.name"/>
          </div>
          <div class="w-1/2 px-4">
            <email-component v-model="form.email"/>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="button">
            Submit
          </button>
        </div>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { isNameJoe, notGmail, isEmailAvailable } from "@/static/CustomValidators";
import NameComponent from "./BaseNameWithValWrapper.vue";
import EmailComponent from "./BaseEmailWithValWrapper.vue";

export default {
  name: "ChildValidationWithExtWrapper",

  components: { NameComponent, EmailComponent },

  data() {
    return {
      form: {
        name: "",
        email: ""
      }
    };
  },

  validations: {
    form: {
      name: { required, isJoe: isNameJoe },
      email: { required, email, notGmail, isEmailAvailable }
    }
  },

  methods: {
    submit() {
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;
      // to form submit after this
      alert("Form submitted");
    }
  }
};
</script>
