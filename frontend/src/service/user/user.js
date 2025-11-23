import axios from 'axios';
import { API_BASE_URL } from './config/api';

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/all`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all users:', error);
        throw error;
    }
};

// Get user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};