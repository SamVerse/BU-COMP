import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Confetti from "react-confetti";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function EvaluatedStage() {
  const { submission } = useOutletContext();
  const [showConfetti, setShowConfetti] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 2500);
  }, []);

  return (
    <div className="space-y-10">
      {showConfetti && <Confetti numberOfPieces={180} recycle={false} />}

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-xl p-6 bg-white shadow-lg border-green-300"
        style={{ boxShadow: "0 0 12px rgba(0,255,0,0.18)" }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{submission.title}</h2>
          <p className="text-gray-600">{submission.event}</p>

          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium text-sm">
            🟢 Evaluated
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Evaluated On: <strong>2025-01-22</strong>  
            <br />
            Evaluated By: <strong>XYZ Corp – HR Priya Sharma</strong>
          </p>
        </div>
      </motion.div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Overall Score" value="8.4 / 10" />
        <SummaryCard title="Shortlisted" value="⭐ Shortlisted for Interview" />
        <SummaryCard title="AI Verdict" value="Strong Technical Depth" />
        <SummaryCard title="Human Score" value="Above Average" />
      </div>

      {/* MATRIX */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-4">Evaluator’s Assessment Matrix</h3>

        <div className="space-y-4">
          <MatrixItem label="Innovation" value="⭐⭐⭐⭐☆" />
          <MatrixItem label="Technical Depth" value="8 / 10" />
          <MatrixItem label="Problem Understanding" value="Excellent" />
          <MatrixItem label="Practical Use Case" value="✔️ Yes" />
          <MatrixItem label="Presentation Clarity" value="7 / 10" />
        </div>
      </motion.div>

      {/* RADAR CHART - UPDATED SIZE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-md border"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-5">Performance Chart</h3>

        {/* FIXED SIZE WRAPPER */}
        <div className="mx-auto" style={{ width: "400px", height: "380px" }}>
          <Radar
            data={{
              labels: [
                "Innovation",
                "Code Quality",
                "Technical Depth",
                "Completeness",
                "Design/UX",
                "Presentation"
              ],
              datasets: [
                {
                  label: "Evaluation Score",
                  data: [8, 7, 9, 8, 6, 7],
                  backgroundColor: "rgba(124, 58, 237, 0.2)",
                  borderColor: "rgb(124, 58, 237)",
                  borderWidth: 2,
                }
              ]
            }}
            options={{
              maintainAspectRatio: false, // 🔥 important
              scales: {
                r: {
                  suggestedMin: 0,
                  suggestedMax: 10,
                  ticks: { stepSize: 2 }
                }
              }
            }}
          />
        </div>
      </motion.div>

      {/* FEEDBACK */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow-md border space-y-5">
        <h3 className="text-xl font-semibold">Evaluator Feedback</h3>

        <div>
          <h4 className="font-medium">What impressed the evaluator</h4>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Strong real-world application</li>
            <li>Clean UI & good user flows</li>
            <li>Excellent explanation during demo</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mt-4">Areas of improvement</h4>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Optimize backend logic and API structure</li>
            <li>Improve mobile responsiveness</li>
            <li>Add automated testing</li>
          </ul>
        </div>
      </motion.div>

      {/* AI INSIGHTS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">
          ⚡ AI-Generated Performance Report
        </h3>

        <div className="space-y-3 text-purple-900">
          <p><strong>Highlights:</strong> Your project excels in innovation & clarity.</p>
          <p><strong>Weak Areas:</strong> Backend optimization is recommended.</p>
          <p><strong>Skill Mapping:</strong> MERN strengths, moderate system design ability.</p>

          <p><strong>Recommended Next Steps:</strong></p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Master caching & API optimization.</li>
            <li>Improve Figma design workflow.</li>
            <li>Add automated testing pipelines.</li>
          </ul>
        </div>
      </motion.div>

      {/* FOOTER */}
      <div className="flex justify-end">
        <button className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
          Download Evaluation Report (PDF)
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-xl shadow-md border">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </motion.div>
  );
}

function MatrixItem({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-700">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
