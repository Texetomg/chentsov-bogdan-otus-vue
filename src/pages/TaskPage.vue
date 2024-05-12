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
            <TaskDescription />
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
            <SolutionWidget :hSplitterModel="hSplitterModel" />
          </q-card>
        </template>
      </q-splitter>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import CommentsWidget from 'src/components/taskPageComponets/CommentsWidget.vue';
import SolutionWidget from 'src/components/taskPageComponets/SolutionWidget.vue';
import TaskDescription from 'src/components/taskPageComponets/TaskDescription.vue';
import { ref } from 'vue';
const vSplitterModel = ref(50);
const hSplitterModel = ref(50);
</script>
