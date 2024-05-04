import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref(null);
  const errors = ref([]);

  const signin = async (payload: { email: string; password: string }) => {
    errors.value = null;
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        payload
      );
      authInfo.value = res.data;
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
      const res = await axios.post('http://localhost:3000/api/users', payload);
      authInfo.value = res.data;
    } catch (err) {
      errors.value = err.response?.data?.message || [];
    }
  };

  return { signin, signup, authInfo, errors };
});
