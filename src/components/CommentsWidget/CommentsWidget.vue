<template>
  <q-card class="q-pa-md q-ma-md column justify-between no-wrap" bordered>
    <q-scroll-area style="width: 100%; height: 400px">
      <q-chat-message
        v-for="comment in comments"
        :avatar="`https://avatar.iran.liara.run/username?username=${comment.user.login}`"
        :key="comment.id"
        :name="comment.user.login"
        :text="[comment.value]"
        :sent="authInfo.login === comment.user.login"
      ></q-chat-message>
    </q-scroll-area>
    <div>
      <q-input
        outlined
        v-model="newMsg"
        placeholder="Type comment here..."
        class="q-py-md"
      ></q-input>
      <q-btn
        color="secondary"
        label="Comment"
        class="float-right"
        @click="sendMessage"
      ></q-btn>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = route.params.id;
const $q = useQuasar();
const comments = ref(null);
const store = useAuthStore();
const { authInfo } = store;
const newMsg = ref(null);
const sendMessage = () => {
  const newComment = {
    task: routeId,
    user: authInfo.id,
    value: newMsg.value,
    rating: 0,
  };

  api.post('comments', newComment);
};

onMounted(() => {
  api
    .get(`comments/${routeId}`)
    .then((response) => {
      comments.value = response?.data || [];
    })
    .catch((error) => {
      $q.notify({
        message: 'Error',
        color: 'negative',
      });
      console.error('Error fetching discussion:', error);
    });
});
</script>
