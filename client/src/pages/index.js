import homeImage from '../assets/homeImage.png'
import Image from 'react-bootstrap/Image'

const Home = () => {
    return (
        <div>
            <Image src={homeImage} className="img" roundedCircle />
        </div>
    )
}

export default Home