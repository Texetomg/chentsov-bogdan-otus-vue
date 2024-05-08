<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
</script>

<template>
  <q-card-section class="text-center q-pt-none">
    <span
      v-if="
        useAuthStore().errors?.length && !Array.isArray(useAuthStore().errors)
      "
    >
      {{ useAuthStore().errors }}
    </span>
  </q-card-section>
  <ul
    v-if="useAuthStore().errors?.length && Array.isArray(useAuthStore().errors)"
  >
    <li v-for="message in useAuthStore().errors" :key="message">
      {{ message }}
    </li>
  </ul>
</template>
