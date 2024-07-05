import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Dog, DogsResponse, ErrorType } from "../resources/types";
import { BASE_URL } from "../resources/constants";

const useSystem = () => {
    const [error, setError] = useState<ErrorType | null>(null);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [likedDogs, setLikedDogs] = useState<Dog[]>(() => {
        const storedLikedDogs = localStorage.getItem('likedDogs');
        return storedLikedDogs ? JSON.parse(storedLikedDogs) : [];
    });

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
    });

    const handleError = (err: AxiosError<ErrorType>) => {
        const errorMessage = err.response?.data.message || err.message;
        setError({ message: errorMessage });
    };

    const toggleLiked = async (dog: Dog) => {
        const updatedLikedDogs = likedDogs.some(d => d.id === dog.id)
            ? likedDogs.filter(d => d.id !== dog.id)
            : [...likedDogs, dog];

        setLikedDogs(updatedLikedDogs);
        localStorage.setItem('likedDogs', JSON.stringify(updatedLikedDogs));

        try {
            await axiosInstance.post(`${BASE_URL}/dogs/like/${dog.id}`);
        } catch (error) {
            handleError(error as AxiosError<ErrorType>);
        }
    };
    
    const getDogs = async (pageNumber: number): Promise<DogsResponse> => {
        try {
            const response = await axiosInstance.get<DogsResponse>(`${BASE_URL}/dogs?page=${pageNumber}`);
            console.log(response)
            setDogs((prevDogs) => {
                const newDogsMap = new Map(prevDogs.map(dog => [dog.id, dog]));
                response.data.forEach(dog => newDogsMap.set(dog.id, dog));
                return Array.from(newDogsMap.values());
            });
            return dogs
        } catch (error) {
            handleError(error as AxiosError<ErrorType>);
            throw error;
        }
    };
    useEffect(() => {getDogs(page)}, [page])
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (windowHeight + scrollTop >= documentHeight - 200) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    console.log(dogs)
    return {
        error,
        getDogs,
        toggleLiked,
        likedDogs,
        dogs,
        loading,
    };
};

export default useSystem;