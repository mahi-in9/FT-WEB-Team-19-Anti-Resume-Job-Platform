import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  CodeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/outline";

export default function Home() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-10 transition-all ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <SparklesIcon className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-indigo-600">
                  SkillProof
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                Sign Up Free
              </button>
              <button className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Skills Speak <span className="text-indigo-600">Louder</span> Than
            Resumes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            The anti-resume job platform where your actual abilities get you
            hired. No bias. No fluff. Just proof.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Find Work <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors">
              Hire Talent
            </button>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide mb-8">
            Trusted by innovative teams at
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {["Netflix", "Google", "Stripe", "Airbnb", "Spotify"].map(
              (company) => (
                <div
                  key={company}
                  className="col-span-1 flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="h-12 text-xl font-bold text-gray-700">
                    {company}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How SkillProof Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for work or talent, we've built a fairer
              process
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab("candidates")}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  activeTab === "candidates"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                For Candidates
              </button>
              <button
                onClick={() => setActiveTab("employers")}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  activeTab === "employers"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                For Employers
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            {activeTab === "candidates" ? (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <CodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Solve Real Challenges
                  </h3>
                  <p className="text-gray-600">
                    Demonstrate your skills by completing actual micro-tasks
                    from companies.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Blind Evaluation
                  </h3>
                  <p className="text-gray-600">
                    Your work is judged purely on quality - no bias from names,
                    schools, or photos.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Get Matched
                  </h3>
                  <p className="text-gray-600">
                    Our AI connects you with roles that truly fit your
                    demonstrated abilities.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <CodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Post Challenges
                  </h3>
                  <p className="text-gray-600">
                    Create micro-tasks that test exactly the skills you need for
                    your roles.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Review Anonymously
                  </h3>
                  <p className="text-gray-600">
                    Evaluate submissions without seeing any demographic
                    information.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Hire the Best
                  </h3>
                  <p className="text-gray-600">
                    Connect with candidates who've proven they can do the work.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why SkillProof is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're rebuilding hiring from the ground up to be skills-first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "No Resume Required",
                description:
                  "Your work speaks for itself. No need to craft the perfect resume.",
                icon: "📝",
                color: "bg-purple-100 text-purple-800",
              },
              {
                title: "AI-Powered Matching",
                description:
                  "Our system analyzes submissions to connect you with perfect-fit opportunities.",
                icon: "🤖",
                color: "bg-blue-100 text-blue-800",
              },
              {
                title: "Transparent Culture",
                description:
                  "See salary ranges and team culture before you apply.",
                icon: "💎",
                color: "bg-green-100 text-green-800",
              },
              {
                title: "Bias Detection",
                description:
                  "Our systems flag potential bias in challenge design and evaluation.",
                icon: "⚖️",
                color: "bg-yellow-100 text-yellow-800",
              },
              {
                title: "Real Work Samples",
                description:
                  "Showcase actual problem-solving rather than hypotheticals.",
                icon: "🛠️",
                color: "bg-red-100 text-red-800",
              },
              {
                title: "Fast Feedback",
                description:
                  "Get quick responses from employers on your submissions.",
                icon: "⚡",
                color: "bg-indigo-100 text-indigo-800",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${feature.color} text-xl mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Hiring?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join SkillProof today and experience hiring based on what really
            matters - skills.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors">
              Sign Up Free
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors">
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Connect
              </h3>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6">{social.charAt(0)}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 SkillProof. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
