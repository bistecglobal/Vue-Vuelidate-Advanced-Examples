<template>
  <form-group name="email">
    <input 
      type="email" 
      class="input" 
      v-model="email" 
      placeholder="user@yahoo.com" 
      slot-scope="{ validator }"
      @input="validator.$touch()"
    >
  </form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
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
