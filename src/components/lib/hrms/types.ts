export type Role = "admin" | "employee";

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  department: string;
  designation: string;
  phone: string;
  address: string;
  dob: string; // yyyy-mm-dd
  joinDate: string;
  photo: string;
  baseSalary: number;
  allowances: number;
  incentive: number;
  status: "active" | "on-leave";
}

export type AttendanceStatus = "present" | "absent" | "half-day" | "leave" | "late";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // yyyy-mm-dd
  checkIn?: string; // HH:mm
  checkOut?: string;
  status: AttendanceStatus;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: "casual" | "sick" | "earned" | "birthday";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Reimbursement {
  id: string;
  employeeId: string;
  title: string;
  amount: number;
  category: "Travel" | "Food" | "Internet" | "Device";
  remarks: string;
  status: "pending" | "approved" | "rejected";
  adminComment?: string;
  createdAt: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string; // yyyy-mm
  base: number;
  allowances: number;
  incentive: number;
  pf: number;
  professionalTax: number;
  net: number;
  generatedAt: string;
}

export type ApplicantStatus = "Applied" | "Interview Scheduled" | "Offered" | "Rejected";

export interface Applicant {
  id: string;
  name: string;
  position: string;
  email: string;
  status: ApplicantStatus;
  appliedAt: string;
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  time: string;
  room: string;
  attendees: string[]; // employee ids
  tag: string;
}

export interface ActivityLog {
  id: string;
  message: string;
  actorId?: string;
  at: string;
}

export interface HRMSState {
  employees: Employee[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  reimbursements: Reimbursement[];
  payslips: Payslip[];
  applicants: Applicant[];
  schedules: Schedule[];
  activity: ActivityLog[];
  sessionId: string | null;
}