<template>
  <form-group :validator="v" label="Name">
    <input type="text" class="input" v-model="name" placeholder="Joe" @input="v.$touch()">
  </form-group>
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
