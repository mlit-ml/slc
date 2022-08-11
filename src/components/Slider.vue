<template>
  <input
    type="range"
    min="1"
    max="100"
    value="0"
    class="range-slider shadow"
    oninput="valueChanged(this)"
  />
</template>

<style scoped>
.range-slider {
  appearance: none;
  outline: none;
  height: 0.25rem;
  border-radius: 5px;
  background-color: #ccc;
}

.range-slide::-webkit-slider-runnable-track {
  background-color: white;
}
.range-slider::-webkit-slider-thumb {
  background: #4f46e5;
  appearance: none;
  box-shadow: 1px 2px 26px 1px #bdbdbd;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
