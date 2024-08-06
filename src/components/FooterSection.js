import React from "react";
import { navigation, classNames } from "./NavBar";
import { Link } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";

function FooterSection() {
  return (
    <footer className="bg-black dark:bg-black">
      <div className="relative mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-8">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <ScrollToTopButton></ScrollToTopButton>
        </div>
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-white lg:justify-start dark:text-white h4">
              <h4>كيان</h4>
            </div>
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-200 lg:text-right ">
              في موبيليات كيان، نقدم تشكيلة رائعة من الأثاث الدمياطي عالي الجودة
              التي يمكن أن تحول منزلك إلى ملاذ مريح وممتع على الدوام..
            </p>
          </div>
          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            <li>
              <a
                href="https://www.facebook.com/"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-600"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/201553029842"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-600"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="5 5 24 24"
                  aria-hidden="true"
                >
                  <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/Ka9sUQCVTMDLZi2x5"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-600"
              >
                <span className="sr-only">Google Maps</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 11a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.pinterest.com/"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-600"
              >
                <span className="sr-only">Pinterest</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 4.84 3.438 8.897 8 10.239-.112-.873-.211-2.213.045-3.167.227-.824 1.463-5.252 1.463-5.252s-.373-.748-.373-1.855c0-1.74 1.01-3.039 2.263-3.039 1.067 0 1.581.8 1.581 1.757 0 1.07-.682 2.67-1.034 4.155-.292 1.234.617 2.238 1.83 2.238 2.195 0 3.883-2.31 3.883-5.644 0-2.947-2.119-5.007-5.14-5.007-3.503 0-5.559 2.627-5.559 5.34 0 1.064.417 2.207.94 2.827.105.125.12.234.09.36-.1.394-.325 1.234-.367 1.406-.06.252-.195.307-.454.184-1.683-.78-2.741-3.23-2.741-5.196 0-4.234 3.073-8.124 8.86-8.124 4.646 0 8.249 3.31 8.249 7.73 0 4.61-2.903 8.333-6.923 8.333-1.352 0-2.622-.704-3.054-1.54l-.83 3.165c-.302 1.146-1.121 2.579-1.678 3.46C9.983 23.564 10.985 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </li>
          </ul>
          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <div className="flex">
              {navigation.map((item) => (
                <Link
                  className={classNames(
                    item.current
                      ? " text-white"
                      : "text-gray-200 hover:text-gray-300",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  to={item.href}
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </ul>
        </div>
        <p className="mt-12 text-center text-sm text-gray-200 lg:text-right">
          جميع حقوق النشر © محفوظة لشركة كيان
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
