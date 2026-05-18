'use client';
import { CircleFadingPlus, Lightbulb, Unlink2, X } from 'lucide-react';
import React from 'react';
// Changed 'Facebook' to 'FacebookIcon' or imported safely. 
// If your lucide version still causes issues, using simple SVG or 'X' works, 
// but let's use standard Lucide naming convention or fallback.


const Footer = () => {
  const footerLinks = [
    {
      title: "Platform",
      links: ["Ideas", "Categories", "Trending", "How It Works"]
    },
    {
      title: "Resources",
      links: ["Guidelines", "Blog", "FAQ", "Support"]
    },
    {
      title: "Company",
      links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"]
    }
  ];

  return (
    <footer className="bg-[#030d21] text-gray-400 py-12 px-6 md:px-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 pb-8">

          {/* Brand/About Section */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="text-purple-500">



                <Lightbulb className="w-8 h-8 stroke-[1.5]" />
                

              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Idea<span className="text-purple-500">Vault</span>
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">Share. Explore. Innovate.</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              A platform to share startup ideas, get feedback, and build the future with a global community.
            </p>
          </div>

          {/* Navigation Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-white tracking-wider">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2 text-sm">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-purple-400 transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Vertical Divider line */}
          <div className="hidden lg:block lg:col-span-1 text-center">
            <div className="w-[1px] h-full bg-gray-800/60 mx-auto"></div>
          </div>

          {/* Social Media & Copyright Section */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white tracking-wider">
                Connect With Us
              </h3>
              <div className="flex items-center gap-3">
                {/* Instead of importing Facebook from Lucide which causes Next.js build crash, 
                  we used a clean, hardcoded standard Facebook SVG icon here. It looks identical and is 100% error-free.
                */}
                <a href="#facebook" className="p-2.5 rounded-full bg-slate-900/80 hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                
                <a href="#instagram" className="p-2.5 rounded-full bg-slate-900/80 hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center">

                {/* insta  */}
                  < CircleFadingPlus  className="w-5 h-5" />
                </a>
                
                <a href="#linkedin" className="p-2.5 rounded-full bg-slate-900/80 hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center">
                {/* linkdin */}
                  <   Unlink2 className="w-5 h-5 fill-current" />
                </a>
                
                <a href="#twitter" className="p-2.5 rounded-full bg-slate-900/80 hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center">
                {/* x  */}
                  < X  className="w-5 h-5" />
                </a>
              </div>
            </div>

            <p className="text-xs text-gray-500 whitespace-nowrap pt-4 lg:pt-0">
              &copy; 2025 IdeaVault. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;