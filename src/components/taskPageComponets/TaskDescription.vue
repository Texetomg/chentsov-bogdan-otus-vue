<template>
  <div class="q-pa-md">
    <div v-if="task?.name" class="text-h4 q-mb-md">
      {{ task.name }}
    </div>
    <q-badge>{{ task?.difficulty }}</q-badge>
    <div v-if="task?.description" class="q-my-sm">
      {{ task.description }}
    </div>
    <div v-if="task?.examples" class="q-my-sm">
      <div
        v-for="(example, idx) in task.examples"
        :key="example"
        class="q-py-sm"
      >
        <div>Example {{ idx + 1 }}:</div>
        <div class="q-mx-sm">
          <div>Input: {{ example.input }}</div>
          <div>Output: {{ example.output }}</div>
        </div>
      </div>
    </div>
    <div v-if="task?.constraints" class="q-my-sm">
      <div>Constraints:</div>
      <ul class="q-px-md">
        <li
          v-for="constraint in task.constraints"
          :key="constraint"
          class="q-pb-sm"
        >
          {{ constraint }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const task = ref(null);
const route = useRoute();
const routeId = route.params.id;

const $q = useQuasar();
onMounted(() => {
  api
    .get(`tasks/${routeId}`)
    .then((response) => {
      task.value = response?.data || [];
    })
    .catch((error) => {
      $q.notify({
        message: 'Error',
        color: 'negative',
      });
      console.error('Error fetching task:', error);
    });
});
</script>
