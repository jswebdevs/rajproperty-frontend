import arifvai from "../assets/img/team/arifvai.jpg";
import shuvovai from "../assets/img/team/shuvovai.png";
import jamil from "../assets/img/team/jamil.png";
import najmul from "../assets/img/team/nazmul.jpg";
import { Helmet } from "react-helmet";

// Example team data
// const teamMembers = [
//   {
//     name: "Ariful Islam Arif",
//     role: "CEO & Founder",
//     responsibilities:
//       "Leading the company, overseeing strategic decisions, and building partnerships.",
//     image: arifvai,
//   },
//   {
//     name: "Imrul Kayes Shuvo",
//     role: "Chief Technical Officer",
//     responsibilities:
//       "Managing all technical infrastructure, product architecture, and development teams.",
//     image: shuvovai,
//   },
//   {
//     name: "Md. Jamil Shikder",
//     role: "Web Developer",
//     responsibilities:
//       "Responsible for building and maintaining the company’s web platforms.",
//     image: jamil,
//   },
//   {
//     name: "Nazmul Haque Noor",
//     role: "Marketing Officer",
//     responsibilities:
//       "Responsible for checking paperworks and communicating with seller and buyer",
//     image: najmul,
//   },
// ];

const AboutUs = () => {
  return (
    <div className="bg-black text-gray-200 px-[5%] py-10">
      <Helmet>
        <title>About Us | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="Meet the RajProperty team, learn about our mission and vision, and see how we connect buyers and sellers for property in Rajshahi City, Bangladesh."
        />
        <meta
          name="keywords"
          content="about us, RajProperty, Rajshahi, Bangladesh, team, property agency, real estate, mission, vision, service"
        />
        <meta property="og:title" content="About Us - RajProperty Team" />
        <meta
          property="og:description"
          content="Learn about RajProperty's mission, vision, services, and meet our team serving Rajshahi City property buyers and sellers."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
          About Raj Property
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Connecting Buyers and Sellers Across Rajshahi Seamlessly
        </p>
      </section>
      {/* Founder Section */}
      <section className="px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full mt-3 lg:mt-0lg:w-1/2">
          <img
            src={arifvai}
            alt="Founder"
            className="rounded-lg shadow-lg max-w-l mx-auto md:mx-0 transition-transform"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-green-400">
            A Word From Our Founder
          </h2>
          <p className="text-gray-300 text-lg">
            “At Raj Property, our journey began with a simple goal: to make
            property transactions transparent, secure, and empowering for every
            individual and family in Rajshahi. We know that buying or selling a
            property is more than a transaction—it’s a life-changing decision
            that deserves care and integrity at every step. Our mission isn’t
            just to connect buyers and sellers; it’s to create an experience
            built on trust, fairness, and unwavering support. We dedicate
            ourselves to providing clear guidance, honest communication, and
            innovative solutions that make the process seamless for all. By
            combining local expertise with advanced technology, we ensure that
            our clients achieve their goals and dreams with confidence. Our team
            is passionate about helping you navigate the complexities of
            property decisions—whether you’re making your first purchase or
            growing your investments. We believe that our responsibility extends
            beyond business: we’re committed to building stronger communities
            and lasting relationships. Thank you for trusting Raj Property with
            your real estate journey. Together, let’s shape a future where
            everyone feels at home”
          </p>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="mx-auto py-16 px-4 grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Our Mission",
            content:
              "To provide a trustworthy, transparent, and user-friendly platform for property buyers and sellers across Rajshahi",
          },
          {
            title: "Our Vision",
            content:
              "To become Rajshahi’s most reliable and innovative property platform, empowering users with easy access to property solutions.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-300">{item.content}</p>
          </div>
        ))}
      </section>
      {/* Services Section */}
      <section className="mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-green-400 text-center mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Free For Buyers",
              content:
                "Buyers can explore and purchase properties without any fees or hidden charges.",
            },
            {
              title: "Transparent Seller Fees",
              content:
                "Sellers pay a clear and fair 2% commission with minimum thresholds.",
            },
            {
              title: "Secure Transactions",
              content:
                "All property transactions are handled safely and transparently on our platform.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.content}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Team Section */}
      {/* <section className="mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-green-400 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-300 mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">
                  {member.responsibilities}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      {/* Call-to-Action */}
      <section className="py-16 px-4 text-center bg-gray-900">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          Ready to Find Your Property?
        </h2>
        <a
          href="/properties"
          className="inline-block bg-green-400 text-black font-semibold px-8 py-4 rounded-lg hover:bg-green-500 transition-colors"
        >
          Browse Listings
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
