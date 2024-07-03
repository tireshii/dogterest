import React from "react";
import { DogCardProps } from "../resources/types";

const DogCard: React.FC<DogCardProps> = ({ dog, toggleLiked, likedDogs }) => {
    const isLiked = likedDogs.some(d => d.id === dog.id);

    return (
        <div className="dog-card">
            <img src={dog.link} alt={`Dog ${dog.id}`} className="dog-image" />
            <p className="dog-likes">Likes: {dog.likes}</p>
            <button onClick={() => toggleLiked(dog)} className="like-button">
                {isLiked ? "Unlike" : "Like"}
            </button>
        </div>
    );
};
export default DogCard