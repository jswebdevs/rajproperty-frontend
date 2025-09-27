import { Link } from "react-router";
import video from "../../assets/vid/heroBG.mp4";
const HeroSection = () => {
    return (
      <div>
        <div className="relative h-screen w-full overflow-hidden p-0">
          <video
            src={video}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-5xl font-bold">Where Trust Meets</h1>
            <h1 className="text-5xl font-bold">Property</h1>
            <p className="mt-4 text-lg">
              Seamless solutions for buying and selling renting properties.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
              <Link to="/contact">Contact</Link>
            </button>
            <p className="mt-4">★★★★★</p>
            <p className="uppercase">Trusted by countless satisfied clients</p>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;