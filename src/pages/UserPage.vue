<template>
  <q-page class="row items-center">
    <q-card class="q-pa-md">
      <div class="q-pb-md">Login: {{ authInfo.login }}</div>
      <div class="q-pb-md">Email: {{ authInfo.email }}</div>
      <div v-if="solutions" class="q-pb-sm">Solutions:</div>
      <li v-for="solution in solutions" :key="solution.name">
        <a :href="`tasks/${solution.task.id}`"> {{ solution.task.name }} </a>
      </li>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';

const store = useAuthStore();
const { authInfo } = store;
const solutions = ref(null);

const fetchSolutions = () => {
  api.get('solutions/user').then((response) => {
    solutions.value = response?.data?.solution;
  });
};

onMounted(() => {
  fetchSolutions();
});
</script>
