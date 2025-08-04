import React from "react";
import BackToTop from "./BackToTop";
const Sidebar = () => {
  const sections = ["Intensity", "Likelihood", "Relevance", "Year", "Country", "Topic"];

  return (
    <div>
    <aside className="w-48 h-screen sticky top-0 bg-[#f5f5dc] text-[#3b2f2f] p-4 shadow-md overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">📊 Visualize</h2>
      <nav>
        <ul className="divide-y divide-gray-300">
          {sections.map((section, idx) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className="block px-3 py-2 text-[#3b2f2f] hover:text-white hover:bg-[#5c4033] transition-all duration-200 font-medium"
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
            <BackToTop />

      </nav>
    </aside>
    </div>
  );
};

export default Sidebar;
