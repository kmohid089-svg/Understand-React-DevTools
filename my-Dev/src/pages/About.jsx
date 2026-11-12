
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-teal-800">
          About MyBank
        </h1>

        <p className="mt-4 text-slate-600">
          MyBank is a demo banking application built with React,
          Axios, React Router, and Tailwind CSS.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 text-white hover:bg-teal-800"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
