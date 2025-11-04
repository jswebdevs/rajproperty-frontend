import {
  Building2,
  Home,
  MapPin,
  FileText,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const services = [
  {
    icon: MapPin,
    title: "Property Listing & Promotion",
    desc: "We help sellers list their properties effectively and reach verified buyers through our online platform and marketing channels.",
  },
  {
    icon: Home,
    title: "Buyer Assistance",
    desc: "We assist buyers in finding their dream property, verifying listings, and connecting with genuine sellers quickly.",
  },
  {
    icon: FileText,
    title: "Legal & Documentation Support",
    desc: "Our experts guide you through property papers, ownership transfer, and ensure legal transparency in every deal.",
  },
  {
    icon: ShieldCheck,
    title: "Property Verification",
    desc: "Each listing is verified to maintain trust and authenticity, protecting both buyers and sellers from fraudulent activities.",
  },
  {
    icon: Building2,
    title: "Property Valuation",
    desc: "We provide accurate property value estimates based on market trends, area, and property condition.",
  },
  {
    icon: PhoneCall,
    title: "Personalized Consultation",
    desc: "Need help? Get one-on-one consultation for buying, selling, or investing in real estate.",
  },
];

const Services = () => {
  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen py-16 px-6 overflow-hidden">
      <Helmet>
        <title>Our Services | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="See all real estate services by RajProperty—property listings, buyer help, legal support, property verification, valuation, and expert consultation in Rajshahi City, Bangladesh."
        />
        <meta
          name="keywords"
          content="real estate services, property listing, legal support, property verification, RajProperty, Rajshahi, Bangladesh, buyer assistance, property valuation, consultation"
        />
        <meta property="og:title" content="Services - RajProperty" />
        <meta
          property="og:description"
          content="Explore RajProperty's trusted services: verified listing, buyer assistance, legal & documentation, consultation and more in Rajshahi City, Bangladesh."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="text-green-500">Services</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          At Raj Property, we simplify buying and selling properties through
          verified listings, transparent communication, and trusted support at
          every step.
        </p>
      </motion.div>
      {/* Services Grid */}
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            aria-label={service.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(0,255,0,0.2)",
            }}
            className="bg-[#111] hover:bg-gradient-to-r hover:from-green-600 hover:to-green-400 transition-all duration-300 rounded-2xl p-6 border border-gray-800 hover:border-green-500"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 mb-4">
              <service.icon className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {service.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* Why Choose Us */}
      <motion.div
        className="max-w-5xl mx-auto mt-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Why Choose Raj Property?
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          We are committed to building trust in Bangladesh’s real estate market.
          With our team’s experience, transparency, and client-first approach —
          we make property transactions safe and hassle-free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Trusted Experts",
            "Verified Listings",
            "Fair Pricing",
            "Legal Guidance",
            "Dedicated Support",
          ].map((reason, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(0,255,0,0.2)",
              }}
              className="px-5 py-3 bg-[#111] border border-gray-800 rounded-full text-sm hover:border-green-500 transition"
            >
              {reason}
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* CTA Section */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Buy or List Your Property?
        </h2>
        <a
          href="/contact"
          className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg transition"
        >
          Contact Us Today
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
