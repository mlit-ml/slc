<template>
  <div class="container flex justify-center mx-auto mt-2">
    <div class="border-gray-200 shadow">
      <table class="w-screen border-collapse phone-table">
        <slot name="content"></slot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.phone-table th {
  padding-top: 26px !important;
}
</style>
