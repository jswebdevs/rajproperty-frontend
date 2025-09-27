import HeroSection from '../components/single/HeroSection';
import HomePageServices from '../components/single/HomePageServices';
import InitialAbout from '../components/single/InitalAbout';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <InitialAbout></InitialAbout>
            <HomePageServices></HomePageServices>
        </div>
    );
};

export default HomePage;