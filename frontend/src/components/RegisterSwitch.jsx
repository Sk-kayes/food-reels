import { Link, useLocation } from "react-router-dom";

export default function RegisterSwitch() {
    const location = useLocation();
    const isUser = location.pathname === "/user/register";
    const isPartner = location.pathname === "/food-partner/register";

    return (
        <div className="flex items-center justify-center">
            <p className="text-sm md:text-base lg:text-base text-gray-400 flex items-center">
                <Link
                    to="/user/register"
                    className={`px-2 md:px-3 py-1 md:py-1 rounded-md font-medium transition-colors focus:outline-none ${isUser ? "text-indigo-400 font-semibold" : "text-gray-300 hover:text-gray-100"
                        }`}
                >
                    User
                </Link>

                <span className="text-gray-500 mx-2 md:mx-3">|</span>

                <Link
                    to="/food-partner/register"
                    className={`px-2 md:px-3 py-1 md:py-1 rounded-md font-medium transition-colors focus:outline-none ${isPartner ? "text-green-400 font-semibold" : "text-gray-300 hover:text-gray-100"
                        }`}
                >
                    Food partner
                </Link>
            </p>
        </div>
    );
}