import { useState } from 'react';
import { Icon, TextInput, Button, PendingFeedbackCard, FeedbackCard } from '../../components';

interface FeedbackTabContentProps {
  employeeName: string;
}

export function FeedbackTabContent({ employeeName }: FeedbackTabContentProps) {
  const [searchValue, setSearchValue] = useState('');

  const summaryText = `${employeeName}'s colleagues have shared positive feedback, praising her for her perseverance and dedication to protecting employee morale during times of transition. She is appreciated for her dependability, good questions, and ability to get work done on time. However, some suggest she should speak up about her ideas. Overall, she is seen as a great counselor and team member, with a notable sense of generosity and kindness.`;

  // Mock pending feedback requests
  const pendingRequests = [
    {
      id: '1',
      personName: 'Theo Hanley',
      personTitle: 'Director of Puppy Sciences',
      personAvatar: 'https://i.pravatar.cc/150?img=12',
      requestDate: 'March 25, 2024',
      emailSentDate: 'Tuesday, May 7, 2024',
      dueDate: 'Wed, May 22, 2024',
      daysRemaining: 14,
    },
    {
      id: '2',
      personName: 'Theo Hanley',
      personTitle: 'Director of Puppy Sciences',
      personAvatar: 'https://i.pravatar.cc/150?img=12',
      requestDate: 'March 25, 2024',
      emailSentDate: 'Tuesday, May 7, 2024',
      dueDate: 'Wed, May 22, 2024',
      daysRemaining: 14,
    },
  ];

  // Mock received feedback
  const receivedFeedback = [
    {
      id: '1',
      authorName: 'Stevie Nordness',
      authorTitle: 'VP of Good Dogs',
      date: 'March 25, 2024',
      iconName: 'face-smile',
      strengths: {
        question: 'What are some things Jessica does well?',
        answer:
          'Jessica is a really nice person. She does a great job of purchasing the right supplies, making customers and dogs alike feel welcome, and generally keeping things afloat.',
      },
      improvements: {
        question: 'How could Jessica improve?',
        answer:
          'Punctuality does make a big difference when we have hourly workers coming in -- Jessica could be a bit more punctual to help us keep things on track.',
      },
    },
    {
      id: '2',
      authorName: 'Stevie Nordness',
      authorTitle: 'VP of Good Dogs',
      date: 'March 25, 2024',
      iconName: 'face-smile',
      strengths: {
        question: 'What are some things Jessica does well?',
        answer:
          'Jessica is a really nice person. She does a great job of throwing the ball, giving good scritches, and she knows all of the best treats and toys to buy. She also likes cats, which is good because I love my cat friend.',
      },
      improvements: {
        question: 'How could Jessica improve?',
        answer:
          "She doesn't give the longest belly rubs, and I think if she did those for a bit longer, she'd get an A+ from me. Sometimes she washes my fur and I don't love that either.",
      },
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Helper Text (Info Message) */}
      <div className="flex items-start gap-2">
        <Icon name="eye-slash" size={16} className="text-[var(--icon-neutral-strong)] mt-0.5" />
        <span className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
          Just so you know, feedback is hidden from {employeeName}.
        </span>
      </div>

      {/* Request Feedback Section */}
      <div className="mt-4">
        {/* Section Header with Icon and Tooltip */}
        <div className="flex items-center gap-2">
          <Icon name="users" size={20} className="text-[var(--text-neutral-x-strong)]" />
          <span className="text-[16px] leading-[24px] font-medium text-[var(--text-neutral-x-strong)]">
            Request feedback about {employeeName}
          </span>
          <Icon name="circle-question" size={16} className="text-[var(--icon-neutral-strong)]" />
        </div>

        {/* Instruction Text */}
        <p className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)] mt-2">
          Select some employees who work with {employeeName}
        </p>

        {/* Feedback Request Form */}
        <div className="flex items-center gap-2 mt-2">
          <TextInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search names"
            size="small"
            className="w-[395px]"
          />
          <Button variant="standard" size="small">
            Send Request
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border-neutral-x-weak)] my-4" />

      {/* Feedback Summary Section */}
      <div>
        {/* Section Header with Icon and Tooltip */}
        <div className="flex items-center gap-2">
          <Icon name="sparkles" size={20} className="text-[var(--text-neutral-x-strong)]" />
          <span className="text-[16px] leading-[24px] font-medium text-[var(--text-neutral-x-strong)]">
            Summary of feedback about {employeeName}
          </span>
          <Icon name="circle-question" size={16} className="text-[var(--icon-neutral-strong)]" />
        </div>

        {/* Summary Text */}
        <p className="text-[16px] leading-[24px] text-[var(--text-neutral-x-strong)] mt-2 pl-7">
          {summaryText}
        </p>
      </div>

      {/* Pending Feedback Requests */}
      <div className="mt-6">
        <PendingFeedbackCard
          requests={pendingRequests}
          onCancel={(id) => console.log('Cancel request:', id)}
        />
      </div>

      {/* Received Feedback */}
      <div className="mt-6 space-y-6">
        {receivedFeedback.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            authorName={feedback.authorName}
            authorTitle={feedback.authorTitle}
            date={feedback.date}
            iconName={feedback.iconName}
            strengths={feedback.strengths}
            improvements={feedback.improvements}
          />
        ))}
      </div>
    </div>
  );
}

export default FeedbackTabContent;
