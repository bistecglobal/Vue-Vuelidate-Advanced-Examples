<template>
  <div class="form pt-6">
    <div class="summary text-red mb-4" v-if="$v.form.$error">
      Form has errors
    </div>
    <div class="font-bold">
      Step: {{ step }} / {{ maxSteps }}
    </div>
    <form @submit.prevent="next" novalidate>
      <div class="flex justify-center my-6">

        <div v-if="step === 1" class="px-4" :class="{ 'hasError': $v.form.name.$error }">
          <label class="mr-2 font-bold text-grey">Name</label>
          <input type="text" class="input" v-model="form.name">
        </div>

        <div v-if="step === 2" class="px-4" :class="{ 'hasError': $v.form.email.$error }">
          <label class="mr-2 font-bold text-grey">Email</label>
          <input type="email" class="input" v-model="form.email">
        </div>
      </div>
      <div class="buttons">
        <button type="button" v-if="step === 2" class="button" @click="prev">
          Prev
        </button>
        <button type="button" v-if="step === 1" class="button" @click="next">
          Next
        </button>
        <button @click="submit" v-if="step === 2" class="button">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "DynamicRules",

  data() {
    return {
      step: 1,
      maxSteps: 2,
      form: {
        name: "",
        email: ""
      }
    };
  },

  computed: {
    rules () {
      return this.step === 1 
        ? { name: { required } } 
        : { email: { required, email } }
    }
  },

  validations() {
    return {
      form: this.rules
    }
  },

  methods: {
    submit() {
      this.$v.form.$touch();
      if(this.$v.form.$error) return
      // to form submit after this
      alert('Form submitted')
    },

    next() {
      if(this.step >= this.maxSteps) return
      this.$v.form.$touch()
      if(this.$v.form.$error) return
      this.step++
    },
    
    prev() {
      if(this.step <= 1) return
      this.step--
    }
  }
};
</script>
