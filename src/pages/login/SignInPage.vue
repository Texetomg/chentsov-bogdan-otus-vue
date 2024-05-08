<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import FormErrors from './FormErrors.vue';

const email = ref();
const password = ref();
const isPwd = ref(true);

const signin = async () => {
  await useAuthStore().signin({
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="email"
              label="Email Address"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              label="Password"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                ></q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
              @click="signin"
              :disable="!email || !password"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="/signup"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
          <FormErrors />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
