<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for="comment in comments"
        :avatar="`https://avatar.iran.liara.run/username?username=${comment.user.login}`"
        :key="comment.id"
        :name="comment.user.login"
        :text="[comment.value]"
        :sent="authInfo.login === comment.user.login"
      ></q-chat-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const $q = useQuasar();
const comments = ref(null);
const store = useAuthStore();
const { authInfo } = store;
onMounted(() => {
  const routeId = route.params.id;

  api
    .get(`comments/${routeId}`)
    .then((response) => {
      console.log(response);
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
