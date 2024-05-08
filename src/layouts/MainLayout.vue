<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9 text-white">
        <q-btn stretch flat label="Home" to="/"></q-btn>
        <q-toolbar-title />
        <q-btn icon="person" stretch flat to="/user"></q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
});
</script>
