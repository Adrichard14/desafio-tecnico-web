import { UserFormData } from '../types/UserCreateForm';
import apiClient from './apiClient';

export const createUser = async (userData: UserFormData): Promise<UserFormData> => {
    const response = await apiClient.post('/user', userData);
    return response.data;
};

