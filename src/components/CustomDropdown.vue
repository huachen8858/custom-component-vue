<template>
  <div class="info-item">
    <div class="label">{{props.label}}</div>
    <div class="dropdown-field" @click="toggleDropdown">
      <div class="selected-option">{{ selectedOption }}</div>
      <img src="/assets/dropdown-arrow.svg" alt="dropdown" />
      <div class="options" v-if="showDropdown">
        <div class="options-wrapper" v-if="options.length != 0">
          <div
            class="options-item"
            @mousedown="selectItem(item)"
            v-for="item in options"
            :key="item"
          >
            {{ item }}
          </div>
        </div>

        <div class="no-options" v-else>no options</div>
      </div>
    </div>
    
    <!-- For align use -->
    <p class="fixed-height"></p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  options: {
    type: Array,
    default() {
      ["option1", "option2", "option3"];
    },
  },
});

const emits = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const selectedOption = ref(null);

const toggleDropdown = (event) => {
  event.stopPropagation();
  showDropdown.value = !showDropdown.value;
};

const selectItem = (item) => {
  selectedOption.value = item;
  showDropdown.value = false;
  emits("update:modelValue", selectedOption.value);
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".dropdown-field")) {
    showDropdown.value = false;
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue;
  }, 
  {immediate: true}
);

onMounted(() => {
  if (!selectedOption.value && props.options.length > 0) {
    selectedOption.value = props.modelValue || props.options[0];
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.info-item {
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

.dropdown-field {
  width: 86%;
  padding: var(--input-field-padding);
  background-color: #242424;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  outline: none;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
}

.dropdown-field img{
  position: absolute;
  top: 10%;
  right: 2%;
}

.selected-option {
  height: fit-content;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.options {
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 110%;
  left: -0.5%;
  background-color: #242424;
  z-index: 999;
  overflow-y: auto;
  border: 1px solid #ebebeb;
  border-radius: 3px;
}

.options-wrapper {
  width: 100%;
  height: fit-content;
  max-height: 300px;
}

::-webkit-scrollbar {
  width: 0px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 5px;
}

.options-item {
  padding: 0.8vh 1vw;
  cursor: pointer;
}

.options-item input {
  margin-right: 6%;
  cursor: pointer;
}

.options-item:hover {
  background-color: gray;
  color: #fff;
}

.no-options {
  padding: 5%;
  cursor: default;
}

.fixed-height {
  margin: 0 0 0 1%;
  height: 1rem;
  margin-top: 0.5%;
}
</style>