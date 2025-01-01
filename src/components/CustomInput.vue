<template>
  <div class="info-item">
    <div class="label">{{ props.label }}</div>
    <div
      :class="[
        props.type != 'password' ? 'info-text' : 'password-info-text',
        showErrorMessage ? 'error-border' : '',
      ]"
    >
      <!-- Text -->
      <template v-if="props.type == 'text'">
        <input
          ref="inputRef"
          v-model="content"
          @input="handleInput"
          class="input-field"
          type="text"
          :required="required"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
        />
        <!-- Dropdown for filtered results -->
        <div
          ref="dropdownRef"
          v-if="props.keyWordSearch && filteredResults.length > 0"
          class="dropdown-menu"
          :style="{ width: inputWidth + 'px' }"
        >
          <div
            v-for="(result, index) in filteredResults"
            :key="index"
            @click="selectResult(result)"
          >
            {{ result }}
          </div>
        </div>
      </template>

      <!-- Number -->
      <template v-else-if="props.type === 'number'">
        <input
          ref="inputRef"
          v-model.number="content"
          class="input-field"
          type="number"
          @input="checkValidity"
          :required="required"
          :disabled="props.disabled"
          :min="props.min"
          :max="props.max"
        />
      </template>

      <!-- Password -->
      <template v-else-if="props.type == 'password'">
        <input
          ref="inputRef"
          v-model="content"
          :class="
            props.type != 'password' ? 'input-field' : 'input-field-password'
          "
          :type="showPassword ? 'text' : 'password'"
          :required="required"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          @input="checkValidity"
        />
        <img
          v-if="!showPassword"
          src="/assets/eye-slash.svg"
          class="input-eye"
          @mouseover="handleShowPassword()"
        />
        <img
          v-else
          src="/assets/eye-white.svg"
          class="input-eye"
          @mouseleave="handleShowPassword()"
        />
      </template>
    </div>
    <p class="error-message">
      <span v-if="showErrorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

let content = defineModel();

