import { Link, useNavigate } from "react-router-dom";

function DashboardLayout({
  children,
  role
}) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      <div className="w-[240px] bg-white shadow-sm p-6 flex flex-col justify-between">

        <div>

          <div className="mb-10">

            <h1 className="text-2xl font-bold">
              ResultSys
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              College Result Analysis
            </p>

          </div>

          <div className="flex flex-col gap-4">

            <Link
              to={
                role === "student"
                  ? "/student"
                  : "/teacher"
              }
              className="text-gray-600 hover:text-black transition"
            >
              Dashboard
            </Link>

          </div>

        </div>

        <button
          onClick={logout}
          className="text-left text-red-500 hover:text-red-700 transition"
        >
          Logout
        </button>

      </div>

      <div className="flex-1 p-8 flex flex-col justify-between">

        <div>
          <div className="mb-8">

            <h1 className="text-3xl font-bold capitalize">
              {role} Dashboard
            </h1>

          </div>

          {children}
        </div>

        <footer className="w-full text-center py-4 mt-12 border-t border-gray-200 text-sm text-gray-500 font-medium">
          Node js project by : Chakali Ajay (T5) , C.Bunny(T8), Jishnu (T9), D. Navaneeth sai(U0)
        </footer>

      </div>

    </div>
  );
}

export default DashboardLayout;