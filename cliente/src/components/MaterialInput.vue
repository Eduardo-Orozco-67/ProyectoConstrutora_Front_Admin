<!-- <script setup>
defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: [String, Object],
    text: String,
    class: String,
    default: () => ({
      class: "",
    }),
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
function getClasses(size, success, error) {
  let sizeValue, isValidValue;

  sizeValue = size && `form-control-${size}`;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
}
</script>
<template>
  <div class="input-group">
    <label v-if="label" :class="label.class">{{
      typeof label == "string" ? label : label.text
    }}</label>
    <span v-if="icon" class="input-group-text"
      ><i class="fas" :class="`fa-${icon}`" aria-hidden="true"></i
    ></span>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :class="[getClasses(size, success, error), inputClass]"
      :value="value"
      :placeholder="placeholder"
      :isRequired="isRequired"
      :disabled="isDisabled"
    />
  </div>
</template> -->
 

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: [String, Object],
    text: String,
    class: String,
    default: () => ({
      text: '',
      class: "",
    }),
  },
  modelValue: { // Cambiado de 'value' a 'modelValue'
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(['update:modelValue']);

function getClasses(size, success, error) {
  let sizeValue, isValidValue;

  sizeValue = size ? `form-control-${size}` : '';

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
}

// Esta función será llamada cuando el valor del input cambie
function updateValue(event) {
  emits('update:modelValue', event.target.value);
}
</script>

<template>
  <div class="input-group">
    <label v-if="label.text" :class="label.class">
      {{ label.text }}
    </label>
    <span v-if="icon" class="input-group-text">
      <i :class="`fa-${icon}`" aria-hidden="true"></i>
    </span>
    <input
      :id="id"
      :type="type"
      :class="[getClasses(size, success, error), inputClass]"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="isDisabled"
      :value="modelValue" 
      @input="updateValue" 
    />
  </div>
</template>
