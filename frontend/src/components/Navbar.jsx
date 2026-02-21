import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#f0f7f7] sticky top-0 z-10">
      <div className="text-2xl font-extrabold text-[#115e59] tracking-tight">CRM</div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full bg-white border-none focus:ring-2 focus:ring-teal-200 text-sm" />
        </div>
        
        <Bell className="text-gray-500 w-5 h-5 cursor-pointer" />
        
        <div className="flex items-center gap-2 border-l pl-6 border-gray-300">
          <span className="text-sm font-semibold text-gray-700">{user?.name || ""}</span>
          <div className="w-8 h-8 bg-[#115e59] rounded-full flex items-center justify-center text-white text-xs">
            {user?.name?.charAt(0) || <User size={16}/>}
          </div>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

