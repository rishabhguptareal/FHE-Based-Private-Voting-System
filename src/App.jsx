import { useState } from 'react';

export default function App() {
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerification = (age) => {
    const isOldEnough = parseInt(age) >= 18;
    setVerificationResult({
      verified: true,
      isOldEnough
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Age Verification
        </h1>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleVerification(e.target.age.value);
        }} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Enter your age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
              max="150"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify Age
          </button>
        </form>

        {verificationResult && (
          <div className="mt-6 p-4 rounded-md bg-gray-50">
            <h2 className="text-lg font-medium mb-2">Verification Result:</h2>
            <p className={verificationResult.isOldEnough ? 'text-green-600' : 'text-red-600'}>
              {verificationResult.isOldEnough 
                ? '✅ Age requirement met' 
                : '❌ Age requirement not met'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}