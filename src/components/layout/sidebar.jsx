import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {name : "Portfolio", href: "/portfolio"},
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-[1000] p-2 bg-white rounded-full  border border-gray-200 text-gray-900 hover:bg-gray-50  hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer hover:-translate-y-0.5  transition-all active:scale-95 ease-out"
      >
        {isOpen ? (
          // Close Icon
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* --- 2. OVERLAY (Backdrop) --- */}
      {/* z-[998] ensures it sits below sidebar but above site content */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-gray-500/40 z-[998] transition-all duration-300 ease-in-out md:hidden ${
          isOpen 
            ? "opacity-100 visible pointer-events-auto" 
            : "opacity-0 invisible pointer-events-none"
        }`}
      ></div>

      {/* --- 3. SIDEBAR PANEL --- */}
      {/* z-[999] ensures it is ALWAYS on top of the header and hero section */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#fcfcfc] z-[999] transform transition-all duration-300 ease-in-out md:hidden ${
          isOpen 
            ? "translate-x-0 shadow-2xl border-r border-gray-100 opacity-100" 
            : "-translate-x-full pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          
          {/* Logo */}
          <div className="mb-10">
            <h2 className="text-3xl font-ovo font-bold text-gray-900">
              JAIN<span className="text-black">.</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-outfit mt-1">
              Frontend Developer
            </p>
          </div>

          {/* Links */}
          <nav className="flex-1 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={toggleMenu} // Close menu on click
                className="block text-lg font-outfit font-medium text-gray-600 hover:text-gray-900 hover:pl-2 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <a
              href="/output.pdf"
              download="my-resume.pdf"
              className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-xl font-outfit font-medium hover:bg-black transition-all"
            >
              <span>Download CV</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}