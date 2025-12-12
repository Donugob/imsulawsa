"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "X (Twitter)" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const footerLinks = [
    {
      title: "The Association",
      links: [
        { name: "About the Faculty", href: "/about" },
        { name: "Executive Council", href: "/excos" },
        { name: "Constitution", href: "/constitution" },
        { name: "Alumni Network", href: "/alumni" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "E-Library Access", href: "/library" },
        { name: "Student Portal", href: "/portal" },
        { name: "Exam Dockets", href: "/news" },
        { name: "Support / Help Desk", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-law-navy text-law-light relative pt-20 overflow-hidden">
      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-law-gold" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col h-full">
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* LEFT: IDENTITY & CONTACT (The "Firm" Look) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-serif text-3xl text-white mb-8">
                Law Students' Association of Nigeria, <br />
                <span className="text-gray-400 italic">
                  Imo State University.
                </span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-2 border border-white/10 rounded-full group-hover:border-law-gold transition-colors">
                    <MapPin className="h-4 w-4 text-law-gold" />
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    <p className="text-white font-bold uppercase tracking-wider text-xs mb-1">
                      Secretariat
                    </p>
                    <p>Faculty of Law,</p>
                    <p>Imo State University, Owerri,</p>
                    <p>Imo State, Nigeria.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-2 border border-white/10 rounded-full group-hover:border-law-gold transition-colors">
                    <Mail className="h-4 w-4 text-law-gold" />
                  </div>
                  <div className="text-sm text-gray-400">
                    <p className="text-white font-bold uppercase tracking-wider text-xs mb-1">
                      Inquiries
                    </p>
                    <a
                      href="mailto:info@lawsaimsu.com"
                      className="hover:text-white transition-colors"
                    >
                      info@lawsaimsu.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials - Clean Row */}
            <div className="flex gap-4 mt-10 lg:mt-0">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-law-gold hover:text-law-navy hover:border-law-gold transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: NAVIGATION INDEX */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-12 md:gap-20 lg:pl-20">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-law-gold text-xs font-bold uppercase tracking-[0.2em] mb-8">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="h-[1px] w-0 bg-law-gold transition-all duration-300 group-hover:w-3" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* "Back to Top" or Extra Action */}
            <div className="mt-8 md:mt-0">
              <h4 className="text-law-gold text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Legal
              </h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Cookie Settings
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: THE MONUMENTAL TEXT --- */}
        {/* This massive text sits at the bottom, cropped slightly, adding weight */}
        <div className="relative w-full overflow-hidden border-t border-white/5 pt-8 pb-4 flex items-end justify-between">
          <p className="text-xs text-gray-600 font-medium">
            &copy; {currentYear} LAWSA IMSU.
          </p>

          <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
            <span>Designed with</span>
            <span className="text-law-gold">Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
