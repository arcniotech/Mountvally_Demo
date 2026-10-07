import React, { useState } from 'react';
import {
  Sparkles,
  Printer,
  Download,
  RotateCw,
  Save,
  CheckCircle2,
  FileText,
  Sliders,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';
import { ChipSelector } from '../../components/common/ChipSelector';

export function AIQuestionPaperPage() {
  const { showSuccess } = useToast();

  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [examType, setExamType] = useState('Half-Yearly Examination');
  const [difficulty, setDifficulty] = useState('Balanced');
  const [totalMarks, setTotalMarks] = useState('100');
  const [duration, setDuration] = useState('3 Hours');
  const [topics, setTopics] = useState('Quadratic Equations, Trigonometry, Coordinate Geometry, Surface Areas & Volumes');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState(true); // default preview ready

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPaper(true);
      showSuccess(`AI Question Paper for ${selectedClass} ${selectedSubject} generated successfully!`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Question Paper Generator"
        subtitle="Automated high-quality examination paper synthesis aligned with curriculum blueprints"
        showAccent={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Controls & Configuration */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Paper Blueprint Parameters</h3>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
                >
                  {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
                >
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Exam Title</label>
              <input
                type="text"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
              />
            </div>

            <ChipSelector
              label="DIFFICULTY LEVEL"
              options={['Easy', 'Balanced', 'Challenging', 'Olympiad']}
              value={difficulty}
              onChange={setDifficulty}
              activeColor="teal"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Marks</label>
                <input
                  type="text"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Topics / Chapters</label>
              <textarea
                rows="3"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 touch-press"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Question Paper</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Printable Paper Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Document Preview</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showSuccess('Question paper saved to school archives.')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                onClick={() => { showSuccess('Sending paper to printer...'); window.print(); }}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-serif">
            {/* School Header */}
            <div className="text-center border-b-2 border-slate-900 dark:border-slate-600 pb-4 space-y-1 font-sans">
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">Mount Valley Public School</h2>
              <p className="text-xs text-slate-500 font-semibold">{examType} &bull; Academic Year 2026–27</p>
              <div className="flex justify-between text-xs font-bold pt-2 border-t mt-2">
                <span>Class: {selectedClass} ({selectedSubject})</span>
                <span>Max Marks: {totalMarks}</span>
                <span>Time Allowed: {duration}</span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="font-sans text-[11px] bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl space-y-1 text-slate-600 dark:text-slate-300">
              <p className="font-bold">General Instructions:</p>
              <p>1. All questions are compulsory. Section A contains 5 MCQs (1 mark each).</p>
              <p>2. Section B contains 4 short answer questions (3 marks each).</p>
              <p>3. Section C contains 3 long answer questions with internal choices (5 marks each).</p>
            </div>

            {/* Section A */}
            <div className="space-y-3">
              <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 border-b pb-1">
                Section A &mdash; Multiple Choice Questions (1 Mark Each)
              </h4>
              <div className="space-y-2.5">
                <p><strong>Q1.</strong> If one root of the quadratic equation <em>2x² + kx - 6 = 0</em> is 2, the value of <em>k</em> is:</p>
                <p className="pl-4 text-xs font-sans text-slate-600 dark:text-slate-400">(a) -1 &emsp; (b) 1 &emsp; (c) 2 &emsp; (d) -2</p>

                <p><strong>Q2.</strong> The distance of the point P(-6, 8) from the origin is:</p>
                <p className="pl-4 text-xs font-sans text-slate-600 dark:text-slate-400">(a) 8 &emsp; (b) 2√7 &emsp; (c) 10 &emsp; (d) 6</p>

                <p><strong>Q3.</strong> If <em>sin θ + cos θ = √2 cos θ</em>, then the value of <em>tan θ</em> is:</p>
                <p className="pl-4 text-xs font-sans text-slate-600 dark:text-slate-400">(a) √2 - 1 &emsp; (b) √2 + 1 &emsp; (c) 1/√2 &emsp; (d) √3</p>
              </div>
            </div>

            {/* Section B */}
            <div className="space-y-3">
              <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 border-b pb-1">
                Section B &mdash; Short Answer Questions (3 Marks Each)
              </h4>
              <div className="space-y-2.5">
                <p><strong>Q4.</strong> Find the roots of the equation <em>4x² + 4√3x + 3 = 0</em> by the method of completing the square.</p>
                <p><strong>Q5.</strong> Prove that: <em>(sin θ - 2sin³ θ) / (2cos³ θ - cos θ) = tan θ</em>.</p>
                <p><strong>Q6.</strong> A solid sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm. Find how many small spheres are formed.</p>
              </div>
            </div>

            {/* Section C */}
            <div className="space-y-3">
              <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 border-b pb-1">
                Section C &mdash; Long Analytical Problems (5 Marks Each)
              </h4>
              <div className="space-y-2.5">
                <p><strong>Q7.</strong> A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.</p>
                <p><strong>Q8.</strong> The angle of elevation of the top of a building from the foot of a tower is 30° and the angle of elevation of the top of the tower from the foot of the building is 60°. If the tower is 50 m high, find the height of the building.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
