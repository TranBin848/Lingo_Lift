import api from '../lib/axios'

export const authService = {
    signUp: async({ username, email, password, firstName, lastName }: { username: string; email: string; password: string; firstName: string; lastName: string; }) => {
        const res = await api.post('/auth/signup', { username, email, password, firstName, lastName,}, { withCredentials: true });
        return res.data;
        },

        signIn: async({ username, password }: { username: string; password: string; }) => {
        const res = await api.post('/auth/signin', { username, password }, { withCredentials: true });
        return res.data;
    },

    signOut: async() => {
        const res = await api.post('/auth/signout', {}, { withCredentials: true });
        return res.data;
    },

    fetchMe: async() => {
        const res = await api.get('/user/me', { withCredentials: true });
        return res.data.user;
    },

    refresh: async() => {
        const res = await api.post('/auth/refresh', {}, { withCredentials: true });
        return res.data.accessToken;
    }
}