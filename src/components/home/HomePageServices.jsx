import { Home, Building, Star} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router";

// Animation variants for card entrance & stagger
const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      bounce: 0.38,
      duration: 0.65,
    },
  }),
};

const HomePageServices = () => {
  const services = [
    {
      icon: (
        <motion.div
          whileHover={{ scale: 1.22, rotate: 6 }}
          className="transition-all duration-200"
        >
          <Home className="w-12 h-12 text-cyan-400 drop-shadow" />
        </motion.div>
      ),
      title: "Property Listing",
      description:
        "Explore a wide range of lands, flats, and houses across different locations.",
    },
    {
      icon: (
        <motion.div
          whileHover={{ scale: 1.22, rotate: -6 }}
          className="transition-all duration-200"
        >
          <Building className="w-12 h-12 text-green-400 drop-shadow" />
        </motion.div>
      ),
      title: "Property Management",
      description:
        "Manage your properties efficiently with our dedicated support and tools.",
    },
    {
      icon: (
        <motion.div
          whileHover={{ scale: 1.22, rotate: 8 }}
          className="transition-all duration-200"
        >
          <Star className="w-12 h-12 text-yellow-400 drop-shadow" />
        </motion.div>
      ),
      title: "Premium Services",
      description:
        "Get featured listings, expert guidance, and top-notch property solutions.",
    },
  ];

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover RajProperty's services: property listing, management, featured listings, and expert real estate solutions for Rajshahi City, Bangladesh."
        />
        <meta
          name="keywords"
          content="services, property listing, property management, premium, featured, RajProperty, Rajshahi, Bangladesh, real estate, expert guidance"
        />
        <meta
          property="og:title"
          content="RajProperty - Services for Property Buyers & Sellers"
        />
        <meta
          property="og:description"
          content="Get property management, featured listings, and expert guidance from RajProperty. Serving Rajshahi City property buyers and sellers."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-[5%] py-16 bg-gradient-to-br from-[#090a0aaa] via-[#171717bb] to-[#0b0b0bdd] text-gray-200 overflow-x-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-gray-400 mt-2 text-lg">What do we do?</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              className="flex flex-col items-center text-center p-8 rounded-3xl
              bg-gradient-to-br from-[#111111]/80 via-[#1a1a1a]/70 to-[#111111]/80
              border border-gray-800 backdrop-blur-md shadow-lg hover:shadow-cyan-500/40
              transition-transform transform hover:-translate-y-3 duration-300 group cursor-pointer"
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.25 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="mb-5 group-hover:scale-110 transition-transform duration-200 ease-out">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white drop-shadow">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link to="/services" className="btn btn-accent">
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePageServices;
