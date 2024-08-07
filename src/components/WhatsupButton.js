import React from 'react';
import { ReactComponent as WhatsAppIcon } from '../assets/img/whatsapp.svg'; // Adjust the path if necessary

const WhatsAppButton = () => {
  return (
    <div>
      <a
        href="https://wa.me/201150568885"
        target="_blank"
        rel="noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-md transition hover:bg-green-600 flex items-center justify-center"
      >
        <WhatsAppIcon className="h-8 w-8 text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
