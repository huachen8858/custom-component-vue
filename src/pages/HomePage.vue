<template>
  <div>
    <section class="heading">
      <h1>Custom Components</h1>
    </section>
    <section class="component-section">
      <div class="list-container">
        <div class="list-item">
          <a href="/">Custom Input</a>
        </div>
        <div class="list-item">
          <a href="/">Custom Dropdown</a>
        </div>
        <div class="list-item">
          <a href="/">Custom Datepicker</a>
        </div>
        <div class="list-item">
          <a href="/">Custom Timepicker</a>
        </div>
        <div class="list-item">
          <a href="/">Custom Table</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.heading {
  width: 100%;
  height: 10%;
}

.component-section {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item {
  width: 30vw;
  height: 5vh;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item:hover {
  background-color: rgba(101, 101, 101, 0.5);
  color: rgb(27, 38, 57);
}
</style>
