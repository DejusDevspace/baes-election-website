import db from "../config/db";

export const loginStudent = async (req, res) => {
  try {
    const { matricNumber, pin } = req.body;

    // Find student
    const student = await db.query(
      "SELECT * FROM students WHERE student.matric_number = $1",
      [matricNumber]
    );
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(pin, student.pin);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student.id,
        matricNumber: student.matricNumber,
        department: student.department,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    // Return student data (excluding password) and token
    const studentData = {
      id: student.id,
      level: student.level,
      surname: student.surname,
      matricNumber: student.matricNumber,
      department: student.department,
    };

    res.status(200).json({ student: studentData, token });
  } catch (error) {
    next(error);
  }
};

export const getCurrentStudent = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const student = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(error);
  }
};
