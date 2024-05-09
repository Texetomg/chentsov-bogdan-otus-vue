<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();
const { authInfo } = store;
defineOptions({
  name: 'MainLayout',
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-grey-9 shadow-1">
        <q-btn stretch flat label="Home" to="/"></q-btn>
        <q-toolbar-title />

        <q-btn stretch flat>
          <q-avatar size="42px">
            <img
              :src="`https://avatar.iran.liara.run/username?username=${authInfo?.login}`"
            />
          </q-avatar>
          <q-menu :offset="[5, 0]">
            <q-list>
              <q-item clickable v-close-popup to="/user">
                <q-item-section>
                  <q-item-label class="text-grey-9">Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                to="/user"
                @click="useAuthStore().signout()"
              >
                <q-item-section>
                  <q-item-label>Sign out</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
