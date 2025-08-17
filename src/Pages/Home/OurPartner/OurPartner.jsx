import React from "react";

const OurPartner = () => {
  // Partner data array
  const partners = [
    {

      image: "https://i.ibb.co.com/YBSvpmC8/download.png",
    },
    {

      image: "https://i.ibb.co.com/27VCmQD8/download-1.png",
    },
    {
    
      image: "https://rokomari.com/static/200/images/rokomari_logo.png",
    },
    {

      image:
        "https://i.ibb.co.com/KppzYKZz/brand-2.png",
    }
    ,
    {

      image:
        "https://i.ibb.co.com/1GCJt8Tj/brand-4.png",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4  py-10">
      <h2 className="text-3xl font-bold text-secondary text-center mb-8">
        🤝 Our Partners
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="  rounded-xl p-4 shadow-lg transition"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="w-24 h-24 mx-auto object-contain mb-3"
            />
            <h3 className="text-lg font-semibold">{partner.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPartner;
