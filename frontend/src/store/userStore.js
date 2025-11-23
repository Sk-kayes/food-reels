import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const fetchCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/me`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
        throw error;
    }
};