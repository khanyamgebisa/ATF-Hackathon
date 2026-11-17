import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

type Skill = { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; source: 'Formal education' | 'Professional work' | 'Personal project'; };

type Talent = {
  id: number;
  name: string;
  age: number;
  province: string;
  municipality: string;
  education: string;
  qualification: string;
  institution: string;
  nqf: number;
  field: string;
  type: string;
  year: number;
  status: 'Unemployed' | 'Employed in my field' | 'Employed outside my field' | 'Underemployed' | 'Self-employed' | 'Currently studying';
  experience: number;
  industry: string;
  skills: Skill[];
  salary?: number;
  expectedSalary?: number;
};

type Demand = {
  id: number;
  company: string;
  industry: string;
  role: string;
  qualification: string;
  nqf: number;
  skills: string[];
  province: string;
  salary: string;
  vacancies: number;
  strain: boolean;
};

const provinces = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'];
const statuses = ['Unemployed', 'Employed in my field', 'Employed outside my field', 'Underemployed', 'Self-employed', 'Currently studying'];
const educationLevels = ['Matric', 'Certificate', 'Diploma', 'Degree', 'Postgraduate'];
const sectors = ['Technology', 'Finance', 'Manufacturing', 'Healthcare', 'Public sector', 'Retail', 'Construction', 'Logistics'];
const skillCatalog = ['JavaScript', 'Python', 'React', 'SQL', 'SQL', 'AWS', 'Data Analysis', 'Project Management', 'Communication', 'Java', 'UI/UX', 'Excel', 'Power BI', 'Leadership'];
const qualifications = ['Business Management', 'Computer Science', 'Mechanical Engineering', 'Accounting', 'Human Resources', 'Electrical Engineering', 'Nursing', 'Marketing', 'Civil Engineering'];
const institutions = ['University of Cape Town', 'University of Pretoria', 'UJ', 'Wits', 'Stellenbosch', 'NWU', 'UCT', 'RAU'];
const jobTitles = ['Data Analyst', 'Software Developer', 'Project Coordinator', 'Accountant', 'Junior Engineer', 'Business Analyst', 'HR Officer'];

const makeProfiles = (): Talent[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const status = statuses[i % statuses.length];
    const province = provinces[i % provinces.length];
    const qualification = qualifications[i % qualifications.length];
    const field = qualification;
    const skills: Skill[] = Array.from({ length: 5 }, (_, s) => ({
      name: skillCatalog[(i + s) % skillCatalog.length],
      level: ['Beginner', 'Intermediate', 'Advanced'][((i + s) % 3)] as 'Beginner' | 'Intermediate' | 'Advanced',
      source: ['Formal education', 'Professional work', 'Personal project'][((i + s) % 3)] as 'Formal education' | 'Professional work' | 'Personal project'
    }));
    return {
      id: i + 1,
      name: `Talent ${i + 1}`,
      age: 18 + ((i * 7) % 17),
      province,
      municipality: `${province.split(' ')[0]} Metro`,
      education: educationLevels[i % educationLevels.length],
      qualification,
      institution: institutions[i % institutions.length],
      nqf: 4 + ((i * 3) % 7),
      field,
      type: ['Certificate', 'Diploma', 'Degree', 'Postgraduate'][i % 4],
      year: 2016 + (i % 7),
      status,
      experience: (i % 9) + 1,
      industry: sectors[i % sectors.length],
      skills,
      salary: 4000 + ((i * 210) % 25000),
      expectedSalary: 7000 + ((i * 260) % 30000)
    };
  });
};

const demoProfiles = makeProfiles();
const demandData: Demand[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  company: ['Nedbank', 'Vodacom', 'Sanlam', 'AB InBev', 'Naspers', 'Shoprite', 'Sasol', 'Nestlé', 'Transnet', 'Mukuru', 'Capitec', 'PwC', 'Mango', 'TymeBank', 'Dis-Chem'][i % 15],
  industry: sectors[i % sectors.length],
  role: jobTitles[i % jobTitles.length],
  qualification: qualifications[i % qualifications.length],
  nqf: 5 + (i % 6),
  skills: ['JavaScript', 'React', 'SQL', 'Data Analysis', 'Communication', 'Project Management'].slice(0, (i % 4) + 2),
  province: provinces[i % provinces.length],
  salary: `R${(18000 + i * 2000).toLocaleString()} - R${(32000 + i * 2000).toLocaleString()}`,
  vacancies: 2 + (i % 6),
  strain: i % 2 === 0
}));

