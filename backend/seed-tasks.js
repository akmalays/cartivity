const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const taskData = [
  {
    title: "Playing Game",
    duration: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam iusto blanditiis corrupti eum voluptatem sapiente sunt culpa cumque quod.",
    done: false,
  },
  {
    title: "Read a Book",
    duration: 1.5,
    desc: "A fascinating story about history and culture that broadens the mind and challenges perspectives.",
    done: false,
  },
  {
    title: "Workout",
    duration: 1,
    desc: "Intense strength training session focused on upper body and cardio endurance.",
    done: true,
  },
  {
    title: "Online Meeting",
    duration: 2,
    desc: "Team sync to align project milestones and discuss upcoming features and deadlines.",
    done: true,
  },
  {
    title: "Grocery Shopping",
    duration: 0.5,
    desc: "Quick trip to the supermarket for weekly essentials and fresh produce.",
    done: false,
  },
  {
    title: "Code Review",
    duration: 1,
    desc: "Reviewed pull requests and provided feedback on React components and styling.",
    done: true,
  },
  {
    title: "Meditation",
    duration: 1,
    desc: "Daily mindfulness practice to reduce stress and improve focus and clarity.",
    done: true,
  },
  {
    title: "Laundry",
    duration: 1,
    desc: "Washed, dried, and folded clothes while listening to a podcast.",
    done: false,
  },
  {
    title: "Watch Documentary",
    duration: 1.5,
    desc: "Watched an insightful documentary about climate change and sustainability.",
    done: true,
  },
  {
    title: "Write Blog Post",
    duration: 2,
    desc: "Drafted a blog post on JavaScript performance optimization techniques.",
    done: false,
  },
];

const seedTasks = async () => {
  try {
    // Get first user from auth.users
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError || !users || users.users.length === 0) {
      console.log('No users found. Please register a user first.');
      process.exit();
    }

    const userId = users.users[0].id;
    console.log(`Seeding tasks for user: ${userId}`);

    // Add user_id to all tasks
    const tasksWithUserId = taskData.map(task => ({
      ...task,
      user_id: userId
    }));

    const { data, error } = await supabase
      .from('tasks')
      .insert(tasksWithUserId);

    if (error) throw error;
    console.log(`Tasks seeded successfully (${tasksWithUserId.length} tasks)`);
  } catch (error) {
    console.error('Error seeding tasks:', error);
  } finally {
    process.exit();
  }
};

seedTasks();