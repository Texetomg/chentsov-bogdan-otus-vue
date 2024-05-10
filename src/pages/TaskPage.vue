<template>
  <q-splitter
    v-model="vSplitterModel"
    style="height: calc(100vh - 52px); width: 100vw"
  >
    <template v-slot:before>
      <q-card
        class="q-ma-md column justify-between no-wrap"
        style="height: calc(100vh - 92px)"
      >
        <q-scroll-area style="width: 100%; height: calc(100vh - 52px)">
          <div
            class="column justify-between no-wrap"
            style="height: calc(100vh - 102px)"
          >
            <div class="q-pa-md">
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
            <q-list bordered class="rounded-borders">
              <q-expansion-item icon="chat_bubble_outline" label="Discussion">
                <CommentsWidget />
              </q-expansion-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-card>
    </template>
    <template v-slot:after>
      <q-splitter v-model="hSplitterModel" horizontal emit-immediately>
        <template v-slot:before>
          <q-card
            class="q-ma-md column justify-between no-wrap"
            style="height: calc(100% - 32px); min-height: 200px"
          >
            <div class="q-mx-md q-py-md">
              <CodeMirror :height="hSplitterModel" />
            </div>
            <div class="q-ma-md">
              <q-btn
                color="secondary"
                label="Solution"
                class="float-right"
              ></q-btn>
            </div>
          </q-card>
        </template>
      </q-splitter>
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
const vSplitterModel = ref(50);
const hSplitterModel = ref(50);
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
