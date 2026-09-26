const Student = require('../models/Student');

const editableFields = ['fullName', 'phoneNumber', 'birthday', 'gender', 'nationality', 'profileImage', 'school', 'faculty', 'department', 'degree', 'studentId', 'academicYear', 'graduationYear', 'address', 'city', 'province', 'country', 'bio', 'skills', 'hobbies', 'careerInterests', 'linkedin', 'github'];

function cleanPayload(body) {
  return Object.fromEntries(Object.entries(body).filter(([key, value]) => editableFields.includes(key) && value !== undefined));
}

function validRequired(data) {
  return data.fullName?.trim() && data.phoneNumber?.trim() && data.birthday && data.school?.trim();
}

async function createStudent(req, res, next) {
  try {
    const data = cleanPayload(req.body);
    if (!validRequired(data)) return res.status(400).json({ success: false, message: 'Full name, phone number, birthday, and school are required' });
    if (await Student.exists({ user: req.user._id })) return res.status(409).json({ success: false, message: 'You already have a student profile' });
    const student = await Student.create({ ...data, user: req.user._id });
    res.status(201).json({ success: true, message: 'Profile created successfully', data: student });
  } catch (error) { next(error); }
}

async function getMyStudent(req, res, next) {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
}

async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    if (!student.user.equals(req.user._id)) return res.status(403).json({ success: false, message: 'You cannot access this profile' });
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
}

async function updateStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    if (!student.user.equals(req.user._id)) return res.status(403).json({ success: false, message: 'You cannot update this profile' });
    const updates = cleanPayload(req.body);
    Object.assign(student, updates);
    if (!validRequired(student)) return res.status(400).json({ success: false, message: 'Full name, phone number, birthday, and school are required' });
    await student.save();
    res.json({ success: true, message: 'Profile updated successfully', data: student });
  } catch (error) { next(error); }
}

async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    if (!student.user.equals(req.user._id)) return res.status(403).json({ success: false, message: 'You cannot delete this profile' });
    await student.deleteOne();
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) { next(error); }
}

module.exports = { createStudent, getMyStudent, getStudent, updateStudent, deleteStudent };

