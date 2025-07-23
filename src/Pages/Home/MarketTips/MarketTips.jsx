import React from "react";
import { motion } from "framer-motion";

const MarketTips = () => {
  const tips = [
    {
      title: "🥬 কিভাবে টাটকা সবজি চেনা যায়?",
      description:
        "সবজি কিনতে গেলে এর রঙ, গন্ধ এবং মোলায়েমতা দেখে বুঝতে পারো টাটকা কিনা। যেমন কপি বা পালং পাতার সবুজ ভাব থাকলে সেটা টাটকা।",
    },
    {
      title: "🧼 হাইজিন বজায় রাখার টিপস",
      description:
        "বাজার থেকে বাড়ি ফিরে প্রোডাক্ট ভালো করে পানি দিয়ে ধুয়ে ফেলো। শুকনো জিনিস আলাদা করে সংরক্ষণ করো।",
    },
    {
      title: "🍎 মৌসুমি ফল চেনার কৌশল",
      description:
        "মৌসুমি ফল যেমন আম, লিচু — এদের গন্ধ ও রঙ দিয়ে সহজে বোঝা যায় টাটকা কিনা। পাকা ফলে প্রাকৃতিক সুবাস থাকবে।",
    },
  ];

  // Parent container animation variant
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.25,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Each card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          📚 Market Tips & Food Safety
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            >
              <h3 className="text-xl font-semibold text-green-800">{tip.title}</h3>
              <p className="mt-3 text-gray-700 text-sm">{tip.description}</p>
              
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MarketTips;
