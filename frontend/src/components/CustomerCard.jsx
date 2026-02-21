import React from 'react';
import { Edit2, Trash2, Mail, Phone } from 'lucide-react';

const CustomerCard = ({ customer, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition border border-gray-100">

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#e0f2f1] rounded-2xl flex items-center justify-center text-[#115e59] font-bold text-lg">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{customer.name}</h3>
            <span className="text-[10px] uppercase tracking-wider text-teal-600 font-bold">
              VIP Client
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-gray-400 hover:text-teal-600 bg-gray-50 rounded-lg"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(customer._id)}
            className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Mail size={14} /> {customer.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Phone size={14} /> {customer.phone || "+39 0123 4567"}
        </div>
      </div>

      <button className="w-full py-3 bg-[#115e59] text-white rounded-2xl text-sm font-semibold hover:bg-[#0d4d49] transition">
        View Profile
      </button>
    </div>
  );
};

export default CustomerCard;