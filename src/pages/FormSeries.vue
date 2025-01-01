<template>
  <div class="page-body">
    <div class="heading">
      <h4 class="title">Form Series Components</h4>
    </div>
    <div class="container">
      <!-- Custom Input -->
      <div class="customInput-wrapper">
        <CustomInput
          v-model="name"
          label="Name (allow 10 characters)"
          :errorHandler="{
            reg: regex,
            msg: message,
          }"
          :instant-check="instantcheck"
          :required="true"
          :disabled="false"
          :placeholder="'I am placeholder'"
        />
      </div>

      <!-- Custom Dropdown -->
      <div class="customDropdown-wrapper">
        <CustomDropdown
          v-model="gender"
          label="Gender"
          :options="genderOptions"
        />
      </div>

      <!-- Custom Datepicker -->
      <div class="customDatepicker-wrapper">
        <CustomDatepicker
          label="Date of Birth"
          v-model="selectedDate"
          :disabled="false"
          :required="true"
        />
      </div>

      <!-- CustomInput - email -->
      <div class="customInput-wrapper">
        <CustomInput
          v-model="email"
          label="Email"
          :errorHandler="{
            reg: emailRegex,
            msg: emailMessage,
          }"
          :instant-check="instantcheck"
          :required="true"
          :disabled="false"
        />
      </div>
    </div>
    <div class="container">
      <!-- CustomInput - password -->
      <div class="customInput-wrapper">
        <CustomInput
          v-model="password"
          label="Password"
          :type="'password'"
          :instant-check="instantcheck"
          :errorHandler="{
            reg: passwordRegex,
            msg: passwordMsg,
          }"
          :required="true"
          :disabled="false"
        />
      </div>

      <!-- Custom Timepicker -->
      <div class="customTimepicker-wrapper">
        <CustomTimepicker
          label="Time (allow 9~12 am)"
          v-model="selectedTime"
          :disabledTimes="disabledTime"
          :required="true"
          :instant-check="instantcheck"
        />
      </div>

      <!-- Custom Datepicker (Default null) -->
      <div class="customDatepicker-wrapper">
        <CustomDatepicker
          label="Date(Default null)"
          v-model="defaultNullDate"
          :disabledDates="disabledDates"
          :required="true"
          :instant-check="instantcheck"
        />
      </div>

      <!-- CustomInput - Input Search -->
      <div class="customInput-wrapper">
        <CustomInput
          v-model="sales"
          label="Sales (enter 'L' will show results)"
          :instant-check="instantcheck"
          :required="true"
          :disabled="false"
          :keyWordSearch="true"
          :searchSrcData="contactPersonList"
        />
      </div>
    </div>
    <div class="container">
      <button class="save-btn" @click="save()">Save</button>
      <span>
        * The save button is to simulate the field checking function when
        sending the form
      </span>
    </div>
    <div class="container">Result: {{ result }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CustomInput from "../components/CustomInput.vue";
import CustomDatepicker from "../components/CustomDatepicker.vue";
import CustomTimepicker from "../components/CustomTimepicker.vue";
import CustomDropdown from "../components/CustomDropdown.vue";
import dayjs from "dayjs";

let name = ref("");
const regex = ref(/^.{1,10}$/);
const message = ref("Please enter no more than 10 characters");

const testDate = ref(new Date());
const selectedDate = ref(new Date());
const selectedTime = ref({ hours: 11, minutes: 0, seconds: 0 });
const defaultNullDate = ref(null);

let gender = ref("Male"); // Default value
const genderOptions = ref(["Male", "Female"]); // Dropdown options

let password = ref("");
const passwordRegex = ref(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,20}$/);
let passwordMsg = ref(
  "Invalid Format. Password must contain at least one uppercase letter, one lowercase letter, one digit, and be between 8 and 20 characters long."
);

let email = ref("");
const emailRegex = ref(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const emailMessage = ref("Invalid Email");

let sales = ref("");

const contactPersonList = ref([
  "Lisa Wang",
  "Lisa Li",
  "Lisa Cheung",
  "Lily Huang",
]);

let instantcheck = ref(false);

const result = ref({});

// Disable 10 day of current month
const disabledDates = (date) => {
  const today = dayjs();
  const currentMonth = today.month();
  const tenthDayOfMonth = dayjs().month(currentMonth).date(10);

  if (dayjs(date).isBefore(tenthDayOfMonth, "day")) {
    return true;
  }
  return false;
};

const disabledTime = (time) => {
  if (time.hours < 9 || time.hours >= 12) {
    return true;
  }
  return false;
};

const save = () => {
  instantcheck.value = true;

  const formattedTime = dayjs()
    .set("hour", selectedTime.value.hours)
    .set("minute", selectedTime.value.minutes)
    .set("second", selectedTime.value.seconds)
    .format("HH:mm");

  result.value = {
    name: name.value,
    gender: gender.value,
    dateOfBirth: dayjs(selectedDate.value).format("YYYY/MM/DD"),
    email: email.value,
    password: password.value,
    time: formattedTime,
    date: defaultNullDate.value,
    sales: sales.value,
  };
};
</script>

<style scoped>
.page-body {
  width: 100%;
  height: 94%;
}

.heading {
  width: 90%;
  height: 10%;
  margin: 2% 5%;
}

.title {
  font-size: 2rem;
}

.container {
  padding: 2% 5%;
  display: flex;
  gap: 3%;
}

.customInput-wrapper,
.customDatepicker-wrapper,
.customTimepicker-wrapper,
.customDropdown-wrapper {
  width: 15vw;
}

.save-btn {
  width: 10vw;
  padding: 0.8vh 0.8vw;
  background-color: #d4d4d4;
  border: #d4d4d4 1px solid;
  border-radius: 3px;
  color: #292929;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.save-btn:hover {
  background-color: #d4d4d4;
  color: #292929;
  box-shadow: 4px 4px 10px rgba(120, 120, 120, 0.5);
}
</style>
