import React from 'react';
import { MapPin } from 'lucide-react';

export default function StudentVoices({ onSelectMess }) {
  const notes = [
    {
      quote:
        'Top pick for North Indian and outstation freshers. 100% pure Desi Ghee phulkas, Dal Makhani on rotation, and a spotless 40-seat dining hall.',
      messId: 7,
      messLabel: 'SK Dining (Santosh Mess)',
      student: 'Parth',
      role: 'PICT Student · Roll No: 22235',
      initials: 'PA',
    },
    {
      quote:
        'Certified on-site RO drinking water and dinner open till 11:30 PM for exam nights. Plus it stays open on Sunday nights when most messes close.',
      messId: 8,
      messLabel: 'Sadguru Mess',
      student: 'Pawan',
      role: 'PICT Student · Roll No: 22236',
      initials: 'PW',
    },
    {
      quote:
        'Ghar-jaisa light Maharashtrian taste right near PICT Back Gate. Open on Sunday nights with free room delivery included at the same rate.',
      messId: 1,
      messLabel: 'Kirteshwar Khanawal',
      student: 'Malhar',
      role: 'PICT Student · Roll No: 22226',
      initials: 'MA',
    },
  ];

  return (
    <section id="student-voices" className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            STUDENT NOTES
          </p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What Students <span className="text-brand-blue">Say</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <div key={n.messId} className="card flex flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="text-sm tracking-widest text-brand-orange">★★★★★</div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">"{n.quote}"</p>
                <button
                  type="button"
                  onClick={() => onSelectMess(n.messId)}
                  className="mt-4 pill bg-brand-blueLight px-3 py-1 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                >
                  <MapPin size={12} /> {n.messLabel}
                </button>
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-extrabold text-slate-700">
                  {n.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{n.student}</div>
                  <div className="text-xs text-slate-400">{n.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
