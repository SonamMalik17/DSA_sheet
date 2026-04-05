import { FiYoutube, FiExternalLink, FiFileText } from "react-icons/fi";

const difficultyColors = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ProblemRow({ problem, checked, onToggle }) {
  return (
    <div
      className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 ${
        checked
          ? "bg-purple-500/5 border border-purple-500/20"
          : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10"
      }`}
    >
      {/* Checkbox */}
      <label className="relative flex-shrink-0 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(problem._id)}
          className="peer sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
            checked
              ? "bg-gradient-to-br from-purple-500 to-pink-500 border-transparent"
              : "border-gray-600 peer-hover:border-purple-400"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </label>

      {/* Title */}
      <span
        className={`flex-1 text-sm font-medium transition-colors min-w-0 truncate ${
          checked ? "text-gray-500 line-through" : "text-gray-200"
        }`}
      >
        {problem.title}
      </span>

      {/* Difficulty badge */}
      <span
        className={`hidden sm:inline-flex flex-shrink-0 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${difficultyColors[problem.difficulty]}`}
      >
        {problem.difficulty}
      </span>

      {/* Mobile difficulty dot */}
      <span
        className={`sm:hidden flex-shrink-0 w-2 h-2 rounded-full ${
          problem.difficulty === "Easy"
            ? "bg-emerald-400"
            : problem.difficulty === "Medium"
            ? "bg-amber-400"
            : "bg-red-400"
        }`}
      />

      {/* Links */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {problem.youtubeLink && (
          <a
            href={problem.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            title="YouTube Tutorial"
          >
            <FiYoutube className="text-sm sm:text-base" />
          </a>
        )}
        {problem.leetcodeLink && (
          <a
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-all"
            title="LeetCode / Codeforces"
          >
            <FiExternalLink className="text-sm sm:text-base" />
          </a>
        )}
        {problem.articleLink && (
          <a
            href={problem.articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
            title="Article"
          >
            <FiFileText className="text-sm sm:text-base" />
          </a>
        )}
      </div>
    </div>
  );
}
