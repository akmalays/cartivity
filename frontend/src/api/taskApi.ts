export const taskData = [
  {
    id: 1,
    title: "Playing Game",
    duration: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam iusto blanditiis corrupti eum voluptatem sapiente sunt culpa cumque quod.",
    done: false,
  },
  {
    id: 2,
    title: "Read a Book",
    duration: 1.5,
    desc: "A fascinating story about history and culture that broadens the mind and challenges perspectives.",
    done: false,
  },
  {
    id: 3,
    title: "Workout",
    duration: 1,
    desc: "Intense strength training session focused on upper body and cardio endurance.",
    done: true,
  },
  {
    id: 4,
    title: "Online Meeting",
    duration: 2,
    desc: "Team sync to align project milestones and discuss upcoming features and deadlines.",
    done: true,
  },
  {
    id: 5,
    title: "Grocery Shopping",
    duration: 0.5,
    desc: "Quick trip to the supermarket for weekly essentials and fresh produce.",
    done: false,
  },
  {
    id: 6,
    title: "Code Review",
    duration: 1,
    desc: "Reviewed pull requests and provided feedback on React components and styling.",
    done: true,
  },
  {
    id: 7,
    title: "Meditation",
    duration: 1,
    desc: "Daily mindfulness practice to reduce stress and improve focus and clarity.",
    done: true,
  },
  {
    id: 8,
    title: "Laundry",
    duration: 1,
    desc: "Washed, dried, and folded clothes while listening to a podcast.",
    done: false,
  },
  {
    id: 9,
    title: "Watch Documentary",
    duration: 1.5,
    desc: "Watched an insightful documentary about climate change and sustainability.",
    done: true,
  },
  {
    id: 10,
    title: "Write Blog Post",
    duration: 2,
    desc: "Drafted a blog post on JavaScript performance optimization techniques.",
    done: false,
  },
];

export const getTaskData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return taskData;
};