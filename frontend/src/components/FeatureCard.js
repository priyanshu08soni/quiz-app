import React from 'react';


const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;