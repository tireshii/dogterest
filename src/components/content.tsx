import CircularProgress from '@mui/material/CircularProgress';
import DogCard from './dogcard';
import useSystem from '../hooks/useSystem'; 

const Content = () => {
    const { dogs, toggleLiked, loading, likedDogs } = useSystem(); 
    return (
        <div className="content">
            <div className="dog-card-container">
                {dogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} toggleLiked={toggleLiked} likedDogs={likedDogs} />
                ))}
            </div>
            {loading && <CircularProgress />}
        </div>
    );
};

export default Content;