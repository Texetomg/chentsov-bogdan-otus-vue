<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';

const login = ref();
const email = ref();
const password = ref();
const isPwd = ref(true);
//const errors = useAuthStore().errors;

const signup = async () => {
  await useAuthStore().signup({
    login: login.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  {{ console.log(useAuthStore().errors) }}
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
            <div class="text-grey-8">Sign up below to create your account</div>
          </q-card-section>
          <q-card-section>
            <q-input dense outlined v-model="login" label="Login"> </q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
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
              label="Sign up"
              no-caps
              class="full-width"
              @click="signup"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Have an account?
              <a
                href="/signin"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign in.</a
              >
            </div>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <span
              v-if="
                useAuthStore().errors?.length &&
                !Array.isArray(useAuthStore().errors)
              "
            >
              {{ useAuthStore().errors }}
            </span>
          </q-card-section>
          <ul
            v-if="
              useAuthStore().errors?.length &&
              Array.isArray(useAuthStore().errors)
            "
          >
            <li v-for="message in useAuthStore().errors" :key="message">
              {{ message }}
            </li>
          </ul>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
