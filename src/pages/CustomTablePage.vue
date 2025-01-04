<template>
  <div class="page-body">
    <div class="heading">
      <h4 class="title">Custom Table</h4>
      <p>Custom tables can be customized with styles and functions.</p>
      <button class="action-btn" @click="togglePagination">
        {{ usePagination ? "Disable Pagination" : "Enable Pagination" }}
      </button>
    </div>
    <div class="container">
      <CustomTable
        :headers="shippingHeader"
        :data="shippingTestData"
        :editBtn="true"
        :deleteBtn="true"
        :usePagination="usePagination"
        :rowsPerPage="usePagination ? 7 : shippingTestData.length"
        @editRow="handleEdit"
        @deleteRow="handleDelete"
        @dataClick="hadleDataClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomTable from "../components/CustomTable.vue";

let usePagination = ref(false);

const shippingHeader = [
  {
    field: "shipping_address",
    label: "Shipping Address",
    type: "string",
    width: "20%",
  },
  { field: "test_column", label: "Sent Package", type: "string", width: "5%" },
  { field: "zone", label: "Zone", type: "string", width: "10%" },
];

// Test data - data
const shippingTestData = [
  {
    id: 1,
    shipping_address:
      "123, Zhongshan Road, Sec. 2 Daan District, Taipei City 106 Taiwan, R.O.C.",
    test_column: "true",
    default: true,
    zone: "1",
  },
  {
    id: 2,
    shipping_address: "Address 2",
    test_column: "true",
    default: false,
    zone: "2",
  },
  {
    id: 3,
    shipping_address: "Address 3",
    test_column: "true",
    default: false,
    zone: "5",
  },
  {
    id: 4,
    shipping_address: "Address 4",
    test_column: "false",
    default: false,
    zone: "3",
  },
  {
    id: 5,
    shipping_address: "Address 5",
    test_column: "false",
    default: false,
    zone: "4",
  },
  {
    id: 6,
    shipping_address: "Address 6",
    test_column: "true",
    default: false,
    zone: "6",
  },
  {
    id: 7,
    shipping_address: "Address 7",
    test_column: "false",
    default: false,
    zone: "5",
  },
  {
    id: 8,
    shipping_address: "Address 8",
    test_column: "false",
    default: false,
    zone: "3",
  },
];

const togglePagination = () => {
  usePagination.value = !usePagination.value;
};

// After click the edit btn
const handleEdit = (row) => {
  window.alert(`click edit btn, plese check console log`);
  console.log("click edit btn, row:", row);
};

// After click the delete btn
const handleDelete = (row) => {
  window.alert(`click delete btn, plese check console log`);
  console.log("click delete btn, row:", row);
};

// After click one data row
const hadleDataClick = (item) => {
  window.alert(`click data row, plese check console log`);
  console.log("click data row, data:", item);
};
</script>

<style scoped>
.page-body {
  width: 100%;
  height: 94%;
}

.heading {
  width: 90%;
  height: 15%;
  margin: 2% 5%;
}

.title {
  font-size: 2rem;
  margin-bottom: 1%;
}

.action-btn {
  width: 14vw;
  height: fit-content;
  padding: 0.8vh 0.8vw;
  background-color: #d4d4d4;
  border: #d4d4d4 1px solid;
  border-radius: 3px;
  color: #292929;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin-bottom: 1%;
}

.action-btn:hover {
  background-color: #d4d4d4;
  color: #292929;
  box-shadow: 4px 4px 6px rgba(120, 120, 120, 0.5);
}

.container {
  height: 75%;
  margin: 2% 5%;
  display: flex;
  gap: 3%;
  background-color: #303030;
}
</style>
