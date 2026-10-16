import React from 'react';
import { BadgeCheck, Wallet, Droplets, CalendarClock } from 'lucide-react';

export default function WhyChooseUs() {
  const items = [
    {
      icon: <BadgeCheck size={24} />,
      title: 'Student Surveyed',
      desc: 'Every mess around PICT was visited and audited in person by students with verified Roll Nos.',
    },
    {
      icon: <Wallet size={24} />,
      title: 'Transparent Pricing',
      desc: 'Compare single thali rates, 1-time & 2-time monthly passes, and Sunday feast prices upfront.',
    },
    {
      icon: <Droplets size={24} />,
      title: 'Hygiene & Water Info',
      desc: 'Check kitchen cleanliness scores, seating capacity, and RO drinking water availability.',
    },
    {
      icon: <CalendarClock size={24} />,
      title: 'Sunday Night & Timings',
      desc: 'Instantly see which messes stay open on Sunday nights or serve late dinner during exams.',
    },
  ];

  return (
    <section id="why-messmitra" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            WHY CHOOSE US
          </p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Eat with <span className="text-brand-blue">Confidence</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-blueLight text-brand-blue">
                {item.icon}
              </div>
              <h3 className="font-display mt-5 text-base font-extrabold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
