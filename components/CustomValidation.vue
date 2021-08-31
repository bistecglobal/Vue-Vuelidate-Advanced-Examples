<template>
  <div class="form pt-6">
    <div class="summary text-red" v-if="$v.form.$error">Form has errors</div>
    <form @submit.prevent="submit" novalidate>
      <div class="flex justify-center my-6">
        <div class="px-4" :class="{ hasError: $v.form.name.$error }">
          <label class="mr-2 font-bold text-grey">Name</label>
          <input type="text" class="input" v-model="form.name" @input="$v.form.name.$touch();"
          />
          <div class="text-sm mt-2 text-grey-darker">
            Name must not include Joe or special chars
          </div>
        </div>
        <div class="px-4" :class="{ hasError: $v.form.email.$error }">
          <label class="mr-2 font-bold text-grey">Email</label>
          <input type="email" class="input" v-model="form.email" @input="$v.form.email.$touch();"
          />
          <div class="text-sm mt-2 text-grey-darker">
            Email is required and must NOT be gmail<br />
            Async check if email is less than 10 chars
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { illegalChars,isNotJoe,notGmail,isEmailAvailable} from "@/static/CustomValidators";

export default {
  name: "CustomValidation",

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
      name: { required, isJoe: isNotJoe, illegalChars },
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
