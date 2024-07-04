import useSystem from "../hooks/useSystem";
import DogCard from "./dogcard";

const LikedDogs = () => {
    const { likedDogs, toggleLiked } = useSystem();

    return (
        <div className="content">
            <h2>Liked Dogs</h2>
            <div className="dog-card-container">
                {likedDogs.map((dog) => (
                    <DogCard toggleLiked={toggleLiked} key={dog.id} dog={dog} likedDogs={likedDogs}/>
                ))}
            </div>
        </div>
    );
};

export default LikedDogs;