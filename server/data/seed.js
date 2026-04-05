require("dotenv").config();
const mongoose = require("mongoose");
const Problem = require("../models/Problem");

const problems = [
  // Chapter 1: Arrays
  { chapter: "Arrays", topic: "Array Basics", title: "Two Sum", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA", leetcodeLink: "https://leetcode.com/problems/two-sum/", articleLink: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/" },
  { chapter: "Arrays", topic: "Array Basics", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", articleLink: "https://takeuforward.org/data-structure/stock-buy-and-sell/" },
  { chapter: "Arrays", topic: "Array Basics", title: "Contains Duplicate", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kPg", leetcodeLink: "https://leetcode.com/problems/contains-duplicate/", articleLink: "https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/" },
  { chapter: "Arrays", topic: "Array Basics", title: "Maximum Subarray (Kadane's Algorithm)", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=w_KEocd__20", leetcodeLink: "https://leetcode.com/problems/maximum-subarray/", articleLink: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/" },
  { chapter: "Arrays", topic: "Sliding Window", title: "Maximum Sum Subarray of Size K", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=KtpqUH4Efow", leetcodeLink: "https://leetcode.com/problems/maximum-average-subarray-i/", articleLink: "https://www.geeksforgeeks.org/window-sliding-technique/" },
  { chapter: "Arrays", topic: "Sliding Window", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=wiGpQwVHdE0", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", articleLink: "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/" },
  { chapter: "Arrays", topic: "Two Pointers", title: "3Sum", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=jzZsG8n2R9A", leetcodeLink: "https://leetcode.com/problems/3sum/", articleLink: "https://takeuforward.org/data-structure/3-sum-find-all-triplets-that-add-up-to-a-given-sum/" },
  { chapter: "Arrays", topic: "Two Pointers", title: "Container With Most Water", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=aO1eJrpKxkA", leetcodeLink: "https://leetcode.com/problems/container-with-most-water/", articleLink: "https://www.geeksforgeeks.org/container-with-most-water/" },
  { chapter: "Arrays", topic: "Sorting", title: "Merge Intervals", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=2JzRBPFYbKE", leetcodeLink: "https://leetcode.com/problems/merge-intervals/", articleLink: "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/" },
  { chapter: "Arrays", topic: "Sorting", title: "Sort Colors (Dutch National Flag)", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=oaVa-9wmpns", leetcodeLink: "https://leetcode.com/problems/sort-colors/", articleLink: "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/" },

  // Chapter 2: Strings
  { chapter: "Strings", topic: "String Basics", title: "Valid Anagram", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA", leetcodeLink: "https://leetcode.com/problems/valid-anagram/", articleLink: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/" },
  { chapter: "Strings", topic: "String Basics", title: "Valid Palindrome", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=jJXJ16kPFWg", leetcodeLink: "https://leetcode.com/problems/valid-palindrome/", articleLink: "https://www.geeksforgeeks.org/check-if-a-string-is-palindrome/" },
  { chapter: "Strings", topic: "String Basics", title: "Longest Common Prefix", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=0sWShKIJoo4", leetcodeLink: "https://leetcode.com/problems/longest-common-prefix/", articleLink: "https://www.geeksforgeeks.org/longest-common-prefix-using-sorting/" },
  { chapter: "Strings", topic: "Pattern Matching", title: "Longest Palindromic Substring", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=XYQecbcd6_c", leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/", articleLink: "https://takeuforward.org/data-structure/longest-palindromic-substring/" },
  { chapter: "Strings", topic: "Pattern Matching", title: "Group Anagrams", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=vzdNOK2oB2E", leetcodeLink: "https://leetcode.com/problems/group-anagrams/", articleLink: "https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/" },
  { chapter: "Strings", topic: "Pattern Matching", title: "Minimum Window Substring", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=jSto0O4AJbM", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/", articleLink: "https://takeuforward.org/data-structure/minimum-window-substring/" },

  // Chapter 3: Linked List
  { chapter: "Linked List", topic: "Singly Linked List", title: "Reverse Linked List", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=iRtLEoL-r-g", leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/", articleLink: "https://takeuforward.org/data-structure/reverse-a-linked-list/" },
  { chapter: "Linked List", topic: "Singly Linked List", title: "Merge Two Sorted Lists", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=Xb4slcp1U38", leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/", articleLink: "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/" },
  { chapter: "Linked List", topic: "Singly Linked List", title: "Linked List Cycle", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=354J83hX7RI", leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/", articleLink: "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/" },
  { chapter: "Linked List", topic: "Advanced", title: "Remove Nth Node From End", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=3kMKYQ2wNIU", leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", articleLink: "https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/" },
  { chapter: "Linked List", topic: "Advanced", title: "LRU Cache", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=xDEuM5qa0zg", leetcodeLink: "https://leetcode.com/problems/lru-cache/", articleLink: "https://www.geeksforgeeks.org/lru-cache-implementation/" },

  // Chapter 4: Stacks & Queues
  { chapter: "Stacks & Queues", topic: "Stack Problems", title: "Valid Parentheses", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=wkDfsKijrZ8", leetcodeLink: "https://leetcode.com/problems/valid-parentheses/", articleLink: "https://takeuforward.org/data-structure/check-for-balanced-parentheses/" },
  { chapter: "Stacks & Queues", topic: "Stack Problems", title: "Min Stack", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=V09NfaGf2ao", leetcodeLink: "https://leetcode.com/problems/min-stack/", articleLink: "https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/" },
  { chapter: "Stacks & Queues", topic: "Stack Problems", title: "Next Greater Element", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=Du881K7Jtk8", leetcodeLink: "https://leetcode.com/problems/next-greater-element-i/", articleLink: "https://takeuforward.org/data-structure/next-greater-element-using-stack/" },
  { chapter: "Stacks & Queues", topic: "Queue Problems", title: "Implement Queue Using Stacks", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=3Et9MrMc02A", leetcodeLink: "https://leetcode.com/problems/implement-queue-using-stacks/", articleLink: "https://www.geeksforgeeks.org/queue-using-stacks/" },
  { chapter: "Stacks & Queues", topic: "Monotonic Stack", title: "Largest Rectangle in Histogram", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=X0X6G-eWgQ8", leetcodeLink: "https://leetcode.com/problems/largest-rectangle-in-histogram/", articleLink: "https://takeuforward.org/data-structure/area-of-largest-rectangle-in-histogram/" },

  // Chapter 5: Trees
  { chapter: "Trees", topic: "Binary Tree Traversal", title: "Inorder Traversal", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=Z_NEgBgbRVI", leetcodeLink: "https://leetcode.com/problems/binary-tree-inorder-traversal/", articleLink: "https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/" },
  { chapter: "Trees", topic: "Binary Tree Traversal", title: "Level Order Traversal", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=EoAsWbO7sqg", leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/", articleLink: "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/" },
  { chapter: "Trees", topic: "Binary Tree Problems", title: "Maximum Depth of Binary Tree", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ", leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", articleLink: "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/" },
  { chapter: "Trees", topic: "Binary Tree Problems", title: "Validate Binary Search Tree", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=s6ATEkipzow", leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/", articleLink: "https://takeuforward.org/data-structure/check-if-a-tree-is-a-bst-or-bst/" },
  { chapter: "Trees", topic: "Binary Tree Problems", title: "Lowest Common Ancestor", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=_-QHfMDde90", leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", articleLink: "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/" },
  { chapter: "Trees", topic: "Binary Tree Problems", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=-YbXySKJsX8", leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", articleLink: "https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/" },

  // Chapter 6: Graphs
  { chapter: "Graphs", topic: "Graph Traversal", title: "Number of Islands", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=pV2kpPD66nE", leetcodeLink: "https://leetcode.com/problems/number-of-islands/", articleLink: "https://takeuforward.org/data-structure/number-of-islands/" },
  { chapter: "Graphs", topic: "Graph Traversal", title: "Clone Graph", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=mQeF6bN8hMk", leetcodeLink: "https://leetcode.com/problems/clone-graph/", articleLink: "https://www.geeksforgeeks.org/clone-an-undirected-graph/" },
  { chapter: "Graphs", topic: "Shortest Path", title: "Course Schedule", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=EUbrTkjGlxY", leetcodeLink: "https://leetcode.com/problems/course-schedule/", articleLink: "https://takeuforward.org/data-structure/course-schedule-i-and-ii/" },
  { chapter: "Graphs", topic: "Shortest Path", title: "Word Ladder", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=tRPda0rcf8E", leetcodeLink: "https://leetcode.com/problems/word-ladder/", articleLink: "https://takeuforward.org/graph/word-ladder-i-g-29/" },

  // Chapter 7: Dynamic Programming
  { chapter: "Dynamic Programming", topic: "1D DP", title: "Climbing Stairs", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI", leetcodeLink: "https://leetcode.com/problems/climbing-stairs/", articleLink: "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/" },
  { chapter: "Dynamic Programming", topic: "1D DP", title: "House Robber", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=GrMBfJNk_NY", leetcodeLink: "https://leetcode.com/problems/house-robber/", articleLink: "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/" },
  { chapter: "Dynamic Programming", topic: "2D DP", title: "Longest Common Subsequence", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=NPZn9jBrX8U", leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/", articleLink: "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/" },
  { chapter: "Dynamic Programming", topic: "2D DP", title: "0/1 Knapsack Problem", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=GqOmJHQZivw", leetcodeLink: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", articleLink: "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/" },
  { chapter: "Dynamic Programming", topic: "2D DP", title: "Edit Distance", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=fJaKO8FbDdo", leetcodeLink: "https://leetcode.com/problems/edit-distance/", articleLink: "https://takeuforward.org/data-structure/edit-distance-dp-33/" },
  { chapter: "Dynamic Programming", topic: "Subsequences", title: "Longest Increasing Subsequence", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=ekcwMsSIzVc", leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/", articleLink: "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/" },

  // Chapter 8: Binary Search
  { chapter: "Binary Search", topic: "Basic Binary Search", title: "Binary Search", difficulty: "Easy", youtubeLink: "https://www.youtube.com/watch?v=MHf6awe89xw", leetcodeLink: "https://leetcode.com/problems/binary-search/", articleLink: "https://takeuforward.org/data-structure/binary-search-explained/" },
  { chapter: "Binary Search", topic: "Basic Binary Search", title: "Search in Rotated Sorted Array", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=r3pMQ8-Ad5s", leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/", articleLink: "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/" },
  { chapter: "Binary Search", topic: "Advanced Binary Search", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=nhEMDKMB44g", leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", articleLink: "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/" },
  { chapter: "Binary Search", topic: "Advanced Binary Search", title: "Median of Two Sorted Arrays", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=F9c7LpRZWVQ", leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/", articleLink: "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/" },

  // Chapter 9: Heap / Priority Queue
  { chapter: "Heap / Priority Queue", topic: "Heap Problems", title: "Kth Largest Element in Array", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=hGK_5n81drs", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/", articleLink: "https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/" },
  { chapter: "Heap / Priority Queue", topic: "Heap Problems", title: "Top K Frequent Elements", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=YPTqKIgVk-k", leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/", articleLink: "https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/" },
  { chapter: "Heap / Priority Queue", topic: "Heap Problems", title: "Find Median from Data Stream", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=itmhHWaHupI", leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/", articleLink: "https://takeuforward.org/data-structure/median-in-a-stream-of-integers/" },

  // Chapter 10: Recursion & Backtracking
  { chapter: "Recursion & Backtracking", topic: "Recursion", title: "Subsets", difficulty: "Medium", youtubeLink: "https://www.youtube.com/watch?v=REOH22Xwdkk", leetcodeLink: "https://leetcode.com/problems/subsets/", articleLink: "https://takeuforward.org/data-structure/power-set-print-all-the-possible-subsequences-of-the-string/" },
  { chapter: "Recursion & Backtracking", topic: "Backtracking", title: "N-Queens", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=i05Ju7AftcM", leetcodeLink: "https://leetcode.com/problems/n-queens/", articleLink: "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/" },
  { chapter: "Recursion & Backtracking", topic: "Backtracking", title: "Sudoku Solver", difficulty: "Hard", youtubeLink: "https://www.youtube.com/watch?v=FWAIf_EVUKE", leetcodeLink: "https://leetcode.com/problems/sudoku-solver/", articleLink: "https://takeuforward.org/data-structure/sudoku-solver/" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Problem.deleteMany({});
    console.log("Cleared existing problems");

    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
