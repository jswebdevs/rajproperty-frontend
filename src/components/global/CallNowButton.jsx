import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";


const CallNowButton = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Reach RajProperty instantly for property support in Rajshahi City, Bangladesh. Call now for quick assistance on buying or selling property."
        />
        <meta
          property="og:description"
          content="Contact RajProperty for expert property advice and support in Rajshahi City. Call us directly."
        />
      </Helmet>
      <motion.a
        href="tel:+8801711715575"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
        }}
        target="_blank"
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <PhoneCall size={20} />
        </motion.div>
        <button className="font-semibold">Call Us Now</button>
      </motion.a>
    </>
  );
};

export default CallNowButton;
