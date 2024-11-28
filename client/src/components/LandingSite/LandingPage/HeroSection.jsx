import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center  text-white text-center">
      {/* <img src={heroImg} alt='nust-hostel-img' className='opacity-[0.05] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] select-none' /> */}
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <HeroSVG />
      </div>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl">
          Seva <span className="text-blue-500">Hub</span>
        </h1>
        <p className="py-10 text-2xl">
          A centeral platform for NGO's and volunteer's to connect and work together
        </p>
        <div className="py-20 ">
          <Link
            to="/auth/user-login"
            className="bg-blue-500 font-semibold py-3 px-40 hover:bg-blue-700 transition rounded text-2xl w-fit"
          >
            Login
          </Link>
          <p className="mt-6 mb-5">OR</p>
          <Link
            to="/auth/ngo-login"
            className="bg-gray-500 text-black font-bold py-3 px-40 hover:bg-gray-700 transition rounded text-2xl w-fit "
          >
            NGO Login
          </Link>
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
