import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Anti-Resume</h2>
          <p className="text-gray-200 mb-4">
            Redefining the hiring process — where creativity, skills, and
            passion speak louder than traditional resumes.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 text-xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 text-xl transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 text-xl transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 text-xl transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/candidate" className="hover:text-white transition">
                Candidate Dashboard
              </a>
            </li>
            <li>
              <a href="/employer" className="hover:text-white transition">
                Employer Dashboard
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay in the Loop</h3>
          <p className="text-gray-200 mb-4">
            Subscribe to get updates, insights, and exclusive platform previews.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-600 my-8" />

      <div className="text-center text-gray-300 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Anti-Resume</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