const baseColors = ['#0f172a', '#0f766e', '#14b8a6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#60a5fa'];

function App() {
  const [profiles, setProfiles] = useState<Talent[]>(demoProfiles);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedQualification, setSelectedQualification] = useState('All');
  const [draft, setDraft] = useState({
    name: '',
    age: '24',
    province: 'Gauteng',
    municipality: 'Johannesburg',
    education: 'Degree',
    qualification: 'Computer Science',
    institution: 'University of Cape Town',
    nqf: '7',
    field: 'Technology',
    type: 'Degree',
    year: '2023',
    status: 'Unemployed',
    experience: '2',
    industry: 'Technology',
    skills: 'JavaScript, React, SQL, Communication',
    expectedSalary: 'R18 000'
  });

  const stats = useMemo(() => {
    const total = profiles.length;
    const unemployed = profiles.filter((p) => p.status === 'Unemployed').length;
    const employedField = profiles.filter((p) => p.status === 'Employed in my field').length;
    const employedOutside = profiles.filter((p) => p.status === 'Employed outside my field').length;
    const underemployed = profiles.filter((p) => p.status === 'Underemployed').length;
    const qualifications = new Set(profiles.map((p) => p.qualification)).size;
    const skillCounts = profiles.flatMap((p) => p.skills.map((s) => s.name)).reduce<Record<string, number>>((acc, name) => {
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {});
    const mostCommonSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 7);
    return { total, unemployed, employedField, employedOutside, underemployed, qualifications, mostCommonSkills };
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const statusOk = selectedStatus === 'All' || p.status === selectedStatus;
      const provinceOk = selectedProvince === 'All' || p.province === selectedProvince;
      const qualificationOk = selectedQualification === 'All' || p.qualification === selectedQualification;
      return statusOk && provinceOk && qualificationOk;
    });
  }, [profiles, selectedStatus, selectedProvince, selectedQualification]);

  const employmentData = statuses.map((name) => ({ name, value: profiles.filter((p) => p.status === name).length }));
  const qualificationData = Object.entries(
    profiles.reduce<Record<string, number>>((acc, p) => {
      acc[p.qualification] = (acc[p.qualification] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value })).slice(0, 7);
  const nqfData = Array.from({ length: 10 }, (_, i) => ({ name: `NQF ${i + 1}`, value: profiles.filter((p) => p.nqf === i + 1).length }));
  const skillData = Object.entries(profiles.flatMap((p) => p.skills.map((s) => s.name)).reduce<Record<string, number>>((acc, skill) => {
    acc[skill] = (acc[skill] ?? 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, value]) => ({ name, value }));
  const provinceData = Object.entries(profiles.reduce<Record<string, number>>((acc, p) => {
    acc[p.province] = (acc[p.province] ?? 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));
  const experienceData = Array.from({ length: 8 }, (_, i) => ({ name: `${i + 1} yrs`, value: profiles.filter((p) => p.experience === i + 1).length }));

  const demandSkillMap = demandData.reduce<Record<string, number>>((acc, d) => {
    d.skills.forEach((s) => {
      acc[s] = (acc[s] ?? 0) + d.vacancies;
    });
    return acc;
  }, {});

  const availableSkillMap = profiles.flatMap((p) => p.skills.map((s) => s.name)).reduce<Record<string, number>>((acc, s) => {
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  const gaps = Object.entries(demandSkillMap).map(([name, demand]) => ({
    name,
    demand,
    available: availableSkillMap[name] ?? 0,
    gap: demand - (availableSkillMap[name] ?? 0)
  })).sort((a, b) => b.gap - a.gap).slice(0, 8);

  const registerProfile = () => {
    const items = draft.skills.split(',').map((s) => s.trim()).filter(Boolean);
    const newProfile: Talent = {
      id: profiles.length + 1,
      name: draft.name || 'New Talent Profile',
      age: Number(draft.age) || 24,
      province: draft.province,
      municipality: draft.municipality,
      education: draft.education,
      qualification: draft.qualification,
      institution: draft.institution,
      nqf: Number(draft.nqf) || 7,
      field: draft.field,
      type: draft.type,
      year: Number(draft.year) || 2024,
      status: draft.status as Talent['status'],
      experience: Number(draft.experience) || 2,
      industry: draft.industry,
      skills: items.map((name, idx) => ({
        name,
        level: ['Beginner', 'Intermediate', 'Advanced'][idx % 3] as Skill['level'],
        source: ['Formal education', 'Professional work', 'Personal project'][idx % 3] as Skill['source']
      })),
      expectedSalary: Number(draft.expectedSalary.replace(/[^\d]/g, '')) || 18000
    };
    setProfiles((current) => [newProfile, ...current]);
    setDraft({
      name: '',
      age: '24',
      province: 'Gauteng',
      municipality: 'Johannesburg',
      education: 'Degree',
      qualification: 'Computer Science',
      institution: 'University of Cape Town',
      nqf: '7',
      field: 'Technology',
      type: 'Degree',
      year: '2024',
      status: 'Unemployed',
      experience: '2',
      industry: 'Technology',
      skills: 'JavaScript, React, SQL, Communication',
      expectedSalary: 'R18 000'
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-lg font-bold text-white">TA</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Talent Atlas</div>
              <div className="text-xs text-slate-500">South Africa</div>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#problem">Problem</a>
            <a href="#youth">Youth Portal</a>
            <a href="#dashboard">Employer Dashboard</a>
            <a href="#admin">Admin</a>
          </nav>
          <div className="flex gap-2">
            <a href="#youth" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">Create Your Talent Profile</a>
            <a href="#dashboard" className="rounded-xl bg-navy px-4 py-2 text-sm font-medium text-white">Explore Talent Intelligence</a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
          <div className="grid-pattern absolute inset-0 opacity-50" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">Labour Market Intelligence</div>
              <div>
                <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">South Africa has the talent. <span className="text-teal-700">Let’s measure it.</span></h1>
                <p className="mt-5 max-w-xl text-lg text-slate-600">
                  An intelligent view of South Africa’s talent landscape. Discover the qualifications, skills and experience available across the country, identify gaps and make better workforce decisions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#youth" className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300">Create Your Talent Profile</a>
                <a href="#dashboard" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Explore Talent Intelligence</a>
                <a href="#demand" className="rounded-xl border border-teal-300 bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-700">Submit Employer Skills Demand</a>
              </div>
              <div className="grid max-w-lg grid-cols-3 gap-4 pt-4">
                <div className="stat-card">
                  <div className="text-2xl font-black text-navy">{stats.total}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Profiles</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-black text-teal-700">{stats.qualifications}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Qualifications</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-black text-emerald-600">{demandData.length}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Demand entries</div>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Market overview</div>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Illustrative analytics</h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Sample data</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={employmentData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#475569', fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#0f766e" fill="url(#colorVal)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Top shortage</div>
                  <div className="mt-2 text-lg font-bold text-slate-900">Data Analysis</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">High unemployment</div>
                  <div className="mt-2 text-lg font-bold text-slate-900">Business Management</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="mb-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">The problem</div>
            <h2 className="section-title mt-3">A talent-employment mismatch is hard to see without data.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[{
              title: 'Large youth talent pool',
              copy: 'Millions of graduates and workers are not captured in a structured national view of skills and qualifications.'
            }, {
              title: 'Skills mismatch',
              copy: 'Employers struggle to find suitable candidates, while many talent profiles remain invisible or underrepresented.'
            }, {
              title: 'Poor workforce decisions',
              copy: 'Without comparable data, training, hiring and placement decisions are based on guesswork instead of evidence.'
            }].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700">•</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 px-4 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">How it works</div>
              <h2 className="section-title mt-3 text-white">Structured talent data creates actionable labour-market intelligence.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ['1. Capture talent profiles', 'Youth create profiles with qualifications, work history, skills and employment status.'],
                ['2. Classify and analyse', 'Profiles are grouped by qualification, NQF level, province, and skill mix.'],
                ['3. Compare to employer demand', 'Employers submit hiring needs and see the skills gaps against available talent.']
              ].map(([step, copy]) => (
                <div key={step} className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                  <div className="mb-4 text-3xl font-black text-teal-300">{step.split('.')[0]}</div>
                  <div className="text-xl font-semibold text-white">{step.replace(/^\d+\.\s*/, '')}</div>
                  <p className="mt-3 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="youth" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="mb-12 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Youth Portal</div>
            <h2 className="section-title mt-3">Register your profile and make your talent visible.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label">Full name</label>
                  <input className="input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Age</label>
                  <input className="input" value={draft.age} onChange={(e) => setDraft({ ...draft, age: e.target.value })} placeholder="Age" />
                </div>
                <div>
                  <label className="label">Province</label>
                  <select className="select" value={draft.province} onChange={(e) => setDraft({ ...draft, province: e.target.value })}>
                    {provinces.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Municipality</label>
                  <input className="input" value={draft.municipality} onChange={(e) => setDraft({ ...draft, municipality: e.target.value })} placeholder="Municipality" />
                </div>
                <div>
                  <label className="label">Highest education</label>
                  <select className="select" value={draft.education} onChange={(e) => setDraft({ ...draft, education: e.target.value })}>
                    {educationLevels.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Qualification</label>
                  <select className="select" value={draft.qualification} onChange={(e) => setDraft({ ...draft, qualification: e.target.value })}>
                    {qualifications.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Institution</label>
                  <select className="select" value={draft.institution} onChange={(e) => setDraft({ ...draft, institution: e.target.value })}>
                    {institutions.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">NQF level</label>
                  <input className="input" value={draft.nqf} onChange={(e) => setDraft({ ...draft, nqf: e.target.value })} placeholder="7" />
                </div>
                <div>
                  <label className="label">Qualification type</label>
                  <select className="select" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
                    {['Certificate', 'Diploma', 'Degree', 'Postgraduate'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Year completed</label>
                  <input className="input" value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} placeholder="2024" />
                </div>
                <div>
                  <label className="label">Current employment status</label>
                  <select className="select" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Years of experience</label>
                  <input className="input" value={draft.experience} onChange={(e) => setDraft({ ...draft, experience: e.target.value })} placeholder="2" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Skills</label>
                  <input className="input" value={draft.skills} onChange={(e) => setDraft({ ...draft, skills: e.target.value })} placeholder="JavaScript, React, SQL" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Expected salary range</label>
                  <input className="input" value={draft.expectedSalary} onChange={(e) => setDraft({ ...draft, expectedSalary: e.target.value })} placeholder="R18 000" />
                </div>
              </div>
              <button onClick={registerProfile} className="mt-6 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white">Save profile to talent register</button>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Profile summary</div>
                <div className="mt-4 space-y-4 text-sm text-slate-500">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Registered talent</span><span className="font-bold text-slate-900">{profiles.length}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Unemployed candidates</span><span className="font-bold text-slate-900">{stats.unemployed}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Most common skill</span><span className="font-bold text-slate-900">{stats.mostCommonSkills[0]?.[0] || 'JavaScript'}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>South African coverage</span><span className="font-bold text-slate-900">9 provinces</span></div>
                </div>
              </div>
              <div className="card p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sample profile highlights</div>
                <div className="mt-4 space-y-3">
                  {['Software Development','Data Analysis','Business Management','Project Coordination'].map((tag) => (
                    <span key={tag} className="mr-2 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard" className="bg-slate-100 px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Employer Portal</div>
              <h2 className="section-title mt-3">Talent Intelligence Dashboard</h2>
            </div>
            <div className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {[
                ['Total registered talent', stats.total],
                ['Unemployed qualified', stats.unemployed],
                ['Employed in field', stats.employedField],
                ['Employed outside field', stats.employedOutside],
                ['Underemployed', stats.underemployed],
                ['Represented qualifications', stats.qualifications]
              ].map(([label, value]) => (
                <div key={label} className="stat-card">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                  <div className="mt-4 text-3xl font-black text-slate-900">{String(value)}</div>
                </div>
              ))}
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="card p-6">
                <div className="mb-4 text-lg font-bold text-slate-900">Talent Explorer</div>
                <div className="space-y-4">
                  <div>
                    <label className="label">Qualification</label>
                    <select className="select" value={selectedQualification} onChange={(e) => setSelectedQualification(e.target.value)}>
                      <option value="All">All</option>
                      {qualifications.map((q) => <option key={q}>{q}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Province</label>
                    <select className="select" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                      <option value="All">All</option>
                      {provinces.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Employment status</label>
                    <select className="select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      <option value="All">All</option>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="mb-4 text-lg font-bold text-slate-900">Filtered results</div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Profiles</div><div className="mt-3 text-3xl font-black text-navy">{filteredProfiles.length}</div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg experience</div><div className="mt-3 text-3xl font-black text-teal-700">{Math.round(filteredProfiles.reduce((sum, p) => sum + p.experience, 0) / Math.max(filteredProfiles.length, 1))} yrs</div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Top skills</div><div className="mt-3 text-sm font-bold text-slate-900">{skillData[0]?.name || 'JavaScript'}</div></div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card p-6">
                <div className="mb-5 text-lg font-bold text-slate-900">Employment status distribution</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#0f766e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-6">
                <div className="mb-5 text-lg font-bold text-slate-900">Qualification distribution</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={qualificationData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110} paddingAngle={2}>
                        {qualificationData.map((entry, index) => <Cell key={entry.name} fill={baseColors[index % baseColors.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-6">
                <div className="mb-5 text-lg font-bold text-slate-900">NQF level distribution</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nqfData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#0f172a" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-6">
                <div className="mb-5 text-lg font-bold text-slate-900">Skills distribution</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillData}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
                      <PolarRadiusAxis tick={{ fill: '#64748b' }} />
                      <Radar dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.5} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-6 lg:col-span-2">
                <div className="mb-5 text-lg font-bold text-slate-900">Geographic distribution by province</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={provinceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#0f766e" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-6 lg:col-span-2">
                <div className="mb-5 text-lg font-bold text-slate-900">Experience distribution</div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={experienceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" id="demand">
          <div className="mb-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Skills Gap Analysis</div>
            <h2 className="section-title mt-3">Compare available talent with employer demand.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <div className="mb-4 text-lg font-bold text-slate-900">High demand but low representation</div>
              <div className="space-y-3">
                {gaps.map((g) => (
                  <div key={g.name} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-800">{g.name}</div>
                      <div className={`rounded-full px-2 py-1 text-xs font-bold ${g.gap > 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{g.gap > 0 ? `Gap ${g.gap}` : 'Balanced'}</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">Demand {g.demand} · Available {g.available}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <div className="mb-4 text-lg font-bold text-slate-900">Qualifications with mismatch risk</div>
              <div className="space-y-3">
                {[
                  ['Business Management', 'High unemployment', 'Moderate demand'],
                  ['Computer Science', 'Strong deployable talent', 'High employer demand'],
                  ['Civil Engineering', 'Limited local availability', 'High vacancy pressure'],
                  ['Nursing', 'Strong national supply', 'Clinical demand remains steady']
                ].map(([qual, a, b]) => (
                  <div key={qual} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-800">{qual}</div>
                      <div className="rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">Watchlist</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{a} · {b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="admin" className="bg-slate-900 px-4 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Administrator Portal</div>
              <h2 className="section-title mt-3 text-white">Review, quality-check and govern the talent register.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ['Registered users', profiles.length],
                ['Employer demand submissions', demandData.length],
                ['Data quality score', '93%'],
                ['Profile approvals pending', '12'],
                ['Registration growth', '+18% MoM'],
                ['Industries tracked', '8']
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                  <div className="mt-4 text-3xl font-black text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
