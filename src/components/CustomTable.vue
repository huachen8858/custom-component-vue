<template>
  <div class="table-wrap">
    <table :class="{ 'table-nopagination': !props.usePagination }">
      <thead
        v-if="props.headers && props.headers.length !== 0"
        class="headings"
      >
        <tr>
          <th
            v-for="(header, index) in props.headers"
            :key="index"
            :style="{ width: header.width || 'auto' }"
          >
            {{ header.label }}
          </th>
          <th
            v-if="props.editBtn"
            class="edit-btn-column-th no-ellipsis-td"
          ></th>
          <th
            v-if="props.deleteBtn"
            class="delete-btn-column-th no-ellipsis-td"
          ></th>
        </tr>
      </thead>
      <!-- No Headers -->
      <thead v-else class="headings">
        <tr class="no-headers-message">No Headers</tr>
      </thead>

      <tbody
        v-if="props.data && props.data.length !== 0"
        :class="{ 'tbody-nopagination': !props.usePagination }"
      >
        <tr
          v-for="(item, index) in currentPageData"
          :key="index"
          class="row-data"
          @click="handleDataClick(item)"
        >
          <td
            v-for="(header, headerIndex) in props.headers"
            :key="headerIndex"
            :style="{
              width: header.width || 'auto',
            }"
            :class="{ 'no-ellipsis-td': header.type != 'string' }"
          >
            {{ item[header.field] }}
          </td>
          <td v-if="props.editBtn" class="edit-btn-column no-ellipsis-td">
            <div class="edit-btn" @click.stop="handleEdit(item)">Edit</div>
          </td>
          <td v-if="props.deleteBtn" class="delete-btn-column no-ellipsis-td">
            <img
              class="delete-btn"
              src="/assets/delete.svg"
              alt=""
              @click.stop="handleDelete(item)"
            />
          </td>
        </tr>
      </tbody>
      <!-- No Data available -->
      <div class="no-data-message" v-else>No data available</div>

      <!-- Pagination -->
      <div
        v-if="props.usePagination && props.data?.length !== 0 && props.headers"
        class="pagination"
      >
        <!-- Go to first page -->
        <button @click="jumpPrevPage" :disabled="currentPage === 1">
          <img
            v-if="currentPage !== 1"
            class="prev-arrow"
            :src="'/assets/pagination-left-double-arrow-white.svg'"
            alt=""
          />
          <!-- disable -->
          <img
            v-else
            class="disable-arrow"
            :src="'/assets/pagination-left-double-arrow-gray.svg'"
            alt=""
          />
        </button>
        <!-- Prev page -->
        <button @click="previousPage" :disabled="currentPage === 1">
          <img
            v-if="currentPage !== 1"
            class="prev-arrow"
            :src="'/assets/pagination-left-arrow-white.svg'"
            alt=""
          />
          <!-- disable -->
          <img
            v-else
            class="disable-arrow"
            :src="'/assets/pagination-left-arrow-gray.svg'"
            alt=""
          />
        </button>
        <!-- Current page -->
        <div
          v-for="page in visiblePages"
          :key="page"
          @click="page !== '...' ? goToPage(page) : null"
          :class="{
            'current-page': page !== '...' && page === currentPage,
            'page-ellipsis': page === '...',
            'page-btn': page !== '...',
          }"
        >
          {{ page }}
        </div>
        <!-- Next page -->
        <button @click="nextPage" :disabled="currentPage === totalPages">
          <img
            v-if="currentPage !== totalPages"
            class="next-arrow"
            :src="'/assets/pagination-right-arrow-white.svg'"
            alt=""
          />
          <!-- disable -->
          <img
            v-else
            class="disable-arrow"
            :src="'/assets/pagination-right-arrow-gray.svg'"
            alt=""
          />
        </button>
        <!-- Jump to ? page -->
        <button @click="jumpNextPage" :disabled="currentPage === totalPages">
          <img
            v-if="currentPage !== totalPages"
            class="next-arrow"
            :src="'/assets/pagination-right-double-arrow-white.svg'"
            alt=""
          />
          <!-- diable -->
          <img
            v-else
            class="disable-arrow"
            :src="'/assets/pagination-right-double-arrow-gray.svg'"
            alt=""
          />
        </button>
        <!-- Jump to ? page - options -->
        <select v-model="selectedJumpValue" class="select-jump-page">
          <option
            v-for="jumpOption in allOptions"
            :key="jumpOption"
            :value="jumpOption"
          >
            {{ jumpOption }}
          </option>
        </select>
      </div>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  headers: Array,
  data: Array,
  usePagination: {
    type: Boolean,
    default: true,
  },
  rowsPerPage: {
    type: Number,
    default: 1000,
  },
  editBtn: {
    type: Boolean,
    default: false,
  },
  deleteBtn: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["editRow", "deleteRow", "dataClick"]);

const tableData = ref(props.data);
// If usePagination is false, set rowsPerPage to data.length
const rowsPerPage = ref(
  props.usePagination ? props.rowsPerPage : props.data.length
);

// Pagination Use
const currentPage = ref(1);
const selectedJumpValue = ref(10);
const allOptions = ref([10, 50, 100, 200]);
const totalPages = computed(() =>
  Math.ceil(tableData.value.length / rowsPerPage.value)
);

