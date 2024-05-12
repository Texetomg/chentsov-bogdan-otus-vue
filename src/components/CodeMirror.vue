<template>
  <codemirror
    v-model="model"
    placeholder="Code goes here..."
    :style="{
      height: `calc(100vh / 100 * ${props.height} - 200px)`,
      minHeight: '100px',
    }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<script setup lang="ts">
import { ModelRef, defineProps, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const extensions = [javascript()];
const props = defineProps(['height']);

const model: ModelRef<string> = defineModel();

const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};
</script>
