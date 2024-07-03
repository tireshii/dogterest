import useSystem from "../hooks/useSystem";
import DogCard from "./dogcard";

const Content = () => {
    const { dogs, toggleLiked, loading, likedDogs } = useSystem();

    return (
        <div className="content">
            <div className="dog-card-container">
                {dogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} toggleLiked={toggleLiked} likedDogs={likedDogs} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Content;