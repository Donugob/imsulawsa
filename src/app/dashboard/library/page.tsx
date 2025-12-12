"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Download, Filter, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

interface Material {
  _id: string;
  title: string;
  courseCode: string;
  level: string;
  semester: string;
  fileUrl: string;
  createdAt: string;
}

export default function StudentLibrary() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/library/materials"); // Fetches all
      const data = await res.json();
      setMaterials(data);
    } catch (error) {
      console.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredMaterials = materials.filter((item) => {
    const matchesLevel = selectedLevel === "All" || item.level === selectedLevel;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif text-law-navy font-bold">E-Library</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access lecture notes, past questions, and journals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
           {/* Search Input */}
           <div className="relative">
             <input 
               type="text" 
               placeholder="Search by course..." 
               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:border-law-gold"
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
           </div>

           {/* Level Filter Dropdown */}
           <div className="relative">
             <select 
               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm w-full appearance-none bg-white focus:outline-none focus:border-law-gold cursor-pointer"
               onChange={(e) => setSelectedLevel(e.target.value)}
               value={selectedLevel}
             >
               <option value="All">All Levels</option>
               <option value="100L">100L</option>
               <option value="200L">200L</option>
               <option value="300L">300L</option>
               <option value="400L">400L</option>
               <option value="500L">500L</option>
             </select>
             <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
           </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-law-navy" />
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-500 font-bold">No materials found</h3>
          <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => (
            <div key={item._id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow group flex flex-col justify-between h-full">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-law-navy/5 text-law-navy text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
                    {item.courseCode}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {item.level} • {item.semester}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-law-navy leading-tight mb-2 group-hover:text-law-gold transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                   <FileText className="h-3 w-3" />
                   <span>PDF Document</span>
                   <span>•</span>
                   <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <a 
                href={item.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-xs font-bold uppercase text-gray-600 hover:bg-law-navy hover:text-white hover:border-law-navy transition-all"
              >
                <Download className="h-4 w-4" /> Download
              </a>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
