import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosPromise } from 'axios'
import type { AnimalData } from '../interface/AnimalData';

const API_URL = "http://localhost:8080/";

const fetchData = async (): AxiosPromise<AnimalData[]> => {
    const response = axios.get(API_URL + 'animais')
    return response;
}
export function useAnimalData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey:['animal-data'],
        retry: 2
    }) 

    return {
        ...query,
        data: query.data?.data
    }
}

