import { useState } from 'react';
import { Icon } from '../../components';
import {
  settingsNavItems,
  accountSubTabs,
  accountInfo,
  subscription,
  addOns,
  jobPostings,
  fileStorage,
  upgrades,
  dataCenter,
} from '../../data/settingsData';

export function Settings() {
  const [activeNav, setActiveNav] = useState('account');
  const [activeSubTab, setActiveSubTab] = useState('account-info');

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <h1
        className="text-[44px] font-bold text-[var(--color-primary-strong)] px-8 pt-8 pb-6"
        style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '52px' }}
      >
        Settings
      </h1>

      <div className="flex min-h-full">
        {/* Left Sidebar Navigation */}
        <div className="w-[280px] pl-8 pr-6 pb-8 overflow-y-auto flex-shrink-0">
          <nav className="space-y-1">
          {settingsNavItems.map((item) => {
            const isActive = item.id === activeNav;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`
                  group flex items-center gap-3 px-4 py-3 w-full rounded-[var(--radius-small)]
                  text-[15px] font-medium transition-colors text-left
                  ${
                    isActive
                      ? 'bg-[var(--color-primary-strong)] text-white'
                      : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-white)] hover:text-[var(--color-primary-strong)]'
                  }
                `}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  className={isActive ? 'text-white' : 'text-[var(--icon-neutral-strong)] group-hover:text-[var(--color-primary-strong)]'}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

        {/* Main Content Area */}
        <main className="flex-1 px-10 pt-0 pb-10 overflow-y-auto">
          {/* Account Card */}
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] p-8">
            {/* Account Heading */}
            <h2
              className="text-[22px] font-semibold text-[var(--color-primary-strong)] mb-6 pb-6 border-b border-[var(--border-neutral-x-weak)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Account
            </h2>

            {/* Content Layout - Vertical Tabs + Content */}
            <div className="flex gap-8">
              {/* Vertical Sub-tabs */}
              <div className="w-[160px] shrink-0">
                <nav className="flex flex-col">
                  {accountSubTabs.map((tab) => {
                    const isActive = tab.id === activeSubTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`
                          text-left px-3 py-2 text-[15px] transition-colors rounded-[var(--radius-small)]
                          ${
                            isActive
                              ? 'text-[var(--color-primary-strong)] font-semibold bg-[var(--surface-neutral-xx-weak)]'
                              : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                          }
                        `}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Account Info Content */}
              <div className="flex-1">
                <h3
                  className="text-[22px] font-semibold text-[var(--color-primary-strong)] mb-4"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
                >
                  Account Info
                </h3>

            {/* Account Info Header */}
            <div className="mb-8">
              <h4
                className="text-[28px] font-bold text-[var(--text-neutral-x-strong)] mb-3"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '36px' }}
              >
                {accountInfo.companyName}
              </h4>
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[15px] text-[var(--text-neutral-medium)]">
                    <Icon name="building" size={16} className="text-[var(--icon-neutral-medium)]" />
                    {accountInfo.accountNumber}
                  </div>
                  <div className="flex items-center gap-2 text-[15px] text-[var(--text-neutral-medium)]">
                    <Icon name="link" size={16} className="text-[var(--icon-neutral-medium)]" />
                    {accountInfo.url}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={accountInfo.owner.avatar}
                    alt={accountInfo.owner.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[16px] font-semibold text-[var(--text-neutral-x-strong)]">
                      {accountInfo.owner.name}
                    </p>
                    <p className="text-[14px] text-[var(--text-neutral-medium)]">
                      {accountInfo.owner.role}
                    </p>
                  </div>
                  <Icon name="caret-down" size={12} className="text-[var(--icon-neutral-medium)]" />
                </div>
              </div>
            </div>

            {/* My Subscription Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4
                  className="text-[18px] font-semibold text-[var(--color-primary-strong)]"
                  style={{ lineHeight: '26px' }}
                >
                  My Subscription
                </h4>
                <button className="px-6 py-2 text-[15px] font-semibold text-[var(--color-primary-strong)] border-2 border-[var(--color-primary-strong)] rounded-[var(--radius-full)] hover:bg-[var(--color-primary-weak)] transition-colors">
                  Manage Subscription
                </button>
              </div>

              {/* Pro Package Card */}
              <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] px-6 py-5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                      <Icon name="shield" size={24} className="text-[var(--color-primary-strong)]" />
                    </div>
                    <div>
                      <h5 className="text-[18px] font-bold text-[var(--text-neutral-x-strong)]">
                        {subscription.plan}
                      </h5>
                      <p className="text-[15px] text-[var(--text-neutral-medium)]">
                        {subscription.packageType}
                      </p>
                    </div>
                  </div>
                  <p className="text-[16px] text-[var(--text-neutral-medium)]">
                    {subscription.employees} Employees
                  </p>
                </div>
              </div>

              {/* Add-Ons Card */}
              <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] px-6 py-5 mb-6">
                <h5 className="text-[16px] font-medium text-[var(--color-primary-strong)] mb-4">
                  Add-Ons
                </h5>
                <div className="space-y-4">
                  {addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                          <Icon name={addOn.icon} size={24} className="text-[var(--color-primary-strong)]" />
                        </div>
                        <span className="text-[17px] font-medium text-[var(--text-neutral-x-strong)]">
                          {addOn.title}
                        </span>
                      </div>
                      {addOn.employees && (
                        <span className="text-[16px] text-[var(--text-neutral-medium)]">
                          {addOn.employees}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Postings & File Storage - Combined Card */}
              <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] px-6 py-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                        <Icon name="id-badge" size={24} className="text-[var(--color-primary-strong)]" />
                      </div>
                      <span className="text-[17px] font-medium text-[var(--text-neutral-x-strong)]">
                        Job Postings
                      </span>
                    </div>
                    <p className="text-[16px] text-[var(--text-neutral-medium)]">
                      {jobPostings.current} of {jobPostings.max}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                        <Icon name="file" size={24} className="text-[var(--color-primary-strong)]" />
                      </div>
                      <span className="text-[17px] font-medium text-[var(--text-neutral-x-strong)]">
                        File Storage
                      </span>
                    </div>
                    <p className="text-[16px] text-[var(--text-neutral-medium)]">
                      {fileStorage.used} {fileStorage.unit} of {fileStorage.total} {fileStorage.unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Upgrades Section */}
            <div className="mb-8">
              <h4
                className="text-[18px] font-semibold text-[var(--color-primary-strong)] mb-4"
                style={{ lineHeight: '26px' }}
              >
                Available Upgrades
              </h4>
              <div className="space-y-4">
                {upgrades.map((upgrade) => (
                  <div
                    key={upgrade.id}
                    className="flex items-center justify-between bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] px-6 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] flex items-center justify-center">
                        <Icon name={upgrade.icon} size={28} className="text-[var(--color-primary-strong)]" />
                      </div>
                      <div>
                        <h5 className="text-[18px] font-bold text-[var(--text-neutral-x-strong)]">
                          {upgrade.title}
                        </h5>
                        <p className="text-[15px] text-[var(--text-neutral-medium)]">
                          {upgrade.subtitle}
                        </p>
                      </div>
                    </div>
                    <button className="text-[16px] font-medium text-[var(--color-primary-strong)] hover:underline">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Supercharge Your Workflow Section */}
            <div className="mb-8">
              <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-6">
                <h4
                  className="text-[18px] font-bold text-[var(--text-neutral-x-strong)] mb-2"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '26px' }}
                >
                  Supercharge Your Workflow
                </h4>
                <p className="text-[14px] text-[var(--text-neutral-medium)] mb-4">
                  Explore our growing library of integrations to help you work smarter and faster.
                </p>
                <button className="px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-small)] hover:bg-[var(--surface-neutral-x-weak)] transition-colors">
                  Explore Apps
                </button>
              </div>
            </div>

            {/* Data Section */}
            <div>
              <h4
                className="text-[18px] font-semibold text-[var(--color-primary-strong)] mb-3"
                style={{ lineHeight: '26px' }}
              >
                Data
              </h4>
              <p className="text-[14px] text-[var(--text-neutral-medium)] mb-1">
                Data Center Location
              </p>
              <div className="flex items-center gap-2">
                <Icon name="location-dot" size={14} className="text-[var(--color-primary-strong)]" />
                <span className="text-[15px] font-medium text-[var(--text-neutral-x-strong)]">
                  {dataCenter.location}
                </span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
