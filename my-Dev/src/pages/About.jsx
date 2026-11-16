import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function About() {
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users?_limit=4'
        );
        setTeam(data);
      } catch (err) {
        setTeamError('Could not load team data.');
      } finally {
        setTeamLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-teal-800">About MyBank</h1>

        <p className="mt-4 text-slate-600">
          MyBank is a demo banking application built with React, Axios, React Router, and Tailwind CSS.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 text-white hover:bg-teal-800"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Our Team section */}
      <div className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-2xl font-black text-slate-800">Our Team</h2>
        <p className="mt-1 text-sm text-slate-500">Team data from JSONPlaceholder API.</p>
        {teamLoading && <p className="mt-4 text-slate-500">Loading team…</p>}
        {teamError && <p className="mt-4 text-red-500">{teamError}</p>}
        {team.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-lg font-black text-white">
                  {member.name.charAt(0)}
                </div>
                <p className="mt-3 font-extrabold text-slate-900">{member.name}</p>
                <p className="mt-1 text-sm text-slate-500">{member.email}</p>
                <p className="mt-1 text-xs text-teal-700 font-semibold">{member.company?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
