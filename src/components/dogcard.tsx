import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DogCardProps } from '../resources/types';

const DogCard = ({ dog, toggleLiked, likedDogs }: DogCardProps) => {
    const isLiked = likedDogs.some(d => d.id === dog.id);
    const handleToggleLike = () => {
        toggleLiked(dog);
    };
    const isVideo = dog.link.endsWith('.mp4');
    return (
        <Card className="dog-card" sx={{ maxWidth: 345 }}>
            {isVideo ? <video src={dog.link} autoPlay loop muted></video> : <img src={dog.link} alt={`Dog ${dog.id}`}></img>}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                </Typography>
                <IconButton
                    aria-label="toggle-like"
                    onClick={handleToggleLike}
                    sx={{ color: isLiked ? 'red' : 'gray' }}
                >
                    <FavoriteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default DogCard;