const props = defineProps({
  type: {
    type: String,
    default: "text", // text | number | password
  },
  label: {
    type: String,
    default: "Label",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  instantCheck: {
    type: Boolean,
    default: false,
  },
  errorHandler: {
    type: Object,
    default: {
      reg: "",
      msg: "",
      enable: true,
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  // Number use
  minNumber: {
    type: Number,
    default: null,
  },
  maxNumber: {
    type: Number,
    default: null,
  },
  // Search
  // enable or disable search function
  keyWordSearch: {
    type: Boolean,
    default: false,
  },
  // search srcData
  searchSrcData: {
    type: Array,
    default: [],
  },
});

const inputRef = ref(null);
const dropdownRef = ref(null);

let showErrorMessage = ref(false);
let errorMessage = ref("");

let filteredResults = ref([]);
const inputWidth = ref(0); // dorpdown list width

let showPassword = ref(false);

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

// test text validation in reg
const regTest = (val) => {
  return props.errorHandler.reg ? props.errorHandler.reg.test(val) : true;
};

// validate input
const checkValidity = (e) => {
  const input = e?.target || inputRef.value;

  if (!input) return;

  const value = input.value;

  // Required Field Check
  if (props.required && value == "") {
    errorMessage.value = "Required field";
    showErrorMessage.value = true;
    return;
  }

  // Validate with the regex
  if (value && !regTest(value)) {
    errorMessage.value = props.errorHandler.msg || "Invalid format";
    showErrorMessage.value = true;
    return;
  } else {
    errorMessage.value = "";
    showErrorMessage.value = false;
  }

  // Validate number
  if (props.type == "number") {
    const numValue = parseFloat(value);
    if (props.minNumber !== null && numValue < props.minNumber) {
      errorMessage.value = `At least ${props.minNumber}`;
      showErrorMessage.value = true;
      return;
    }
    if (props.maxNumber !== null && numValue > props.maxNumber) {
      errorMessage.value = `Cannot exceed ${props.maxNumber}`;
      showErrorMessage.value = true;
      return;
    }
  }
};

const handleInput = (e) => {
  filterResults();
  checkValidity(e);
};

// Function to filter results based on input
const filterResults = () => {
  if (content.value) {
    filteredResults.value = props.searchSrcData.filter((item) =>
      item.toLowerCase().includes(content.value.toLowerCase())
    );
  } else {
    filteredResults.value = [];
  }
};

// Function to handle the selection of a filtered result
const selectResult = (result) => {
  content.value = result;
  filteredResults.value = []; // Clear the dropdown after selection
};

// Instant check
watch(
  () => props.instantCheck,
  (newVal) => {
    if (newVal && inputRef.value) {
      checkValidity({ target: inputRef.value });
    }
  },
  { immediate: true }
);

watch(
  () => content.value,
  (newVal) => {
    if (newVal) {
      checkValidity({ target: inputRef.value });
      showErrorMessage.value = !regTest(newVal);
    }
  }
);

onMounted(() => {
  const infoTextElement = inputRef.value?.closest(".info-text");

  if (infoTextElement) {
    inputWidth.value = infoTextElement.offsetWidth - 10;
  }

  document.addEventListener("click", clickOutsideHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutsideHandler);
});

// Hndle clicking outside the input or dropdown
const clickOutsideHandler = (event) => {
  if (
    inputRef.value &&
    dropdownRef.value &&
    !inputRef.value.contains(event.target) &&
    !dropdownRef.value.contains(event.target)
  ) {
    filteredResults.value = [];
  }
};

// Hanlde reset the dorpdown list
window.addEventListener("resize", () => {
  const infoTextElement = inputRef.value?.closest(".info-text");

  if (infoTextElement) {
    inputWidth.value = infoTextElement.offsetWidth;
  }
});

defineExpose({
  showErrorMessage,
});
</script>

<style lang="css" scoped>
::placeholder {
  color: #9d9d9d;
  font-size: var(--standard-font-size);
}

.info-item {
  width: 100%;
  position: relative;
}

.label {
  color: #d4d4d4;
  margin-bottom: 1.5%;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-text {
  padding: var(--input-field-padding);
  background-color: #242424;
  border: 1px solid #ebebeb;
  border-radius: var(--input-border-radius);
  font-size: var(--standard-font-size);
  outline: none;
}

input[type="text"]:disabled {
  cursor: not-allowed;
}

.input-field {
  width: 95%;
  padding: 0;
  border: none;
  background-color: #242424;
  font-size: var(--standard-font-size);
  outline: none;
  color: #d4d4d4;
}

.password-info-text {
  padding: var(--input-field-padding);
  background-color: #242424;
  border: 1px solid #ebebeb;
  border-radius: var(--input-border-radius);
  font-size: var(--standard-font-size);
  outline: none;
  position: relative;
}

.input-field-password {
  width: 90%;
  padding: 0;
  border: 1px solid transparent;
  background-color: #242424;
  border-radius: var(--input-border-radius);
  font-size: var(--standard-font-size);
  outline: none;
  color: #d4d4d4;
}

.input-eye {
  width: 0.8vw;
  position: absolute;
  top: 30%;
  left: 90%;
  cursor: pointer;
}

.error-message {
  color: #ff0000;
  font-size: var(--error-font-size);
  margin: 0 0 0 1%;
  height: 1rem;
  /* white-space: nowrap; */
  margin-top: 0.5%;
}

.error-border {
  border: 1px solid #ff2424;
}

/* search dropdown list */
::-webkit-scrollbar {
  width: 2px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: #b4b4b4;
  border-radius: 5px;
}

.dropdown-menu {
  background-color: #242424;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  max-height: 10vmin;
  overflow-y: auto;
  padding: 0.5vmin;
  margin-top: 1.5vmin;
  z-index: 999;
  position: absolute;
  left: 0;
}

.dropdown-menu div {
  color: #9b9b9b;
  padding: 4%;
  cursor: pointer;
}

.dropdown-menu div:hover {
  background-color: #f5f5f5;
  border-radius: 3px;
}
</style>
