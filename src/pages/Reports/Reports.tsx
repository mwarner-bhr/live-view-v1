import { useState } from 'react';
import { Icon, TextArea } from '../../components';
import { insights, recentReports, suggestionQuestions } from '../../data/analytics';

export function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const categories = [
    { id: 'overview', label: 'Overview', icon: 'chart-pie-simple' as const },
    { id: 'favorites', label: 'Favorites', icon: 'face-smile' as const },
    { id: 'all', label: 'All', icon: 'file-lines' as const },
    { id: 'general', label: 'General', icon: 'file-lines' as const },
    { id: 'compliance', label: 'Compliance', icon: 'circle-question' as const },
    { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' as const },
    { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' as const },
    { id: 'time-attendance', label: 'Time & Attendance', icon: 'chart-pie-simple' as const },
    { id: 'benefits', label: 'Benefits', icon: 'face-smile' as const },
    { id: 'training', label: 'Training', icon: 'file-lines' as const },
    { id: 'performance', label: 'Performance & Culture', icon: 'chart-pie-simple' as const },
    { id: 'hiring', label: 'Hiring', icon: 'user-group' as const },
    { id: 'custom', label: 'Custom folder', icon: 'file-lines' as const },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--surface-neutral-xx-weak)]">
      {/* Header */}
      <div className="flex items-center justify-between pr-10 pt-10 pb-6 pl-8">
        <h1>Analytics</h1>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 h-10 px-4 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)]">
            <Icon name="magnifying-glass" size={16} className="text-[var(--icon-neutral-strong)]" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-[200px] bg-transparent text-[14px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
            />
          </div>
          {/* New Button */}
          <button className="flex items-center gap-2 h-10 px-5 bg-[var(--color-primary-strong)] text-white rounded-[var(--radius-full)] text-[15px] font-medium hover:bg-[#267015] transition-colors">
            <span className="text-[18px] leading-none">+</span>
            <span>New</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="ml-1">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area with Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-[280px] pl-8 overflow-y-auto flex-shrink-0">
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors
                  ${
                    selectedCategory === category.id
                      ? 'bg-[var(--color-primary-strong)] text-white'
                      : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                  }
                `}
              >
                <Icon name={category.icon} size={16} className={selectedCategory === category.id ? 'text-white' : ''} />
                <span>{category.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 pr-10 pl-6 pb-10 overflow-y-auto">

        {/* Ask a Question Section */}
        <div className="mb-8">
          {/* White card wrapper */}
          <div className="bg-[var(--surface-neutral-white)] rounded-lg p-6">
            <div className="mb-5">
              <TextArea placeholder="Ask a question about your data..." />
            </div>

            {/* Suggestion Questions */}
            <div className="grid grid-cols-4 gap-4">
              {suggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-[var(--surface-neutral-xx-weak)] rounded-lg text-left text-[14px] leading-5 text-[#676260] hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z"
                  fill="#2e7918"
                  stroke="#2e7918"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <h2
                className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                Insights
              </h2>
            </div>
            <button className="text-[15px] font-medium text-[var(--color-primary-strong)] hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-6 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-small)] hover:border-[var(--color-primary-strong)] transition-colors cursor-pointer"
              >
                <div className="mb-4">
                  {insight.icon === 'document' && (
                    <Icon name="file-lines" size={24} className="text-[var(--icon-neutral-strong)]" />
                  )}
                  {insight.icon === 'circle-info' && (
                    <Icon name="circle-question" size={24} className="text-[var(--icon-neutral-strong)]" />
                  )}
                  {insight.icon === 'graduation-cap' && (
                    <Icon name="id-badge" size={24} className="text-[var(--icon-neutral-strong)]" />
                  )}
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text-neutral-xx-strong)] mb-2">
                  {insight.title}
                </h3>
                <p className="text-[14px] text-[var(--text-neutral-medium)] leading-[20px]">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="#2e7918"
                strokeWidth="1.5"
              />
              <path d="M10 6V10L13 13" stroke="#2e7918" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2
              className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Recently Viewed
            </h2>
          </div>

          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
            <div className="px-6 py-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface-neutral-xx-weak)]">
                    <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tl-[8px] rounded-bl-[8px]">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tr-[8px] rounded-br-[8px]">
                      Last Viewed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                      <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                        <a
                          href="#"
                          className="text-[15px] font-medium text-[#2563eb] hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          {report.name}
                        </a>
                        {report.name === 'Age Profile' && (
                          <Icon name="user-group" size={14} className="text-[var(--icon-neutral-medium)]" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] text-[var(--text-neutral-strong)]">{report.owner}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] text-[var(--text-neutral-medium)]">{report.lastViewed}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Reports;
