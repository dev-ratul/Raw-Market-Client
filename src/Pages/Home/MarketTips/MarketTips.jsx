import React from "react";
import { motion } from "framer-motion";

const MarketTips = () => {
  const tips = [
    {
      title: "🥬 How to Identify Fresh Vegetables?",
      description:
        "When buying vegetables, check their color, smell, and texture to determine freshness. For example, if spinach or cabbage has a vibrant green color, it's likely fresh.",
    },
    {
      title: "🧼 Hygiene Tips",
      description:
        "After returning from the market, wash all products thoroughly with water. Store dry items separately in clean containers.",
    },
    {
      title: "🍎 How to Identify Seasonal Fruits",
      description:
        "Fruits like mangoes or lychees can be identified by their natural scent and color. Ripe seasonal fruits usually have a fresh and sweet aroma.",
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <h3 className="text-xl font-semibold text-green-800">
                {tip.title}
              </h3>
              <p className="mt-3 text-gray-700 text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MarketTips;
