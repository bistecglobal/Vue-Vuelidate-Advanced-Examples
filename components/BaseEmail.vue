<template>
  <div class="form-group" :class="{ hasError: v.$error }">
    <label class="mr-2 font-bold text-grey">Email</label>
    <input type="email" class="input" v-model="email" placeholder="user@yahoo.com"/>
    <div class="text-sm mt-2 text-grey-darker">
      Email is required and must NOT be gmail<br />
      Async check if email is less than 10 chars
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
        this.v.$touch();
        this.$emit("input", value);
      }
    }
  }
};
</script>
