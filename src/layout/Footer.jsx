import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              © {currentYear} MyApp
            </span>

            <div className="flex space-x-1">
              <a
                href="#"
                aria-label="Twitter"
                className="p-1.5 rounded-md text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-1.5 rounded-md text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-1.5 rounded-md text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4 text-sm">
            <a
              href="#"
              className="text-neutral-500 hover:text-primary-500 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-primary-500 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-primary-500 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
