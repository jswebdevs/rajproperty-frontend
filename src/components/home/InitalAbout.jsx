import img from "../../assets/img/iniabout.webp";
import { Helmet } from "react-helmet";

const InitialAbout = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Learn about RajProperty – your trusted partner for buying lands, flats, and houses in Rajshahi City, Bangladesh. Local expertise, complete legal assurance, and reliable deals."
        />
        <meta
          name="keywords"
          content="about, RajProperty, Rajshahi, real estate, trusted, property partner, buy, land, house, apartment, legal, Bangladesh"
        />
        <meta
          property="og:title"
          content="About RajProperty - Your Trusted Real Estate Partner"
        />
        <meta
          property="og:description"
          content="RajProperty connects buyers and sellers for lands, apartments, houses, and commercial spaces in Rajshahi with transparency and local expertise."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rajproperty.site/logo.png" />
      </Helmet>
      <section
        className="px-[5%] py-16 bg-gradient-to-br from-white via-blue-50 to-emerald-50"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side (text with subtle glass effect) */}
          <div className="p-6 md:p-12 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl md:w-1/2 flex flex-col items-center lg:items-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight text-center">
              Your Trusted Real Estate Partner
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Looking for the perfect land, house, or apartment in Rajshahi?
              RajProperty is your trusted real estate partner, offering reliable
              and transparent property solutions tailored to your needs. Whether
              you want to buy a residential plot, a ready apartment, or a
              commercial space, we provide the best deals with complete legal
              assurance.
            </p>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer max-w-sm">
              Connect
            </button>
          </div>

          {/* Right side (image with hover scale effect) */}
          <div className="flex justify-center md:justify-end md:w-1/2">
            <img
              src={img}
              alt="About"
              className="h-full w-full max-w-md rounded-3xl shadow-2xl transition-transform transform hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default InitialAbout;
