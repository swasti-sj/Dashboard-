import { Link } from 'react-router-dom';
//import { BellIcon } from '@heroicons/react/outline';

const Navbar = () => {
    return (
        <nav className="bg-[#f3e9dc] shadow-md sticky top-0 z-50 w-full border-b border-[#d6c1aa]">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between space-x-8 items-center">

                {/* Logo / Brand */}
                <Link to="/" className="text-2xl font-bold tracking-wider text-[#3b2f2f] hover:text-[#5c4033] transition">
                    Insight<span className="text-[#5c4033]"> Dashboard</span>
                </Link>

                {/* Menu Buttons */}
                <div className="flex items-center space-x-8">
                    <Link to="/dashboard" className="inline-flex">
 <button className="bg-gradient-to-r from-[#5c4033] to-[#7a5230] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">                            Dashboard
                        </button>
                    </Link>
                    <Link to="/data" className="inline-flex">
 <button className="bg-gradient-to-r from-[#5c4033] to-[#7a5230] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">                            Data View
                        </button>
                    </Link>
                    <img
                        src="https://i.pravatar.cc/30"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-[#5c4033] ml-2"
                    />
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
