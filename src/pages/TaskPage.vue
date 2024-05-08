<template>
  <q-splitter v-model="splitterModel" style="height: calc(100vh - 50px)">
    <template v-slot:before>
      <div class="q-pa-md">
        <div v-if="task?.name" class="text-h4 q-mb-md">
          {{ task.name }}
        </div>
        <div v-if="task?.description" class="q-my-md">
          {{ task.description }}
        </div>
      </div>
    </template>

    <template v-slot:after>
      <div class="q-pa-md">
        <CodeMirror />
      </div>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import CodeMirror from 'src/components/CodeMirror.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const splitterModel = ref(50);
const task = ref(null);
const route = useRoute();

onMounted(() => {
  api
    .get(`tasks/${route.params.id}`)
    .then((response) => {
      task.value = response?.data || [];
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
});
</script>
