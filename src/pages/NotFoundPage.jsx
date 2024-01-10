import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

function NotFoundPage() {
  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <div className="p-12 w-fit shadow-lg bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center">
        <h1 className="text-[10rem] font-bold text-cyan-500">404</h1>
        <p className="mt-2 text-3xl text-gray-700">Sorry, the page you visited does not exist.</p>
        <Link to="/" className="flex items-center mt-8 text-2xl text-blue-500 hover:text-blue-700">
          <AiOutlineHome className="mr-1" />
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
