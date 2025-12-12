"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, X, Loader2, ShieldAlert } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  regNumber: string;
  level: string;
  idCardUrl: string;
  email: string;
}

export default function VerificationQueue() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null); // Stores ID of user being processed

  // Fetch Queue on Load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/verifications");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch queue");
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (userId: string, action: 'approve' | 'reject') => {
    setProcessing(userId);
    try {
      const res = await fetch("/api/admin/verifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      
      if (res.ok) {
        // Remove user from local list immediately (UI Optimism)
        setUsers(users.filter(u => u._id !== userId));
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-law-navy" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-law-navy font-bold">Registrar's Desk</h1>
        <p className="text-gray-500 text-sm mt-1">
          Reviewing <span className="font-bold text-law-navy">{users.length}</span> pending applications.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-100">
          <ShieldAlert className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-serif text-law-navy">All Caught Up!</h3>
          <p className="text-gray-400 text-sm">There are no pending student verifications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* ID Card Preview */}
              <div className="relative h-48 w-full bg-gray-100 group cursor-zoom-in">
                <Image 
                  src={user.idCardUrl} 
                  alt={`${user.fullName} ID`} 
                  fill 
                  className="object-cover"
                />
                {/* Overlay on hover to hint at full view - You can add a modal later */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                  Inspect ID
                </div>
              </div>

              {/* Student Details */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-law-navy truncate">{user.fullName}</h3>
                <div className="flex items-center gap-2 mt-1 mb-4">
                  <span className="bg-law-navy/5 text-law-navy text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
                    {user.level}
                  </span>
                  <span className="text-gray-500 text-xs font-mono">{user.regNumber}</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleDecision(user._id, 'reject')}
                    disabled={processing === user._id}
                    className="flex items-center justify-center gap-2 py-2 border border-red-200 text-red-600 rounded-md text-xs font-bold uppercase hover:bg-red-50 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                  
                  <button 
                    onClick={() => handleDecision(user._id, 'approve')}
                    disabled={processing === user._id}
                    className="flex items-center justify-center gap-2 py-2 bg-law-navy text-white rounded-md text-xs font-bold uppercase hover:bg-law-gold hover:text-law-navy transition-colors disabled:opacity-50"
                  >
                    {processing === user._id ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <><Check className="h-4 w-4" /> Approve</>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
