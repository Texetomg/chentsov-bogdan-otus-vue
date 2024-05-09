<template>
  <q-splitter v-model="splitterModel" style="height: calc(100vh - 50px)">
    <template v-slot:before>
      <div class="q-pa-md" style="height: 50%">
        <div v-if="task?.name" class="text-h4 q-mb-md">
          {{ task.name }}
        </div>
        <div v-if="task?.description" class="q-my-md">
          {{ task.description }}
        </div>
        <div v-if="task?.examples" class="q-my-md">
          <div v-for="example in task.examples" :key="example">
            {{ example }}
          </div>
        </div>
        <div v-if="task?.constraints" class="q-my-md">
          <div v-for="constraint in task.constraints" :key="constraint">
            {{ constraint }}
          </div>
        </div>
      </div>
      <CommentsWidget />
    </template>
    <template v-slot:after>
      <div class="q-pa-md">
        <CodeMirror />
      </div>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import CodeMirror from 'src/components/CodeMirror.vue';
import CommentsWidget from 'src/components/CommentsWidget/CommentsWidget.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const splitterModel = ref(50);
const task = ref(null);
const route = useRoute();
const $q = useQuasar();

onMounted(() => {
  const routeId = route.params.id;
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
