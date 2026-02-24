import { useState } from 'react';
import { Icon, Button, Dropdown, GoalCard } from '../../components';

interface GoalsTabContentProps {
  employeeName: string;
}

export function GoalsTabContent({ employeeName }: GoalsTabContentProps) {
  const [statusFilter, setStatusFilter] = useState('in-progress');

  // Status filter options
  const statusOptions = [
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' },
  ];

  // Mock goals data
  const goals = [
    {
      id: '1',
      goalText:
        'I would like to reduce the amount of overtime that employees work. This can increase job satisfaction and ensure employees feel well-rested.',
      progress: 75,
      dueDate: 'Dec 30, 2024',
      collaborators: [
        {
          id: '1',
          name: 'Person 1',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: '2',
          name: 'Person 2',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
          id: '3',
          name: 'Person 3',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
        {
          id: '4',
          name: 'Person 4',
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
        {
          id: '5',
          name: 'Person 5',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
        {
          id: '6',
          name: 'Person 6',
          avatar: 'https://i.pravatar.cc/150?img=6',
        },
        {
          id: '7',
          name: 'Person 7',
          avatar: 'https://i.pravatar.cc/150?img=7',
        },
      ],
    },
    {
      id: '2',
      goalText: "I want to feel like I've really made a difference in the world.",
      progress: 75,
      dueDate: 'Dec 30, 2024',
      collaborators: [
        {
          id: '1',
          name: 'Person 1',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        {
          id: '2',
          name: 'Person 2',
          avatar: 'https://i.pravatar.cc/150?img=9',
        },
        {
          id: '3',
          name: 'Person 3',
          avatar: 'https://i.pravatar.cc/150?img=10',
        },
        {
          id: '4',
          name: 'Person 4',
          avatar: 'https://i.pravatar.cc/150?img=11',
        },
        {
          id: '5',
          name: 'Person 5',
          avatar: 'https://i.pravatar.cc/150?img=12',
        },
        {
          id: '6',
          name: 'Person 6',
          avatar: 'https://i.pravatar.cc/150?img=13',
        },
        {
          id: '7',
          name: 'Person 7',
          avatar: 'https://i.pravatar.cc/150?img=14',
        },
      ],
    },
    {
      id: '3',
      goalText:
        "This is what a medium-length goal might look like. It's going to be about three lines, like this.",
      progress: 0,
      dueDate: 'Dec 30, 2024',
      collaborators: [
        {
          id: '1',
          name: 'Person 1',
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
        {
          id: '2',
          name: 'Person 2',
          avatar: 'https://i.pravatar.cc/150?img=16',
        },
        {
          id: '3',
          name: 'Person 3',
          avatar: 'https://i.pravatar.cc/150?img=17',
        },
        {
          id: '4',
          name: 'Person 4',
          avatar: 'https://i.pravatar.cc/150?img=18',
        },
        {
          id: '5',
          name: 'Person 5',
          avatar: 'https://i.pravatar.cc/150?img=19',
        },
        {
          id: '6',
          name: 'Person 6',
          avatar: 'https://i.pravatar.cc/150?img=20',
        },
        {
          id: '7',
          name: 'Person 7',
          avatar: 'https://i.pravatar.cc/150?img=21',
        },
      ],
    },
    {
      id: '4',
      goalText:
        "I'm curious what a super long gigantic goal would look like. Goal sounds like coal which reminds me of a coal train which can also be super duper long and can t...",
      progress: 25,
      dueDate: 'Dec 30, 2024',
      collaborators: [
        {
          id: '1',
          name: 'Person 1',
          avatar: 'https://i.pravatar.cc/150?img=22',
        },
        {
          id: '2',
          name: 'Person 2',
          avatar: 'https://i.pravatar.cc/150?img=23',
        },
        {
          id: '3',
          name: 'Person 3',
          avatar: 'https://i.pravatar.cc/150?img=24',
        },
        {
          id: '4',
          name: 'Person 4',
          avatar: 'https://i.pravatar.cc/150?img=25',
        },
        {
          id: '5',
          name: 'Person 5',
          avatar: 'https://i.pravatar.cc/150?img=26',
        },
        {
          id: '6',
          name: 'Person 6',
          avatar: 'https://i.pravatar.cc/150?img=27',
        },
        {
          id: '7',
          name: 'Person 7',
          avatar: 'https://i.pravatar.cc/150?img=28',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Top Bar: New Goal Button and Status Filter */}
      <div className="flex items-center justify-between mb-6">
        {/* New Goal Button */}
        <Button variant="standard" size="small" className="gap-2">
          <Icon name="circle-plus" size={16} className="text-current" />
          New Goal
        </Button>

        {/* Status Filter */}
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
            Status:
          </span>
          <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-[180px] [&>button]:h-10"
          />
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goalText={goal.goalText}
            progress={goal.progress}
            dueDate={goal.dueDate}
            collaborators={goal.collaborators}
          />
        ))}
      </div>
    </div>
  );
}

export default GoalsTabContent;
