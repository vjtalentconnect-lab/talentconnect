const TalentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        🎭 Talent Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">My Profile</h2>
          <p className="text-gray-600">
            Update your skills, photos, and bio.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Auditions</h2>
          <p className="text-gray-600">
            View opportunities posted by producers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Messages</h2>
          <p className="text-gray-600">
            Chat with interested producers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TalentDashboard;
