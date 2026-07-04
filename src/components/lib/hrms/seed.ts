import type { HRMSState, Employee, AttendanceRecord } from "./types";
import { uid } from "./format";

function avatar(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

const demoPeople: Array<Partial<Employee> & Pick<Employee, "name" | "department" | "designation" | "dob" | "baseSalary">> = [
  { name: "Priya Patel", department: "Human Resources", designation: "HR Manager", dob: "1988-03-14", baseSalary: 95000, role: "admin" },
  { name: "Rohan Sharma", department: "Engineering", designation: "SDE II", dob: "1994-07-22", baseSalary: 85000 },
  { name: "Amit Mishra", department: "Quality", designation: "QA Engineer", dob: "1992-11-05", baseSalary: 62000 },
  { name: "Sunita Rao", department: "Engineering", designation: "DevOps Engineer", dob: "1990-02-18", baseSalary: 88000 },
  { name: "Vikram Malhotra", department: "Design", designation: "Product Designer", dob: "1993-09-30", baseSalary: 78000 },
  { name: "Ananya Iyer", department: "Marketing", designation: "Marketing Lead", dob: "1991-06-12", baseSalary: 72000 },
  { name: "Rajesh Kumar", department: "IT Ops", designation: "System Administrator", dob: "1987-04-09", baseSalary: 68000 },
  { name: "Sneha Gupta", department: "Engineering", designation: "Frontend Specialist", dob: "1995-08-27", baseSalary: 82000 },
  { name: "Arjun Verma", department: "Engineering", designation: "Backend Specialist", dob: "1989-12-03", baseSalary: 92000 },
  { name: "Kavitha Nair", department: "Analytics", designation: "Data Analyst", dob: "1996-05-19", baseSalary: 70000 },
  { name: "Manish Chauhan", department: "Sales", designation: "Sales Executive", dob: "1993-10-24", baseSalary: 55000 },
];

function seedEmployees(): Employee[] {
  return demoPeople.map((p, i) => {
    const first = p.name.split(" ")[0].toLowerCase();
    return {
      id: `emp_${i + 1}`,
      name: p.name,
      email: `${first}@adamas.hr`,
      password: p.role === "admin" ? "admin123" : "employee123",
      role: p.role ?? "employee",
      department: p.department,
      designation: p.designation,
      phone: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
      address: `${["Mumbai", "Bengaluru", "Pune", "Delhi", "Chennai", "Hyderabad"][i % 6]}, India`,
      dob: p.dob,
      joinDate: `202${1 + (i % 4)}-0${1 + (i % 9)}-15`,
      photo: avatar(p.name),
      baseSalary: p.baseSalary,
      allowances: Math.round(p.baseSalary * 0.15),
      incentive: i % 3 === 0 ? 5000 : 0,
      status: "active",
    };
  });
}

function seedAttendance(employees: Employee[]): AttendanceRecord[] {
  const recs: AttendanceRecord[] = [];
  const today = new Date();
  for (const emp of employees) {
    for (let i = 1; i <= 28; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      const rnd = Math.random();
      let status: AttendanceRecord["status"] = "present";
      if (rnd > 0.94) status = "absent";
      else if (rnd > 0.88) status = "leave";
      else if (rnd > 0.82) status = "late";
      else if (rnd > 0.78) status = "half-day";
      recs.push({
        id: uid(),
        employeeId: emp.id,
        date: d.toISOString().slice(0, 10),
        checkIn: status === "absent" || status === "leave" ? undefined : status === "late" ? "10:24" : "09:32",
        checkOut: status === "absent" || status === "leave" ? undefined : "18:45",
        status,
      });
    }
  }
  return recs;
}

export function createSeed(): HRMSState {
  const employees = seedEmployees();
  const attendance = seedAttendance(employees);
  return {
    employees,
    attendance,
    leaves: [
      {
        id: uid(),
        employeeId: "emp_2",
        type: "casual",
        startDate: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10),
        reason: "Family function",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: uid(),
        employeeId: "emp_5",
        type: "sick",
        startDate: new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10),
        endDate: new Date(Date.now() - 6 * 864e5).toISOString().slice(0, 10),
        reason: "Viral fever",
        status: "approved",
        createdAt: new Date(Date.now() - 10 * 864e5).toISOString(),
      },
    ],
    reimbursements: [
      {
        id: uid(),
        employeeId: "emp_3",
        title: "Client meeting cab",
        amount: 850,
        category: "Travel",
        remarks: "Round-trip Bandra ↔ BKC",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: uid(),
        employeeId: "emp_8",
        title: "Home internet — June",
        amount: 1499,
        category: "Internet",
        remarks: "WFH connectivity",
        status: "approved",
        adminComment: "Approved as per WFH policy",
        createdAt: new Date(Date.now() - 4 * 864e5).toISOString(),
      },
    ],
    payslips: [],
    applicants: [
      { id: uid(), name: "Divya Menon", position: "Product Manager", email: "divya@mail.com", status: "Applied", appliedAt: new Date().toISOString() },
      { id: uid(), name: "Karan Bedi", position: "Senior SDE", email: "karan@mail.com", status: "Interview Scheduled", appliedAt: new Date().toISOString() },
      { id: uid(), name: "Meera Joshi", position: "UX Researcher", email: "meera@mail.com", status: "Offered", appliedAt: new Date().toISOString() },
      { id: uid(), name: "Sahil Khanna", position: "DevOps Engineer", email: "sahil@mail.com", status: "Rejected", appliedAt: new Date().toISOString() },
      { id: uid(), name: "Ishita Bansal", position: "Data Scientist", email: "ishita@mail.com", status: "Applied", appliedAt: new Date().toISOString() },
    ],
    schedules: [
      { id: uid(), title: "Interview — Product Designer Candidate", date: new Date().toISOString().slice(0, 10), time: "10:00 AM", room: "Meeting Room C", attendees: ["emp_1", "emp_5"], tag: "Talent Acquisition" },
      { id: uid(), title: "Mid-Year Performance Review — Design Dept", date: new Date(Date.now() + 864e5).toISOString().slice(0, 10), time: "01:00 PM", room: "Notion Review Sheet", attendees: ["emp_1", "emp_5", "emp_6"], tag: "Employee Development" },
      { id: uid(), title: "Quarterly Policy Review Meeting", date: new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10), time: "03:00 PM", room: "Conference Room A", attendees: ["emp_1", "emp_7", "emp_9"], tag: "Workplace Engagement" },
    ],
    activity: [
      { id: uid(), message: "Priya Patel approved 2 pending leave requests", at: new Date().toISOString() },
      { id: uid(), message: "Ethan Ray raised emergency contact details", at: new Date(Date.now() - 3600e3).toISOString() },
      { id: uid(), message: "Jacob Yuan marked absent — automatic due to no check-in", at: new Date(Date.now() - 7200e3).toISOString() },
    ],
    sessionId: null,
  };
}