// ✅ Submit a grievance
router.post('/', async (req, res) => {
  try {
    const { facultyId, issueType, category, title, description, name, email } = req.body;

    // Ensure name and email are required only for Non-Anonymous grievances
    if (issueType === 'Non-Anonymous' && (!name || !email)) {
      return res.status(400).json({ error: 'Name and email are required for non-anonymous grievances.' });
    }

    // Create a new grievance document
    const newGrievance = new Grievance({
      facultyId,
      issueType,
      category,
      title,
      description,
      name: issueType === 'Non-Anonymous' ? name : undefined,
      email: issueType === 'Non-Anonymous' ? email : undefined,
      status: 'Pending',
      date: new Date(),
    });

    const savedGrievance = await newGrievance.save();
    res.status(201).json(savedGrievance); // Return the saved grievance
  } catch (error) {
    console.error('Error saving grievance:', error);
    res.status(500).json({ error: 'Failed to submit grievance' });
  }
});
