import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref(null);
  const errors = ref([]);
  const route = useRouter();
  const signin = async (payload: { email: string; password: string }) => {
    errors.value = null;
    try {
      const res = await api.post('auth/login', payload);
      authInfo.value = res.data;
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        route.push('/');
      }
    } catch (err) {
      errors.value = err.response?.data?.message || [];
    }
  };

  const signup = async (payload: {
    login: string;
    email: string;
    password: string;
  }) => {
    errors.value = null;
    try {
      const res = await api.post('users', payload);
      authInfo.value = res.data;
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        route.push('/');
      }
    } catch (err) {
      errors.value = err.response?.data?.message || [];
    }
  };

  return { signin, signup, authInfo, errors };
});
