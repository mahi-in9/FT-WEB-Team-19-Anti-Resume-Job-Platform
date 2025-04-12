import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { ArrowLeftIcon } from '@heroicons/react/24/solid';
// import { ArrowLeftIcon } from '@heroicons/react/solid';
const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const docRef = doc(db, 'challenges', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChallenge({ id: docSnap.id, ...docSnap.data() });
          const mockProgress = Math.floor(Math.random() * 50);
          setUserProgress(mockProgress);
          if (docSnap.data().files) {
            const url = await getDownloadURL(ref(storage, docSnap.data().files));
            setDownloadUrl(url);
          }
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [id, navigate]);

  const handleFileChange = (e) => setSolution(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solution) return;

    setIsSubmitting(true);
    try {
      const fileRef = ref(storage, `submissions/${id}/${Date.now()}_${solution.name}`);
      await uploadBytes(fileRef, solution);
      const fileUrl = await getDownloadURL(fileRef);
      console.log('Submission successful!', { challengeId: id, fileUrl });
      setSubmissionStatus('success');
      setUserProgress(100);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p>Loading challenge details...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p>Challenge not found</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline mt-2">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-3">
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Back to Challenges
        </button>
        <h1 className="text-3xl font-semibold">{challenge.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${challenge.difficulty === 'Beginner'
              ? 'bg-blue-100 text-blue-600'
              : challenge.difficulty === 'Intermediate'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-600'
              }`}
          >
            {challenge.difficulty}
          </span>
          <span>{challenge.company}</span>
          <span>
            Due: {challenge.deadline?.toDate().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${userProgress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">{userProgress}% complete</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Challenge Description</h2>
          <p>{challenge.description}</p>
          {challenge.details && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-lg mb-1">Detailed Requirements</h3>
              <p>{challenge.details}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
            {downloadUrl ? (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
              >
                Download Challenge Files
              </a>
            ) : (
              <p>No additional files provided for this challenge.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Your Submission</h2>
            {submissionStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded">
                ✅ Your solution has been submitted successfully!
                <button
                  onClick={() => setSubmissionStatus(null)}
                  className="block text-blue-600 hover:underline mt-2 font-semibold"
                >
                  Submit Another Solution
                </button>
              </div>
            ) : userProgress === 100 ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded">
                🎉 You've completed this challenge!
                <Link to="/dashboard" className="block mt-2 text-blue-600 hover:underline">
                  Find More Challenges
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label htmlFor="solution-file" className="block border-2 border-dashed border-gray-300 rounded text-center py-4 px-6 cursor-pointer hover:border-blue-500">
                  {solution ? solution.name : 'Choose your solution file'}
                  <input
                    id="solution-file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed relative pl-10' : ''
                    }`}
                >
                  {isSubmitting && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Solution'}
                </button>
                {submissionStatus === 'error' && (
                  <p className="text-red-600 mt-2">
                    ❌ Submission failed. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Skills Tested</h3>
        <div className="flex flex-wrap gap-2">
          {challenge.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
