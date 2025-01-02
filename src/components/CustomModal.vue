<template>
  <transition>
    <div class="m-dialog-mask" v-show="visible" @click.self="onBlur">
      <div class="m-dialog">
        <div class="m-dialog-content">
          <div class="m-dialog-header">
            <slot name="header">
              <div class="u-head">
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
            </slot>
          </div>
          <div class="m-dialog-body">
            <slot>{{ content }}</slot>
          </div>
          <div class="m-dialog-footer" v-show="footer">
            <slot name="footer">
              <div class="bottom-btn">
                <button id="secondary-btn" @click="onCancel">
                  {{ cancelText }}
                </button>
                <button id="primary-btn" @click="onConfirm">
                  {{ okText }}
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Warning",
  },
  content: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 640,
  },
  height: {
    type: Number,
    default: 480,
  },
  customWidthPixels: {
    // Ex: px,vw,vmin...
    type: String,
    default: "vw",
  },
  customHeightPixels: {
    // Ex: px,vw,vmin...
    type: String,
    default: "vh",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  okText: {
    type: String,
    default: "OK",
  },
  // Enable footer buttons
  footer: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close", "ok", "cancel"]);

const dialogWidth = computed(() => {
  return props.width + props.customWidthPixels;
});

const dialogHeight = computed(() => {
  return props.height + props.customHeightPixels;
});

const onBlur = () => {
  emits("close");
};

const onCancel = () => {
  emits("cancel");
};

const onConfirm = () => {
  emits("ok");
};
</script>

<style scoped>
.m-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
}

.m-dialog {
  margin: 0 auto;
  width: v-bind(dialogWidth);
  height: v-bind(dialogHeight);
  min-width: 350px;
  min-height: 150px;
}

.m-dialog-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: #202020;
  color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.m-dialog-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 96%;
  height: 15%;
  padding: 1.8vw 1.2vw 1.8vw 1.8vw;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}

.u-head {
  width: 100%;
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #fff;
  font-weight: 500;
  font-size: 1.5vw;
  word-wrap: break-word;
}

.m-dialog-body {
  width: 90%;
  height: 100%;
  padding: 2vh 1.8vw;
  font-size: 1.1vw;
  word-wrap: break-word;
}

.m-dialog-footer {
  display: flex;
  height: 20%;
  padding: 1vw 0;
  position: relative;
}

.bottom-btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
}

.bottom-btn > button {
  border: none;
  font-size: 0.9vw;
  width: 7vw;
  height: 4vh;
  border-radius: 3px;
  cursor: pointer;
}

#primary-btn {
  background-color: #6181a8;
  color: #fff;
}

#secondary-btn {
  background-color: #7c7c7c;
  border: 1px solid #7c7c7c;
  color: #fff;
}
</style>
