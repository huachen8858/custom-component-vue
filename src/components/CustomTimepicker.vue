<template>
  <div class="timepicker-wrap">
    <div class="label">{{ props.label }}</div>
    <VueDatePicker
      v-model="selectedTime"
      :class="showErrorMessage ? 'timepicker-error' : 'timepicker'"
      :time-picker="true"
      :teleport="true"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :disabled-times="props.disabledTimes"
      :required="props.required"
    >
      <template #input-icon>
        <img class="input-slot-image" src="/assets/clock-solid.svg" />
      </template>
    </VueDatePicker>

    <p class="error-message">
      <span v-if="showErrorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";
import VueDatePicker from "@vuepic/vue-datepicker";

const selectedTime = defineModel();

const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
  placeholder: {
    type: String,
    default: "HH:mm",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledTimes: {
    type: Function,
    default: () => false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  instantCheck: {
    type: Boolean,
    default: false,
  },
});

let showErrorMessage = ref(false);
let errorMessage = ref("Required field");

// Handle required
watch(
  () => selectedTime.value,
  (newVal) => {
    if (props.required && newVal == null) {
      showErrorMessage.value = true;
    } else {
      showErrorMessage.value = false;
    }
  },
  { immediate: true, deep: true }
);

// Instant check
watch(
  () => props.instantCheck,
  (newVal) => {
    if (newVal && props.required && !selectedTime.value) {
      showErrorMessage.value = true;
    } else {
      showErrorMessage.value = false;
    }
  },
  { immediate: true, deep: true }
);

defineExpose({
  showErrorMessage,
});
</script>

<style scoped>
.timepicker-wrap {
  width: 100%;
}

.label {
  color: #d4d4d4;
  margin-bottom: 1.5%;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timepicker {
  width: 100%;
  --dp-border-color: #ebebeb !important;
  --dp-background-color: #242424 !important;
  --dp-text-color: var(--standard-font-color) !important;
  --dp-font-size: var(--standard-font-size);
  --dp-border-radius: 3px;
  --dp-input-icon-padding: var(--labelSeries-dp-input-padding);
  --dp-input-padding: var(--input-field-padding);
}

.timepicker-error {
  width: 100%;
  --dp-border-color: #ff0000 !important;
  --dp-background-color: #242424 !important;
  --dp-text-color: var(--standard-font-color) !important;
  --dp-font-size: var(--standard-font-size);
  --dp-border-radius: 3px;
  --dp-input-icon-padding: var(--labelSeries-dp-input-padding);
  --dp-input-padding: var(--input-field-padding);
  border-radius: 3px;
  --dp-border-color-focus: #ff0000 !important;
  --dp-border-color-hover: #ff0000 !important;
}

:deep(.dp__input_wrap) {
  position: relative;
}

:deep(.dp__input) {
  min-height: auto;
}

:deep(.dp__input_icons) {
  padding: var(--labelSeries-dp-input-icon-padding);
}

.input-slot-image {
  position: absolute;
  top: -8px;
  left: 8px;
}

.error-message {
  color: #ff0000;
  font-size: var(--error-font-size);
  margin: 0 0 0 1%;
  height: 1rem;
  white-space: nowrap;
  margin-top: 0.5%;
}
</style>
