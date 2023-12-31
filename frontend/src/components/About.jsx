import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="container mt-4"
      style={{ height: "100vh" }}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
    >
      <section id="about-us">
        <h1>About Us</h1>
        <p>
          Welcome to ReFurnished, your trusted marketplace for buying and
          selling pre-loved furniture.
        </p>
        <p>
          At ReFurnished, we're passionate about making sustainable living
          accessible. We're on a mission to connect furniture enthusiasts and
          provide a platform for them to buy quality furnitures at low price.
        </p>
      </section>
      <section id="our-story">
        <h2>Our Journey</h2>
        <p>
          Today, ReFurnished empowers you to buy quality used furniture and give
          a second life to your old pieces. Our commitment is to great value for
          both buyer and seller.
        </p>
      </section>
      <section id="what-we-believe">
        <h2>Our Beliefs</h2>
        <ul>
          <li>
            <strong>Sustainability:</strong> We believe in reducing waste and
            promoting sustainable living through the reuse of furniture.
          </li>
          <li>
            <strong>Variety:</strong> We offer a diverse selection of pre-owned
            furniture, from vintage classics to modern treasures.
          </li>
          <li>
            <strong>Community:</strong> We're building a community of furniture
            lovers who value quality and style.
          </li>
        </ul>
      </section>
      <section id="join-us">
        <h2>Join Our Community</h2>
        <p>
          We invite you to join us on this journey to furnish your space
          sustainably. Explore ReFurnished,{" "}
          <Link to="/browse">Browse Furnitures</Link>.
        </p>
        <p>
          Thank you for being a part of the ReFurnished community. Together, we
          can create a more sustainable and stylish world.
        </p>
      </section>
    </motion.div>
  );
};

export default About;
