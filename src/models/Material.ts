import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title (e.g., Law of Contract I)'],
  },
  courseCode: {
    type: String,
    required: [true, 'Please provide course code (e.g., PPL 301)'],
    uppercase: true,
  },
  level: {
    type: String,
    required: true, // "100L", "200L", etc.
  },
  semester: {
    type: String,
    enum: ['First', 'Second'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // Cloudinary PDF link
  },
  fileType: {
    type: String,
    default: 'pdf',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the Admin who uploaded it
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Material = mongoose.models.Material || mongoose.model('Material', MaterialSchema);

export default Material;
