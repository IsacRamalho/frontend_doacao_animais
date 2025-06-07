import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosPromise } from 'axios';
import type { AnimalData } from '../interface/AnimalData';

const API_URL = "http://localhost:8080/";

const postData = async (data: AnimalData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + 'animais', data);
    return response;
};

const updateData = async (data: AnimalData): AxiosPromise<any> => {
    return axios.put(API_URL + `animais/${data.id}`, data);
};

const deleteData = async (id: any): Promise<void> => {
    await axios.delete(API_URL + `animais/${id}`);
};
export function useAnimalDataMutate() {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animal-data'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animal-data'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animal-data'] });
        },
    });

    return { createMutation, updateMutation, deleteMutation };
};