<template>
  <div class="q-mx-md q-py-md">
    <CodeMirror :height="props.hSplitterModel" v-model="code" />
  </div>
  <div class="q-ma-md">
    <q-btn
      color="secondary"
      label="Solution"
      class="float-right"
      @click="updateSolution"
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import CodeMirror from 'src/components/CodeMirror.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = route.params.id;

const code = ref(null);
const solution = ref(null);

const props = defineProps(['hSplitterModel']);

const $q = useQuasar();

const updateSolution = () => {
  console.log(solution);
  if (!solution.value) {
    api
      .post(`solutions/${routeId}`, { value: code.value })
      .then(() => {
        $q.notify({
          message: 'Solution added',
          color: 'positive',
        });
      })
      .catch(() => {
        $q.notify({
          message: 'Solution add failed',
          color: 'negative',
        });
      });
  }
  if (solution.value) {
    api
      .patch(`solutions/${routeId}`, { value: code.value })
      .then(() => {
        $q.notify({
          message: 'Solution updated',
          color: 'positive',
        });
      })
      .catch(() => {
        $q.notify({
          message: 'Solution update failed',
          color: 'negative',
        });
      });
  }
};

const fetchSolution = () => {
  api.get(`solutions/${routeId}`).then((response) => {
    if (response?.data?.solution?.value) {
      solution.value = response.data.solution;
      code.value = response.data.solution.value;
    }
  });
};
onMounted(() => {
  fetchSolution();
});
</script>
