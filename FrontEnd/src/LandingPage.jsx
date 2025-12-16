import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const goToSite = () => navigate("/login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">This is a Sample Landing Page</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={goToSite}
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
