<template>
  <form-group name="name">
    <input
      type="text" 
      class="input"
      v-model="name"
      placeholder="Joe"
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
    name: {
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