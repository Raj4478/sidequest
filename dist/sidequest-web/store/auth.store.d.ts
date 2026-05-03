interface User {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
}
interface AuthStore {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (v: boolean) => void;
    login: (user: User, access_token: string, refresh_token: string) => void;
    logout: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AuthStore>>;
export {};
