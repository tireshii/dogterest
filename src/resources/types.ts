export type Dog = {
    id: number;
    link: string;
    likes: number;
    name: string;
};

export type DogsResponse = Dog[];

export type ErrorType = {
    message: string;
};
export type DogCardProps = {
    dog: Dog;
    toggleLiked: (dog: Dog) => void;
    likedDogs: Dog[],
};