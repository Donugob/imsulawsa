"use client";

import { useState } from "react";
import { UploadCloud, Loader2, FileText, CheckCircle } from "lucide-react";

export default function LibraryUpload() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    level: "100L",
    semester: "First",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    setLoading(true);

    try {
      // 1. Upload PDF to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      // Use the same preset or create a new one for raw files (documents)
      imageFormData.append("upload_preset", "lawsa_uploads"); 
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Note: For PDFs, sometimes you need '/raw/upload' but image/upload often handles PDFs too
        { method: "POST", body: imageFormData }
      );
      
      const uploadData = await uploadRes.json();
      const fileUrl = uploadData.secure_url;

      // 2. Save Metadata to MongoDB
      const res = await fetch("/api/library/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fileUrl,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFile(null);
        setFormData({ ...formData, title: "", courseCode: "" });
        setTimeout(() => setSuccess(false), 3000);
      }

    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-law-navy font-bold">Library Manager</h1>
        <p className="text-gray-500 text-sm">Upload academic resources for students.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        {success ? (
          <div className="flex flex-col items-center justify-center py-10">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-law-navy">Upload Successful!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Level</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50">
                  {["100L", "200L", "300L", "400L", "500L"].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Semester</label>
                <select name="semester" value={formData.semester} onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50">
                  {["First", "Second"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Course Code</label>
              <input type="text" name="courseCode" placeholder="e.g. PPL 301" value={formData.courseCode} onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50" required />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Resource Title</label>
              <input type="text" name="title" placeholder="e.g. Law of Contract Notes (Week 1)" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50" required />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
              <input type="file" accept=".pdf,.doc,.docx,.ppt" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                {file ? (
                  <FileText className="h-10 w-10 text-law-navy mb-2" />
                ) : (
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                )}
                <span className="text-sm font-bold text-gray-600">{file ? file.name : "Click to Upload PDF/Doc"}</span>
              </label>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-law-navy text-white font-bold py-4 rounded-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-law-gold hover:text-law-navy transition-colors">
              {loading ? <Loader2 className="animate-spin" /> : "Upload Material"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
