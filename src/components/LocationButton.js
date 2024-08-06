import React from 'react';
import { ReactComponent as WhatsAppIcon } from '../assets/img/google-maps.svg'; // Adjust the path if necessary

const LocationButton = () => {
  return (
    <div>
      <a
        href="https://maps.app.goo.gl/Ka9sUQCVTMDLZi2x5"
        target="_blank"
        rel="noreferrer"
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg transition hover:bg-blue-600 flex items-center justify-center"
        aria-label="Open Google Maps"
      >
        <WhatsAppIcon className="h-8 w-8 text-white" />
      </a>
    </div>
  );
};

export default LocationButton;
