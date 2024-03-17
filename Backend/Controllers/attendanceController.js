import attendanceModel from "../Models/attendanceModel.js";

// export const uploadAttendance = async (req, res) => {
//   try {
//     const { studentId, date, status } = req.body;
//
//     let existingAttendance = await attendanceModel.findOne({
//       student: studentId,
//       date,
//     });
//     if (existingAttendance) {
//
//       existingAttendance.status = status;
//       await existingAttendance.save();
//       res.status(200).json({ message: "Attendance updated successfully" });
//     } else {
//
//       const attendance = new attendanceModel({
//         student: studentId,
//         date,
//         status,
//       });
//       await attendance.save();
//       res
//         .status(201)
//         .json({ message: "Attendance uploaded successfully", attendance });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const uploadAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    //find
    let attendanceRecord = await attendanceModel.findOne({
      student: studentId,
    });

    if (!attendanceRecord) {
      attendanceRecord = new attendanceModel({
        student: studentId,
        attendance: [],
      });
    }

    //  if attendance for this date already exists
    const existingAttendance = attendanceRecord.attendance.find(
      (item) => item.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      // update the status
      existingAttendance.status = status;
    } else {
      attendanceRecord.attendance.push({ date, status });
    }

    await attendanceRecord.save();
    res
      .status(200)
      .json({ message: "Attendance updated successfully", attendanceRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View attendance
export const viewAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendanceRecord = await attendanceModel.findOne({
      student: studentId,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    //  total attendance
    const totalAttendanceCount = attendanceRecord.attendance.length;

    // Calculate Present
    let presentAttendanceCount = 0;

    for (const entry of attendanceRecord.attendance) {
      if (entry.status === "Present") {
        presentAttendanceCount++;
      }
    }

    const attendance = attendanceRecord.attendance.map((item) => ({
      date: item.date,
      status: item.status,
    }));

    res.status(200).json({
      studentId,
      totalAttendanceCount,
      presentAttendanceCount,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
