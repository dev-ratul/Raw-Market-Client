import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 md:px-10 py-10 text-center lg:text-start mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Website Name */}
        <div className="flex flex-col items-center lg:items-start gap-2">
          <img src="/logo.png" alt="Logo" className="w-14" />
          <h1 className="text-xl md:text-2xl font-bold text-white">Raw Market</h1>
          <p className="text-sm">Your trusted source for local products.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p>Email: support@rawmarket.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: 123, Dhanmondi, Dhaka</p>
        </div>

        {/* Terms & Policy */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Legal</h2>
          <ul className="space-y-2">
            <li><Link to="/terms" className="hover:text-lime-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-lime-400">Privacy Policy</Link></li>
            <li><Link to="/refund" className="hover:text-lime-400">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex gap-4 text-xl justify-center lg:justify-start">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-500"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Raw Market. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
