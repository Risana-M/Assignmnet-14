

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomerCard from "../components/CustomerCard";
import API from "../services/axios";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  PieChart,
  Calendar,
  DollarSign,
  LogOut,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // 1. Get Logged-in user details from localStorage
      const savedProfile = JSON.parse(localStorage.getItem("profile"));
      setUserProfile(savedProfile);
    }
  }, [token, navigate]);

  //  Fetch existing customers from Database
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await API.get("/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    if (token) fetchCustomers();
  }, [token]);

  //  Add Customer Function
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/customers", newCustomer, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers([...customers, data]); // Add new card to UI
      setNewCustomer({ name: "", email: "", phone: "" }); // Reset form
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 backdrop-blur-xl p-6 flex flex-col gap-2 shadow-xl border-r border-white">
        <div className="mb-10 px-4">
          <div className="bg-[#115e59] text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-teal-900/20">
            <LayoutDashboard size={20} />
            <span className="font-bold">Dashboard</span>
          </div>
        </div>

        {[
          { icon: <Users size={20} />, label: "Customers" },
          { icon: <MessageSquare size={20} />, label: "Messages" },
          { icon: <PieChart size={20} />, label: "Statistics" },
          { icon: <Calendar size={20} />, label: "Calendar" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-4 text-gray-500 hover:text-[#115e59] cursor-pointer font-semibold rounded-xl hover:bg-white/50 transition">
            {item.icon} {item.label}
          </div>
        ))}

        <div onClick={handleLogout} className="mt-auto flex items-center gap-3 p-4 text-red-500 cursor-pointer font-bold rounded-xl hover:bg-red-50 transition">
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black text-gray-800 tracking-tight">Management</h1>
              <p className="text-teal-600 font-medium">Viewing all active records</p>
            </div>
            
            {/* Add Customer Button */}
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#115e59] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-teal-900/20"
            >
              <Plus size={20} /> {showAddForm ? "Close" : "Add Customer"}
            </button>
          </div>

          {/* Add Customer Form (Toggles) */}
          {showAddForm && (
            <form onSubmit={handleAddCustomer} className="bg-white p-6 rounded-[2rem] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4">
              <input 
                type="text" placeholder="Name" required
                className="p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500"
                value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required
                className="p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500"
                value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              />
              <input 
                type="text" placeholder="Phone"
                className="p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500"
                value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              />
              <button type="submit" className="bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700">Save Customer</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/*  CARD 1: Logged-in Profile (Manual Entry) */}
            {userProfile && (
              <div className="relative">
                <div className="absolute top-4 right-4 z-10 bg-teal-100 text-teal-700 text-[10px] font-black px-2 py-1 rounded-lg border border-teal-200">
                  CURRENT USER
                </div>
                <CustomerCard
                  customer={{
                    name: userProfile.name,
                    email: userProfile.email,
                    phone: userProfile.phone || "Admin Account",
                    _id: "me"
                  }}
                  onDelete={() => alert("You cannot delete yourself!")}
                />
              </div>
            )}

            {/*  OTHER CARDS: Fetched from Database */}
            {customers.map((customer) => (
              <CustomerCard
                key={customer._id}
                customer={customer}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;