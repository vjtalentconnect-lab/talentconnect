const ProducerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        🎬 Producer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Post Audition</h2>
          <p className="text-gray-600">
            Create casting calls and roles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Browse Talent</h2>
          <p className="text-gray-600">
            Discover and shortlist talents.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Applications</h2>
          <p className="text-gray-600">
            Review applications and contact talent.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProducerDashboard;