// Update rowsPerPage when props.rowsPerPage is changed
watch(
  props,
  () => {
    rowsPerPage.value = props.rowsPerPage;
  },
  { deep: true }
);

// Update the tableData when props.data is changed
watch(
  () => props.data,
  (newData) => {
    currentPage.value = 1;

    if (Array.isArray(newData)) {
      tableData.value = [...newData];
    } else {
      tableData.value = [];
      return;
    }
  },
  { deep: true, immediate: true }
);

/**
 * Paginaiton
 */
const visiblePages = computed(() => {
  const pageCount = totalPages.value;

  if (pageCount <= 5) {
    // Return all page numbers
    const newPageCount = Math.ceil(tableData.value.length / rowsPerPage.value);
    return Array.from({ length: newPageCount }, (_, index) => index + 1);
  } else {
    const firstPage = currentPage.value > 3 ? currentPage.value - 2 : 1;
    const lastPage = firstPage + 4 < pageCount ? firstPage + 4 : pageCount;

    // generate pagination array
    const result = Array.from(
      { length: lastPage - firstPage + 1 },
      (_, index) => firstPage + index
    );

    // if firstPage > 1, use unshift add the first page number
    if (firstPage > 1) {
      result.unshift(1);
    }

    // if lastPage < totaPpages, add the last page number
    if (lastPage < pageCount) {
      result.push(pageCount);
    }

    // if there are page numbers before the first displayed page, add ellipsis
    if (firstPage > 2) {
      result.splice(1, 0, "...");
    }

    // if there are page numbers after the last displayed page, add ellipsis
    if (lastPage < pageCount - 1) {
      result.splice(result.length - 1, 1, "...", pageCount);
    }
    return result;
  }
});

// selectedJumpValue.value changed value
watch(
  () => selectedJumpValue.value,
  (newValue) => {
    selectedJumpValue.value = newValue;
  },
  { deep: true }
);

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;

  return tableData.value.slice(start, end);
});

const goToPage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const jumpPrevPage = () => {
  const selectedPage = currentPage.value - selectedJumpValue.value;
  currentPage.value = Math.max(selectedPage, 1);
};

const jumpNextPage = () => {
  const selectedPage = currentPage.value + selectedJumpValue.value;
  currentPage.value = Math.min(selectedPage, totalPages.value);
};

/**
 * Edit Button
 */
const handleEdit = (item) => {
  emits("editRow", item);
};

/**
 * Delete Button
 */
const handleDelete = (item) => {
  emits("deleteRow", item);
};

const handleDataClick = (item) => {
  emits("dataClick", item);
};
</script>

<style scoped>
.table-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  padding: 0.8vh 1.2vw;
}

::-webkit-scrollbar {
  width: 4px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: #6c6c6c;
  border-radius: 5px;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

.no-headers-message {
  color: #fff;
  font-size: 0.75vw;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  padding: 2vh 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-data-message {
  color: #fff;
  font-size: 0.8vw;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  padding: 5vh 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

table {
  height: 100%;
}

thead,
tbody tr {
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 100%;
}

th,
td {
  padding: 1% 0.5%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

td span {
  font-size: 0.75vw;
  font-weight: 400;
  letter-spacing: 1px;
}

.no-ellipsis-td {
  overflow: visible;
}

.headings {
  font-size: 0.75vw;
  height: 10%;
  color: #fff;
  background-color: transparent;
  border-bottom: 1px solid #dadada;
}

.address-img-column {
  width: 1%;
}

.address-img-column img {
  width: 1vw;
}

.edit-btn-column,
.edit-btn-column-th {
  width: 3%;
}

.delete-btn-column,
.delete-btn-column-th {
  width: 3%;
}

tbody {
  height: 100%;
  width: 100%;
  overflow: scroll;
  color: #fff;
}

.tbody-nopagination {
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: scroll;
}

.row-data {
  height: 10%;
  font-size: 0.75vw;
  font-weight: 400;
  padding: 0.5% 0;
  border-bottom: 1px solid #f5f5f5;
}

.row-data:hover {
  background-color: #393939;
}

.edit-btn {
  cursor: pointer;
  width: 1vw;
  color: #64a3d6;
}

.delete-btn {
  cursor: pointer;
  width: 1vw;
  color: #64a3d6;
}

/* Pagination */
.pagination {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6vw;
  font-weight: 500;
  color: #fff;
  padding: 0 0.5vw;
}

.pagination button {
  background-color: transparent;
  border: none;
  padding: 0.5vw;
  margin: 0 5px;
  border-radius: 50%;
}

.pagination .page-btn {
  padding: 0.5vw;
  margin: 0 5px;
  cursor: pointer;
}

.page-ellipsis {
  color: #fff;
  padding: 0.5vw;
  margin: 0 5px;
}

.pagination .current-page {
  background-color: #4b7da6;
  clip-path: circle();
  color: #fff;
  padding: 0.5vw;
  margin: 0 5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev-arrow,
.next-arrow {
  width: 0.9vw;
  cursor: pointer;
}

.disable-arrow {
  width: 0.9vw;
  cursor: default;
}

.select-jump-page {
  padding: 1vh 0.5vw;
  border-radius: 5px;
  color: #000;
  border: 1px solid #8f8f8f;
  background-color: #fff;
  margin-left: 1vw;
}
</style>
