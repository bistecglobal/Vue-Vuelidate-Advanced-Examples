<template>
  <div class="form-group" :class="{ 'hasError': v.$error }">
    <label class="mr-2 font-bold text-grey">Name</label>
    <input type="text" class="input" v-model="name" placeholder="Joe" @input="v.$touch()">
    <div class="text-sm mt-2 text-red" v-if="v.$error">
      <div v-if="!v.required">Name is a required</div>
      <div v-if="!v.isJoe">Name must be Joe</div>
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
