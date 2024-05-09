<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();
const { authInfo } = store;
</script>

<template>
  <q-page class="row items-center">
    <div>
      <div>login: {{ authInfo.login }}</div>
      <div>email: {{ authInfo.email }}</div>
    </div>
  </q-page>
</template>
