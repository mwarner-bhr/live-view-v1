import { useState, useRef, useEffect } from 'react';
import { Icon } from '../../components';
import {
  payrollDates,
  payrollStats,
  reminders as initialReminders,
  payrollDetails,
  payrollTitle,
  dueDate,
  payrollId,
  updatesText,
} from '../../data/payrollData';
import type { Reminder } from '../../data/payrollData';

const CARD_WIDTH = 160;
const MIN_GAP = 20;
const BUTTON_WIDTH = 40;

export function Payroll() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [visibleCardCount, setVisibleCardCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateVisibleCards = () => {
      const containerWidth = container.offsetWidth;
      // Available width = container - button - gap before button
      const availableWidth = containerWidth - BUTTON_WIDTH - MIN_GAP;
      // Cards fit: first card is CARD_WIDTH, each additional is CARD_WIDTH + MIN_GAP
      // So: CARD_WIDTH + (n-1) * (CARD_WIDTH + MIN_GAP) <= availableWidth
      // Simplify: n <= (availableWidth + MIN_GAP) / (CARD_WIDTH + MIN_GAP)
      const maxCards = Math.floor((availableWidth + MIN_GAP) / (CARD_WIDTH + MIN_GAP));
      const count = Math.max(1, Math.min(maxCards, payrollDates.length));
      console.log('Container width:', containerWidth, 'Available:', availableWidth, 'Max cards:', maxCards, 'Setting count:', count);
      setVisibleCardCount(count);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleCards);
    resizeObserver.observe(container);
    calculateVisibleCards();

    return () => resizeObserver.disconnect();
  }, []);

  const visibleDates = payrollDates.slice(0, visibleCardCount);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  return (
    <div className="min-h-full bg-[var(--surface-neutral-x-weak)] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[44px] font-bold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '52px' }}
        >
          Payroll
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="h-[40px] px-5 text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
          >
            Open TRAXPayroll
          </button>
          <button
            className="h-[40px] px-5 text-[15px] font-semibold leading-[22px] text-[var(--color-primary-strong)] bg-[var(--surface-neutral-white)] border border-[var(--color-primary-strong)] rounded-full hover:bg-[var(--color-primary-weak)] transition-colors flex items-center gap-2"
            style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
          >
            <span className="text-[16px] leading-none">⊕</span>
            New off-cycle payroll
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mb-6 relative" ref={containerRef}>
        {/* Grey horizontal line behind cards */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[var(--border-neutral-x-weak)]" style={{ transform: 'translateY(-50%)' }} />

        <div className="relative flex items-center w-full overflow-hidden">
          {/* Cards container */}
          <div className="flex items-center justify-between flex-1 mr-5 min-w-0 overflow-hidden">
            {visibleDates.map((date) => (
            <button
              key={date.id}
              className={`
                relative w-[160px] flex-shrink-0 rounded-[var(--radius-medium)] px-8 py-6 transition-all flex flex-col gap-4 items-start
                ${
                  date.isSelected
                    ? 'bg-[var(--surface-neutral-xx-weak)] border border-[var(--color-primary-strong)]'
                    : 'bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] hover:border-[var(--border-neutral-medium)]'
                }
              `}
              style={{
                boxShadow: date.isSelected
                  ? '1px 1px 0px 2px rgba(56, 49, 47, 0.05)'
                  : '1px 1px 0px 2px rgba(56, 49, 47, 0.03)'
              }}
            >
              <div className="relative self-start">
                {date.badge && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-primary-strong)] text-white rounded-full flex items-center justify-center text-[14px] font-bold">
                    {date.badge}
                  </div>
                )}
                <div className={`inline-flex items-center justify-center p-4 rounded-[var(--radius-small)] ${date.isSelected ? 'bg-[var(--color-primary-strong)]' : 'bg-[var(--surface-neutral-xx-weak)]'}`}>
                  <span className={`text-[32px] font-bold leading-none ${date.isSelected ? 'text-white' : 'text-[var(--color-primary-strong)]'}`} style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                    {date.day}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0 items-start text-left">
                <span className={`text-[15px] leading-[22px] text-[var(--color-primary-strong)] ${date.isSelected ? 'font-bold' : 'font-medium'}`}>
                  {date.month}
                </span>
                <span className="text-[13px] leading-[19px] text-[var(--text-neutral-strong)]">
                  {date.dayOfWeek}
                </span>
              </div>
            </button>
          ))}
          </div>
          {/* Arrow button - always visible */}
          <button
            className="w-[40px] h-[40px] flex-shrink-0 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full flex items-center justify-center hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
          >
            <Icon name="chevron-right" size={16} className="text-[var(--color-primary-strong)]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] p-8">
            {/* Payroll Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                <Icon name="circle-dollar" size={24} className="text-[var(--color-primary-strong)]" />
              </div>
              <h2
                className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '32px' }}
              >
                {payrollTitle}
              </h2>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {payrollStats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[16px] p-5 flex items-center gap-4"
                  style={{ boxShadow: '1px 1px 0px 2px rgba(56, 49, 47, 0.03)' }}
                >
                  <div className="w-[48px] h-[48px] bg-[var(--surface-neutral-xx-weak)] rounded-[16px] flex items-center justify-center flex-shrink-0">
                    <Icon name={stat.icon as any} size={24} className="text-[var(--color-primary-strong)]" />
                  </div>
                  <div className="flex flex-col gap-0 min-w-0">
                    <p className="text-[18px] font-semibold leading-[26px] text-[var(--color-primary-strong)]">
                      {stat.value}
                    </p>
                    <p className="text-[13px] leading-[19px] text-[var(--text-neutral-strong)]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reminders Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="gear" size={20} className="text-[var(--color-primary-strong)]" />
                <h3 className="text-[18px] font-semibold text-[var(--text-neutral-x-strong)]">
                  Reminders
                </h3>
              </div>
              <div className="space-y-3 mb-4">
                {reminders.map((reminder) => (
                  <label
                    key={reminder.id}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => toggleReminder(reminder.id)}
                      className="mt-1 w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)] cursor-pointer"
                    />
                    <span className={`text-[15px] ${reminder.completed ? 'line-through text-[var(--text-neutral-medium)]' : 'text-[var(--text-neutral-x-strong)]'}`}>
                      {reminder.text}
                    </span>
                  </label>
                ))}
              </div>
              <button className="text-[15px] font-medium text-[var(--color-primary-strong)] hover:underline">
                + Add Reminder
              </button>
            </div>

            {/* Updates Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Icon name="arrows-rotate" size={24} className="text-[var(--color-primary-strong)]" />
                <h3 className="text-[18px] font-semibold text-[var(--color-primary-strong)]">
                  Updates since last payroll
                </h3>
              </div>
              <p className="text-[15px] text-[var(--text-neutral-medium)] mb-4 leading-relaxed">
                {updatesText}
              </p>
              <button
                className="h-[40px] px-5 text-[15px] font-semibold text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors inline-flex items-center gap-2"
                style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
              >
                <Icon name="link" size={16} className="text-[var(--icon-neutral-x-strong)]" />
                Jump to report
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] p-6 border border-[var(--border-neutral-x-weak)]" style={{ boxShadow: '1px 1px 0px 2px rgba(56, 49, 47, 0.03)' }}>
            {/* Start Payroll Button */}
            <button
              className="w-full h-[48px] px-6 text-[18px] font-semibold leading-[26px] text-white bg-[var(--color-primary-strong)] rounded-full hover:opacity-90 transition-opacity mb-3"
              style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
            >
              Start payroll
            </button>
            <p className="text-[13px] text-[var(--text-neutral-medium)] mb-6 flex items-center gap-2">
              <Icon name="bell" size={12} className="text-[var(--icon-neutral-medium)]" />
              {dueDate}
            </p>

            {/* Payroll Details */}
            <div className="space-y-4 mb-6">
              {payrollDetails.map((detail) => (
                <div key={detail.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-[44px] h-[44px] bg-[var(--surface-neutral-xx-weak)] rounded-[12px] flex-shrink-0">
                    <Icon name={detail.icon as any} size={16} className="text-[var(--icon-neutral-x-strong)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-xx-strong)]">
                      {detail.value}
                    </p>
                    <p className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
                      {detail.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delete Button */}
            <button
              className="w-full h-[40px] px-5 text-[15px] font-semibold text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors mb-3"
              style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
            >
              Delete this payroll
            </button>

            {/* Payroll ID */}
            <p className="text-[12px] text-[var(--text-neutral-weak)] text-center">
              {payrollId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
