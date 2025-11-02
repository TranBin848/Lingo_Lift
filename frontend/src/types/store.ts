import type {User} from "./index";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    signUp : (username: string, email: string, password: string, firstName:string, lastName:string) => Promise<void>;

    signIn : (username: string, password: string) => Promise<void>;

    clearState : () => void;

    signOut : () => Promise<void>;
}