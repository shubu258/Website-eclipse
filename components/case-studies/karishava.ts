import addPatient from "@/public/work/karishava/add-patient.png";
import dashboard from "@/public/work/karishava/dashboard.png";
import login from "@/public/work/karishava/login.png";
import patientProfile from "@/public/work/karishava/patient-profile.png";
import type { CaseStudy } from "./types";

// Patient and staff details in these screenshots are blurred before publishing.
export const karishava: CaseStudy = {
  slug: "karishava-crm",
  accent: "#18665f",
  tagline: "A custom hospital CRM that keeps every patient case in one record, from first contact to billing.",
  summary:
    "Karishava's team coordinates patients referred from many countries. We built them a CRM around that workflow. Every patient's details, status, documents, receipts and history live on one profile, and admins and sales staff each get a view that fits their role.",
  facts: [
    { k: "Industry", v: "Healthcare operations" },
    { k: "What we did", v: "Custom CRM design & build" },
    { k: "Access", v: "Internal tool, role-based" },
    { k: "Year", v: "2026" },
  ],
  hero: { src: dashboard, alt: "Sales dashboard with patient totals, an 11-stage patient pipeline and recent patients" },
  sections: [
    {
      label: "The challenge",
      title: "Patient information was spread across too many places.",
      body: [
        "Several people handle different parts of each patient's journey. Details, reports, receipts, past conversations and current status lived in separate records, so answering “where is this patient now?” took time. Each person also needed to see only the parts relevant to their role.",
      ],
      items: [
        { t: "Scattered records", d: "Patient details, documents and history kept in different sources." },
        { t: "Unclear status", d: "No single place to see where each patient is in the process." },
        { t: "Different roles", d: "Admins and sales staff need different access and permissions." },
        { t: "Loose paperwork", d: "Documents and receipts had to be matched to the right patient by hand." },
      ],
    },
    {
      label: "Our solution",
      title: "One profile per patient, one pipeline for the team.",
      body: [
        "Every patient gets a dedicated profile that acts as the single source of truth: their details, current stage, documents, receipts and a full history of what has happened so far. Around those profiles, the CRM gives the team a live view of the whole patient pipeline.",
      ],
      quote: "Built around how Karishava's team actually works, not a generic CRM they would have to bend their process to fit.",
    },
    {
      label: "Patient pipeline",
      title: "Every case moves through 11 clear stages.",
      body: ["Staff can see at a glance how many patients are at each stage, and open any case to move it forward."],
      steps: [
        "Referral: case created, medical reports received",
        "Hospital: awaiting unit response, treatment plan shared",
        "Travel: waiting for VIL, VIL shared, appointment booked",
        "Care: patient checked in, then checked out",
        "Close-out: billing received, case closed",
      ],
      shots: [
        {
          src: patientProfile,
          alt: "Patient profile showing the stage tracker, patient and medical information, documents and assigned sales user",
          caption: "A patient profile: stage tracker, details, medical documents and who owns the case.",
        },
      ],
    },
    {
      label: "Roles & access",
      title: "The right view for admins and for sales.",
      items: [
        { t: "Admin dashboard", d: "Full view of patients, sales activity, documents and receipts, plus user and access management." },
        { t: "Sales workspace", d: "A focused view of assigned patients: update status, review history, keep records current." },
        { t: "Role-based access", d: "Sensitive admin functions stay restricted, and new roles can be added as the team grows." },
      ],
      shots: [{ src: login, alt: "Karishava sign-in page", caption: "Secure sign-in for the internal team, with email or Google." }],
    },
    {
      label: "Documents & history",
      title: "Paperwork stays attached to the patient.",
      body: [
        "Medical reports, documents and payment receipts are stored against the patient they belong to, next to that patient's history of updates and status changes. Anyone picking up a case sees everything that happened before, instead of starting from scratch.",
      ],
      shots: [
        {
          src: addPatient,
          alt: "Add Patient form with patient information, medical information and document upload",
          caption: "Adding a patient: details, medical information and documents in one form.",
          narrow: true,
        },
      ],
    },
    {
      label: "Key features",
      title: "What we delivered",
      items: [
        { t: "Patient profiles", d: "Details, status, documents, receipts and history on one page." },
        { t: "Status tracking", d: "An 11-stage pipeline showing where every case stands." },
        { t: "Admin & sales dashboards", d: "Separate workspaces shaped around each role." },
        { t: "Document management", d: "Files uploaded and organised per patient." },
        { t: "Receipt management", d: "Payment records linked to the right patient." },
        { t: "Search & records", d: "Quick access to any patient and their records." },
      ],
    },
    {
      label: "Impact",
      title: "From scattered records to one connected system.",
      body: [
        "Karishava's team now finds patient information, status, documents, receipts and history in one place. Admins keep oversight and control, and sales staff have a clear workflow for their own cases. The architecture keeps presentation, business logic, access control and data separate, so new modules and workflows can be added without a rebuild.",
      ],
    },
  ],
};
