import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Youtube,
  Instagram,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "../components/global/ContactForm";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  return (
    <div className="relative bg-[#0a0a0a] text-gray-200 min-h-screen py-16 px-6 overflow-hidden">
      <Helmet>
        <title>Contact Us | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="Contact RajProperty for questions, property inquiries, and customer support in Rajshahi City, Bangladesh. WhatsApp, email, 24/7 phone, and social links."
        />
        <meta
          name="keywords"
          content="contact, RajProperty, Rajshahi, phone, email, WhatsApp, address, support, real estate, Bangladesh"
        />
        <meta property="og:title" content="Contact Us - RajProperty" />
        <meta
          property="og:description"
          content="Get in touch with RajProperty via phone, WhatsApp, email, or social media for all property-related questions and support."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Optional Background Video */}

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Get in <span className="text-green-500">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions, property inquiries, or partnership ideas? We’d love
            to hear from you — reach out to <b>Raj Property</b> anytime.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-40 flex flex-col md:flex-row border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-[#111]/70 shadow-lg"
        >
          {/* Left Info Section */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 bg-[#111]/70 p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Contact Information
              </h2>
              {/* Full-width Info Boxes */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] rounded-lg">
                  <MapPin className="w-6 h-6 text-green-500" />
                  <div>
                    <a
                      href="https://maps.app.goo.gl/6GYvYSQ1QLe4Dq326"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="font-semibold text-white">Our Location</h3>
                      <p className="text-gray-400">Rajshahi, Bangladesh</p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] rounded-lg">
                  <Mail className="w-6 h-6 text-green-500" />
                  <div>
                    <a
                      href="mailto:info@rajproperty.site"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="font-semibold text-white">Email</h3>
                      <p className="text-gray-400">info@rajproperty.com</p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] rounded-lg">
                  <Phone className="w-6 h-6 text-green-500" />
                  <div>
                    <a
                      href="tel:01711-715575"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="font-semibold text-white">Phone</h3>
                      <p className="text-gray-400">+880 1711-715575</p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <a
                      href="https://wa.me/8801711715575"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="font-semibold text-white">WhatsApp</h3>
                      <p className="text-gray-400">+880 1711-715575</p>
                    </a>
                  </div>
                </div>
                {/* 24/7 Info */}
                <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] rounded-lg">
                  <Clock className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-white">Service Hours</h3>
                    <p className="text-gray-400">
                      We Are Available: <b>24x7</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <h3 className="text-xl font-semibold mb-4 text-white text-center">
                Follow Us
              </h3>
              <div className="flex gap-6 justify-center flex-wrap">
                <a
                  href="https://facebook.com/rajproperty.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0f0f0f] hover:bg-green-600 rounded-full transition transform hover:scale-101 cursor-pointer"
                >
                  <Facebook className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </a>
                <a
                  href="https://youtube.com/@"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0f0f0f] hover:bg-green-600 rounded-full transition transform hover:scale-101 cursor-pointer"
                >
                  <Youtube className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0f0f0f] hover:bg-green-600 rounded-full transition transform hover:scale-101 cursor-pointer"
                >
                  <Instagram className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </a>
              </div>
            </motion.div>
          </motion.div>
          {/* Right Contact Form */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-800"
          >
            <ContactForm />
          </motion.div>
        </motion.div>
        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        ></motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
