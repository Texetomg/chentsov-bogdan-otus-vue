<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" v-if="tasks" style="width: 500px">
      <q-table
        class="text-grey-9"
        title="Tasks"
        :rows="tasks"
        row-key="name"
        :columns="columns"
      >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <a :href="`tasks/${props.value.id}`">{{ props.value.name }}</a>
          </q-td>
        </template>
      </q-table>
    </div>
    <TableSkeleton v-if="!tasks" />
  </q-page>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { onMounted, ref } from 'vue';
import TableSkeleton from 'src/components/skeletons/TableSkeleton.vue';
import { api } from 'src/boot/axios';
const tasks = ref<QTableProps['rows']>(null);

onMounted(() => {
  api
    .get('tasks')
    .then((response) => {
      tasks.value = response?.data || [];
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
});

defineOptions({
  name: 'IndexPage',
});

const columns: QTableProps['columns'] = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row) => row,
    sortable: true,
    sort: (a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    },
  },
  {
    name: 'difficulty',
    required: true,
    label: 'Difficulty',
    align: 'left',
    field: (row) => row.difficulty,
    sortable: true,
  },
];
</script>
