<template>
  <div class="form-group" :class="{ 'hasError': v.$error }">
    <label class="mr-2 font-bold text-grey">Email</label>
    <input type="email" class="input" v-model="email" placeholder="user@yahoo.com" @input="v.$touch()">
    <div class="text-sm mt-2 text-red" v-if="v.$error">
      <div v-if="!v.required">Email is required</div>
      <div v-if="!v.notGmail">Email should not be a Gmail one</div>
      <div v-if="!v.isEmailAvailable">Email is not available (less than 10 char)</div>
      <div v-if="!v.email">Email is not a properly formatted email address</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
  
    v: {
      type: Object,
      required: true
    }
  },

  computed: {
    email: {
      get() {
        return this.value;
      },
  
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
