import DogCard from './dogcard';
import useSystem from '../hooks/useSystem'; 

const LikedDogs = () => {
    const { likedDogs, toggleLiked } = useSystem(); 

    return (
        <div className="content">
            <h2>Liked Dogs</h2>
            <div className="dog-card-container">
                {likedDogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} toggleLiked={toggleLiked} likedDogs={likedDogs} />
                ))}
            </div>
        </div>
    );
};

export default LikedDogs;