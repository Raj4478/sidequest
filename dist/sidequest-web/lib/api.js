'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
api.interceptors.response.use((res) => res, async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const res = await axios_1.default.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, { headers: { Authorization: `Bearer ${refreshToken}` } });
            const { access_token, refresh_token } = res.data.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            original.headers.Authorization = `Bearer ${access_token}`;
            return api(original);
        }
        catch {
            localStorage.clear();
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});
exports.default = api;
//# sourceMappingURL=api.js.map