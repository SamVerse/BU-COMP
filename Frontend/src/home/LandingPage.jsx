import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  BarChart3,
  MessageSquare,
  Zap,
  Target,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // FIXED: Removed TypeScript syntax
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const id = Math.random();

      setParticles((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
        },
      ]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 600);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const handleGetStarted = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-black text-white">

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[700px] h-[700px] rounded-full blur-[180px] z-[1]"
        style={{
          translateX: smoothX,
          translateY: smoothY,
          background:
            "radial-gradient(circle, rgba(80,150,255,0.85) 0%, rgba(30,100,255,0.55) 35%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Particles */}
      <div className="pointer-events-none fixed inset-0 z-[2]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 0.4,
              y: p.y - 20,
              x: p.x + (Math.random() * 30 - 15),
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-blue-300"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0)_70%)] z-[0]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-40 left-10 w-72 h-72 bg-blue-500/40 rounded-full blur-3xl z-[0]"
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-3xl z-[0]"
        animate={{ y: [0, 50, 0], x: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* HERO */}
      <div className="relative z-10 px-6 py-32 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-300"
        >
          Hire Smarter. Evaluate Better.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto"
        >
          HireInsight transforms traditional hiring with a transparent,
          structured, and data-driven evaluation system for universities and organizations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <button
            onClick={handleGetStarted}
            className="mt-10 inline-block px-12 py-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl border border-white/30 hover:bg-white/30 transition-all text-xl shadow-xl"
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* WHY HIREINSIGHT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-100">
            Why HireInsight?
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Traditional recruitment events suffer from slow evaluations, inconsistent feedback,
            and lack of transparency. HireInsight solves these problems with intelligent automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: "Save 70% Time",
              desc:
                "Streamlined evaluation process reduces hours of manual work to minutes with structured templates and AI assistance.",
            },
            {
              icon: Shield,
              title: "Consistent Evaluation",
              desc:
                "Standardized rubrics ensure fair assessment across all projects, eliminating bias and subjectivity.",
            },
            {
              icon: MessageSquare,
              title: "AI-Powered Feedback",
              desc:
                "Automatically generate polished, actionable feedback summaries that help students improve.",
            },
            {
              icon: BarChart3,
              title: "Real-Time Analytics",
              desc:
                "Track evaluation progress, identify top talent, and export comprehensive reports instantly.",
            },
            {
              icon: Users,
              title: "Collaborative Platform",
              desc:
                "Multiple evaluators can work simultaneously with role-based access and assignment management.",
            },
            {
              icon: Target,
              title: "Data-Driven Insights",
              desc:
                "Make informed hiring decisions backed by structured ratings, comparisons, and trend analysis.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:bg-white/15 transition-all"
            >
              <item.icon className="w-12 h-12 mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-blue-200 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BUILT FOR EVERYONE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-100">
            Built for Everyone
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Three powerful dashboards designed for specific roles in your recruitment process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              role: "Participants",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
              features: [
                "Submit projects with ease",
                "Track evaluation status",
                "Receive detailed feedback",
                "View performance metrics",
                "Edit before deadline",
              ],
            },
            {
              role: "Evaluators",
              icon: Award,
              color: "from-purple-500 to-pink-500",
              features: [
                "Structured evaluation forms",
                "Rating parameters & rubrics",
                "Quick comment system",
                "Batch assignment view",
                "Save draft evaluations",
              ],
            },
            {
              role: "Organizers",
              icon: TrendingUp,
              color: "from-orange-500 to-red-500",
              features: [
                "Manage multiple events",
                "Assign evaluators efficiently",
                "Real-time progress tracking",
                "Export detailed reports",
                "Analytics dashboard",
              ],
            },
          ].map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${role.color}`} />

              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${role.color}`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-white">{role.role}</h3>
              </div>

              <ul className="space-y-3">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-blue-200">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-100">
            How It Works
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Get started in minutes with our intuitive three-step process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "1",
              title: "Sign Up & Choose Role",
              desc:
                "Create your account and select whether you're a participant, evaluator, or organizer.",
              icon: Users,
            },
            {
              step: "2",
              title: "Submit or Evaluate",
              desc:
                "Participants submit projects. Evaluators review using structured rubrics and feedback.",
              icon: Zap,
            },
            {
              step: "3",
              title: "Get Insights & Results",
              desc:
                "Organizers access analytics and export comprehensive reports using AI insights.",
              icon: BarChart3,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl">
                {item.step}
              </div>

              <div className="mt-8">
                <item.icon className="w-10 h-10 mb-4 text-blue-300" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-white/20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join universities and organizations that are already using HireInsight
            to make recruitment events faster, fairer, and more insightful.
          </p>

          <button
            onClick={handleGetStarted}
            className="px-12 py-4 bg-white text-blue-600 rounded-full text-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Create Your Account
          </button>
        </motion.div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="text-center text-blue-300 text-sm">
          <p>
            © 2025 HireInsight. Making recruitment transparent, structured, and
            data-driven.
          </p>
        </div>
      </div>
    </div>
  );
}
