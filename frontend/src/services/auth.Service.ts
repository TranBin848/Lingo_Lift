import { register, login, logout, refreshToken, getCurrentUser } from '../api/auth'

export const authService = {
    signUp: async({ username, email, password, firstName, lastName }: { username: string; email: string; password: string; firstName: string; lastName: string; }) => {
        // .NET API dùng fullName thay vì firstName + lastName
        const fullName = `${firstName} ${lastName}`.trim();
        const response = await register({ fullName, email, password });
        return {
            message: response.message,
            user: {
                email: response.email,
                fullName: response.fullName
            }
        };
    },

    signIn: async({ username, password }: { username: string; password: string; }) => {
        // .NET API dùng email thay vì username
        const response = await login({ email: username, password });
        return {
            accessToken: response.token,
            refreshToken: response.refreshToken,
            user: {
                email: response.email,
                fullName: response.fullName
            }
        };
    },

    signOut: async() => {
        // .NET API logout endpoint
        await logout();
        return { message: 'Logged out successfully' };
    },

    fetchMe: async() => {
        const user = await getCurrentUser();
        return user;
    },

    refresh: async() => {
        // .NET API refresh-token endpoint (uses cookies automatically)
        const response = await refreshToken();
        return response.token; // Return new access token
    }
}