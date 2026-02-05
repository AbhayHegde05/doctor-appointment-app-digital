const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    // Find appointments where the user is EITHER the patient OR the doctor
    const appointments = await Appointment.find({
      $or: [{ patientId: userId }, { doctorId: userId }]
    })
    .populate('patientId', 'firstName lastName')
    .populate('doctorId', 'firstName lastName specialty clinic')
    .sort({ date: 1, time: 1 });
    
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Used by Doctors to update status (Confirm/Cancel)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};