import img from "../../assets/img/aboutInitial.avif"
const InitialAbout = () => {
  return (
    <section className="px-[5%] py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side (text) */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#202020]">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-gray-600 mb-6">
            Looking for the perfect land, house, or apartment in Rajshahi? RajProperty is your trusted real estate partner, offering reliable and transparent property solutions tailored to your needs. Whether you want to buy a residential plot, a ready apartment, or a commercial space, we provide the best deals with complete legal assurance.
          </p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md">
            Connect
          </button>
        </div>

        {/* Right side (image) */}
        <div className="flex justify-center md:justify-end">
          <img
            src={img}
            alt="About"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default InitialAbout;
