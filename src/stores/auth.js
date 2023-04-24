import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/services/apiCall.js';

export const AuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));

    const user = ref(JSON.parse(localStorage.getItem('user')));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    function setUser(userValue) {
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue;
    }

    function checkAuthState() {
        if (token.value && user.value) {
            // return token.value && user.value;
            return true;
        }
        else {
            return false;
        }
        // return Boolean(token.value && user.value);

    }

    async function checkToken() {
        try {
            const { data } = await http.post('/auth/verify', {}, {
                headers: {
                    Authorization: 'Bearer ' + token.value
                }
            });
            // console.log('retorno da api para verificação de token', data);
            return data;
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function clear() {
        try {
            const { data } = await http.post('/auth/logout', {}, {
                headers: {
                    Authorization: 'Bearer ' + token.value
                }
            });
            console.log('Retorno da api para logout: ', data);
        } catch (error) {
            console.log(error.response.data);
        }

        console.log('Limpando local storage e usuario/token...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        token.value = '';
        user.value = '';
    }

    return {
        token,
        user,
        setToken,
        setUser,
        checkToken,
        checkAuthState,
        clear
    }
})