import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref(null);
  const errors = ref([]);
  const route = useRouter();
  const $q = useQuasar();
  const signin = async (payload: { email: string; password: string }) => {
    errors.value = null;
    try {
      const res = await api.post('auth/login', payload);
      authInfo.value = res.data;
      if (res.data?.token) {
        $q.notify({
          message: 'Login successful',
          color: 'positive',
        });
        localStorage.setItem('token', res.data.token);
        route.push('/');
      }
    } catch (err) {
      $q.notify({
        message: 'Login failed',
        color: 'negative',
      });
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
        $q.notify({
          message: 'Creation successful',
          color: 'positive',
        });
      }
    } catch (err) {
      errors.value = err.response?.data?.message || [];
      $q.notify({
        message: 'Creation failed',
        color: 'negative',
      });
    }
  };

  const signout = () => {
    authInfo.value = null;
    localStorage.removeItem('token');
    route.push('/signin');
    $q.notify({
      message: 'Logout successful',
      color: 'positive',
    });
  };

  return { signin, signup, signout, authInfo, errors };
});
