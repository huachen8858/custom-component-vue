<template>
  <div class="home">
    <section class="heading">
      <h1>Custom Components</h1>
    </section>
    <section class="component-section">
      <div class="list-container">
        <div class="list-item">
          <a href="/form-series">Form Series Components</a>
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
.home {
  width: 100%;
  height: 100%;
}

.heading {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.component-section {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
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
  font-size: 1rem;
}

.list-item:hover {
  background-color: rgba(101, 101, 101, 0.5);
  color: rgb(27, 38, 57);
}
</style>
