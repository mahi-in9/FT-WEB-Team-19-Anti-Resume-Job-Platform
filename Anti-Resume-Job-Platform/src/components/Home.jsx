import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  CodeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/outline';

// Sample challenge data
const sampleChallenges = [
  {
    id: 1,
    title: "Fix React State Management Bug",
    description: "Debug and fix the state management issue in this React component",
    difficulty: "Intermediate",
    skills: ["React", "JavaScript", "State Management"],
    timeEstimate: "30-45 mins",
    company: "TechCorp"
  },
  {
    id: 2,
    title: "Design Responsive Navbar",
    description: "Create a responsive navbar that works on mobile and desktop",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "Responsive Design"],
    timeEstimate: "20-30 mins",
    company: "WebSolutions"
  },
  {
    id: 3,
    title: "Optimize Python Algorithm",
    description: "Improve the time complexity of this sorting algorithm",
    difficulty: "Advanced",
    skills: ["Python", "Algorithms", "Optimization"],
    timeEstimate: "45-60 mins",
    company: "DataSystems"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('candidates');
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    if (localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-10 transition-all ${scrolled ? (darkMode ? 'bg-gray-800 shadow-md py-2' : 'bg-white shadow-md py-2') : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <SparklesIcon className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`ml-2 text-xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>SkillProof</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className={`${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium`}>Features</a>
                <a href="#how-it-works" className={`${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium`}>How It Works</a>
                <a href="#challenges" className={`${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium`}>Challenges</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700 ' : 'text-gray-700 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <SunIcon className="h-5 w-5 cursor-pointer" /> : <MoonIcon className="h-5 w-5 cursor-pointer" />}
              </button>
              <button className={`${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md text-sm font-medium transition-colors`} onClick={() => navigate('/signup')}>
                Sign Up Free
              </button>
              <button className={`${darkMode ? 'text-indigo-400 border-indigo-400 hover:bg-gray-700' : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'} border px-4 py-2 rounded-md text-sm font-medium transition-colors`} onClick={() => navigate('/login')}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Skills Speak <span className="text-indigo-600">Louder</span> Than Resumes
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The anti-resume job platform where your actual abilities get you hired. No bias. No fluff. Just proof.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className={`bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center ${darkMode ? 'hover:bg-indigo-700' : 'hover:bg-indigo-700'}`}>
              Find Work <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className={`${darkMode ? 'bg-gray-800 text-indigo-400 border-indigo-400 hover:bg-gray-700' : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'} px-8 py-4 rounded-lg text-lg font-medium transition-colors`}>
              Hire Talent
            </button>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <div className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm font-semibold uppercase tracking-wide mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Trusted by innovative teams at
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {['Netflix', 'Google', 'Stripe', 'Airbnb', 'Spotify'].map((company) => (
              <div key={company} className={`col-span-1 flex justify-center items-center ${darkMode ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'} transition-opacity`}>
                <div className={`h-12 text-xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section id="how-it-works" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How SkillProof Works</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you're looking for work or talent, we've built a fairer process
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'candidates' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}
              >
                For Candidates
              </button>
              <button
                onClick={() => setActiveTab('employers')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'employers' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}
              >
                For Employers
              </button>
            </div>
          </div>

          <div className={`rounded-xl p-8 md:p-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            {activeTab === 'candidates' ? (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <CodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Solve Real Challenges</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Demonstrate your skills by completing actual micro-tasks from companies.
                  </p>
                </div>
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Blind Evaluation</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Your work is judged purely on quality - no bias from names, schools, or photos.
                  </p>
                </div>
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get Matched</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Our AI connects you with roles that truly fit your demonstrated abilities.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <CodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Post Challenges</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Create micro-tasks that test exactly the skills you need for your roles.
                  </p>
                </div>
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Review Anonymously</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Evaluate submissions without seeing any demographic information.
                  </p>
                </div>
                <div className="text-center">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md mb-4 ${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hire the Best</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Connect with candidates who've proven they can do the work.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why SkillProof is Different</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're rebuilding hiring from the ground up to be skills-first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "No Resume Required",
                description: "Your work speaks for itself. No need to craft the perfect resume.",
                icon: "📝",
                color: darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-800"
              },
              {
                title: "AI-Powered Matching",
                description: "Our system analyzes submissions to connect you with perfect-fit opportunities.",
                icon: "🤖",
                color: darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"
              },
              {
                title: "Transparent Culture",
                description: "See salary ranges and team culture before you apply.",
                icon: "💎",
                color: darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
              },
              {
                title: "Bias Detection",
                description: "Our systems flag potential bias in challenge design and evaluation.",
                icon: "⚖️",
                color: darkMode ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800"
              },
              {
                title: "Real Work Samples",
                description: "Showcase actual problem-solving rather than hypotheticals.",
                icon: "🛠️",
                color: darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
              },
              {
                title: "Fast Feedback",
                description: "Get quick responses from employers on your submissions.",
                icon: "⚡",
                color: darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-800"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${feature.color} text-xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Preview Section */}
      <section id="challenges" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sample Challenges</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Try these example challenges to see how SkillProof works
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <div className={`p-6 ${darkMode ? 'bg-gray-600' : 'bg-indigo-50'}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {challenge.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-500 text-gray-200' : 'bg-indigo-100 text-indigo-800'}`}>
                      {challenge.difficulty}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {challenge.timeEstimate}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Skills Tested:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {challenge.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-600 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`flex items-center justify-between border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} pt-4`}>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Posted by: {challenge.company}
                    </span>
                    <button className={`text-sm font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                      Try Challenge →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              View All Challenges
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Hiring?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join SkillProof today and experience hiring based on what really matters - skills.
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
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Connect</h3>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6">{social.charAt(0)}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-700'} flex flex-col md:flex-row justify-between items-center`}>
            <p className="text-gray-400 text-sm">© 2023 SkillProof. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}