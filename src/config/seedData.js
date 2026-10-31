const isoDateFromToday = (offsetInDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetInDays);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const now = new Date().toISOString();

export const seedTasks = [
  {
    id: 'seed-task-1',
    title: 'Design the new marketing landing page',
    description:
      'Wireframe the hero, feature grid, and pricing sections. Share the Figma link with the team before Friday.',
    priority: 'high',
    status: 'in-progress',
    dueDate: isoDateFromToday(2),
    order: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-2',
    title: 'Fix mobile navigation overflow',
    description:
      'The account menu breaks on screens narrower than 360px. Reproduce, patch, and add a regression test.',
    priority: 'high',
    status: 'todo',
    dueDate: isoDateFromToday(-1),
    order: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-3',
    title: 'Plan the Q4 product roadmap',
    description:
      'Collect feedback from support and sales, then draft the quarterly themes for review.',
    priority: 'medium',
    status: 'todo',
    dueDate: isoDateFromToday(0),
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-4',
    title: 'Write onboarding documentation',
    description:
      'Document the first-run experience for new workspace members, including roles and permissions.',
    priority: 'low',
    status: 'todo',
    dueDate: isoDateFromToday(11),
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-5',
    title: 'Ship v1.2 release notes',
    description:
      'Summarise the new board filters, dark mode, and keyboard shortcuts for the changelog.',
    priority: 'medium',
    status: 'completed',
    dueDate: isoDateFromToday(-3),
    order: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-6',
    title: 'Audit colour contrast across the app',
    description:
      'Run an accessibility pass on badges, muted text, and focus rings in both themes.',
    priority: 'low',
    status: 'completed',
    dueDate: isoDateFromToday(-7),
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'seed-task-7',
    title: 'Set up the CI pipeline',
    description:
      'Run lint, build, and preview deployments on every pull request to the main branch.',
    priority: 'medium',
    status: 'in-progress',
    dueDate: isoDateFromToday(4),
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
];
