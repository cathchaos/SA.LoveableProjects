import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Check, MapPin } from 'lucide-react';

const Amenities = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<number | null>(null);
  
  const amenities = [
    {
      id: 1,
      name: "Roof Garden & BBQ",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
      capacity: "15 People",
      location: "Rooftop (Level 5)",
      description: "Perfect for evening gatherings. Includes gas grill, seating, and panoramic views.",
      available: true
    },
    {
      id: 2,
      name: "Conference Room",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      capacity: "8 People",
      location: "Ground Floor",
      description: "Quiet space for meetings. Equipped with whiteboard and high-speed WiFi.",
      available: true
    },
    {
      id: 3,
      name: "Guest Parking Spot #2",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
      capacity: "1 Car",
      location: "Basement (-1)",
      description: "Reserved parking for your visitors. 24h limit.",
      available: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-2 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Portal
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Amenities Booking</h1>
        <p className="text-gray-500 mt-1">Reserve shared spaces for your private use</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all group ${
              selectedAmenity === item.id ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-100 hover:shadow-md'
            }`}
          >
            <div className="h-48 overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Currently Booked</span>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                {item.available ? (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Available
                  </span>
                ) : (
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Busy</span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> {item.capacity}</div>
                <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {item.location}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2">{item.description}</p>
              </div>

              <button 
                onClick={() => setSelectedAmenity(item.id)}
                disabled={!item.available}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                  !item.available 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                {selectedAmenity === item.id ? 'Selected' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form (Appears when amenity is selected) */}
      {selectedAmenity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Complete Reservation</h3>
            <p className="text-gray-500 text-sm mb-6">You are booking: <span className="font-semibold text-blue-600">{amenities.find(a => a.id === selectedAmenity)?.name}</span></p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type="date" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>3 Hours</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setSelectedAmenity(null)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    alert("Reservation Confirmed!");
                    setSelectedAmenity(null);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenities;