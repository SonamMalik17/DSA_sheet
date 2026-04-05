import { useState, useEffect } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import ProblemRow from "../components/ProblemRow";
import Collapsible from "../components/Collapsible";
import toast from "react-hot-toast";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const chapterIcons = {
  Arrays: "📦",
  Strings: "🔤",
  "Linked List": "🔗",
  "Stacks & Queues": "📚",
  Trees: "🌳",
  Graphs: "🕸️",
  "Dynamic Programming": "🧩",
  "Binary Search": "🔍",
  "Heap / Priority Queue": "⛰️",
  "Recursion & Backtracking": "🔄",
};

export default function Dashboard() {
  const [problems, setProblems] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([api.get("/problems"), api.get("/problems/progress")])
      .then(([problemsRes, progressRes]) => {
        setProblems(problemsRes.data);
        setProgress(progressRes.data);
        // Expand first chapter by default
        const chapters = Object.keys(problemsRes.data);
        if (chapters.length > 0) {
          setExpanded({ [chapters[0]]: true });
        }
      })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const toggleProgress = async (problemId) => {
    const newVal = !progress[problemId];
    setProgress((prev) => ({ ...prev, [problemId]: newVal }));
    try {
      await api.put("/problems/progress", {
        problemId,
        completed: newVal,
      });
    } catch {
      setProgress((prev) => ({ ...prev, [problemId]: !newVal }));
      toast.error("Failed to update progress");
    }
  };

  const toggleChapter = (chapter) => {
    setExpanded((prev) => ({ ...prev, [chapter]: !prev[chapter] }));
  };

  const getChapterStats = (chapter) => {
    const topics = problems[chapter];
    let total = 0;
    let done = 0;
    for (const topic of Object.values(topics)) {
      for (const p of topic) {
        total++;
        if (progress[p._id]) done++;
      }
    }
    return { total, done };
  };

  const getTotalStats = () => {
    let total = 0;
    let done = 0;
    for (const chapter of Object.values(problems)) {
      for (const topic of Object.values(chapter)) {
        for (const p of topic) {
          total++;
          if (progress[p._id]) done++;
        }
      }
    }
    return { total, done };
  };

  const getDifficultyStats = () => {
    const stats = { Easy: { total: 0, done: 0 }, Medium: { total: 0, done: 0 }, Hard: { total: 0, done: 0 } };
    for (const chapter of Object.values(problems)) {
      for (const topic of Object.values(chapter)) {
        for (const p of topic) {
          stats[p.difficulty].total++;
          if (progress[p._id]) stats[p.difficulty].done++;
        }
      }
    }
    return stats;
  };

  const filterProblems = (topicProblems) => {
    if (!search) return topicProblems;
    const q = search.toLowerCase();
    return topicProblems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.difficulty.toLowerCase().includes(q)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const totalStats = getTotalStats();
  const progressPercent =
    totalStats.total > 0
      ? Math.round((totalStats.done / totalStats.total) * 100)
      : 0;
  const diffStats = getDifficultyStats();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats Header */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Your DSA Progress
              </h1>
              <p className="text-gray-400 text-sm">
                {totalStats.done} of {totalStats.total} problems completed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/5"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-purple-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Difficulty breakdown */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Easy", textClass: "text-emerald-400", barClass: "bg-emerald-500", stats: diffStats.Easy },
              { label: "Medium", textClass: "text-amber-400", barClass: "bg-amber-500", stats: diffStats.Medium },
              { label: "Hard", textClass: "text-red-400", barClass: "bg-red-500", stats: diffStats.Hard },
            ].map(({ label, textClass, barClass, stats }) => {
              const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
              return (
                <div
                  key={label}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${textClass}`}>
                      {label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {stats.done}/{stats.total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
          />
        </div>

        {/* Chapters */}
        <div className="space-y-3">
          {Object.entries(problems).map(([chapter, topics]) => {
            const stats = getChapterStats(chapter);
            const chapterPercent =
              stats.total > 0
                ? Math.round((stats.done / stats.total) * 100)
                : 0;
            const isExpanded = expanded[chapter];

            return (
              <div
                key={chapter}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
              >
                {/* Chapter header */}
                <button
                  onClick={() => toggleChapter(chapter)}
                  className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-xl sm:text-2xl flex-shrink-0">
                    {chapterIcons[chapter] || "📁"}
                  </span>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                      {chapter}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${chapterPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {stats.done}/{stats.total}
                      </span>
                    </div>
                  </div>
                  <FiChevronDown
                    className={`text-gray-400 text-lg flex-shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                {/* Topics & Problems */}
                <Collapsible open={isExpanded}>
                  <div className="px-4 sm:px-6 pb-4 space-y-4">
                    {Object.entries(topics).map(([topic, topicProblems]) => {
                      const filtered = filterProblems(topicProblems);
                      if (filtered.length === 0) return null;

                      return (
                        <div key={topic}>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400/70 mb-2 px-1">
                            {topic}
                          </h4>
                          <div className="space-y-1.5">
                            {filtered.map((problem) => (
                              <ProblemRow
                                key={problem._id}
                                problem={problem}
                                checked={!!progress[problem._id]}
                                onToggle={toggleProgress}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
