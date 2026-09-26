const mongoose = require('mongoose');

const stringField = { type: String, trim: true, maxlength: 300 };

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: { ...stringField, required: true, maxlength: 100 },
    phoneNumber: { ...stringField, required: true, maxlength: 30 },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ['Female', 'Male', 'Non-binary', 'Prefer not to say', ''], default: '' },
    nationality: stringField,
    profileImage: stringField,
    school: { ...stringField, required: true },
    faculty: stringField,
    department: stringField,
    degree: stringField,
    studentId: stringField,
    academicYear: stringField,
    graduationYear: { type: Number, min: 1950, max: 2200 },
    address: stringField,
    city: stringField,
    province: stringField,
    country: stringField,
    bio: { type: String, trim: true, maxlength: 1000 },
    skills: [String],
    hobbies: [String],
    careerInterests: stringField,
    linkedin: stringField,
    github: stringField
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);

