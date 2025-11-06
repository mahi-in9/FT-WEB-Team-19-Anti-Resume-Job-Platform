import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function Landing() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/30 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Content */}
      <div className="text-center z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Redefine Hiring with{" "}
          <span className="text-pink-400">Anti-Resume</span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          A revolutionary platform where your{" "}
          <span className="text-pink-300">skills</span>,
          <span className="text-indigo-300"> creativity</span>, and
          <span className="text-purple-300"> real projects</span> matter more
          than a traditional resume.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            Get Started <FaArrowRight />
          </Link>
          <a
            href="#how-it-works"
            className="border border-white px-8 py-3 rounded-full hover:bg-white/10 transition flex items-center justify-center gap-2"
          >
            <FaPlay /> Watch Demo
          </a>
        </div>
      </div>

      {/* Floating Tagline */}
      <div className="absolute bottom-12 text-center text-gray-300 text-sm tracking-wide animate-bounce">
        Empowering <span className="text-pink-300 font-medium">Creators</span> •{" "}
        <span className="text-purple-300 font-medium">Doers</span> •{" "}
        <span className="text-indigo-300 font-medium">Innovators</span>
      </div>
    </section>
  );
}
