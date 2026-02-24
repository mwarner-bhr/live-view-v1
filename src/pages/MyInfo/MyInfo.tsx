import { useState, useEffect, useRef } from 'react';
import { Icon, Button, TextInput } from '../../components';
import { currentEmployee } from '../../data/currentEmployee';
import { PerformanceTabContent } from './PerformanceTabContent';
import { JobTabContent } from './JobTabContent';

const profileTabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job' },
  { id: 'time-off', label: 'Time off' },
  { id: 'documents', label: 'Documents' },
  { id: 'timesheets', label: 'Timesheets' },
  { id: 'performance', label: 'Performance' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'training', label: 'Training' },
];

const MORE_TAB = { id: 'more', label: 'More' };

export function MyInfo() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [floatingHeaderHeight, setFloatingHeaderHeight] = useState<number | null>(null);
  const [visibleTabCount, setVisibleTabCount] = useState(profileTabs.length);
  const [floatingVisibleTabCount, setFloatingVisibleTabCount] = useState(profileTabs.length);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showFloatingMoreDropdown, setShowFloatingMoreDropdown] = useState(false);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const floatingTabContainerRef = useRef<HTMLDivElement>(null);
  const measurementTabsRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const floatingMoreButtonRef = useRef<HTMLDivElement>(null);
  const employee = currentEmployee;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreButtonRef.current && !moreButtonRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
      if (floatingMoreButtonRef.current && !floatingMoreButtonRef.current.contains(event.target as Node)) {
        setShowFloatingMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating header when main header is NOT intersecting (scrolled out of view)
        setShowFloatingHeader(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px',
      }
    );

    const headerElement = headerRef.current;
    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) {
      return;
    }

    const updateHeight = () => {
      setFloatingHeaderHeight(Math.ceil(headerElement.getBoundingClientRect().height));
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Measure tab widths once on mount
  useEffect(() => {
    const measurementContainer = measurementTabsRef.current;
    if (!measurementContainer) return;

    const tabs = Array.from(measurementContainer.children) as HTMLElement[];
    const widths = tabs.map((tab) => tab.offsetWidth);
    setTabWidths(widths);
  }, []);

  // Responsive tabs for main header
  useEffect(() => {
    const container = tabContainerRef.current;
    if (!container || tabWidths.length === 0) return;

    const calculateVisibleTabs = () => {
      // Get the actual content width (excluding padding)
      const computedStyle = getComputedStyle(container);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const contentWidth = container.offsetWidth - paddingLeft - paddingRight;

      const GAP = 4; // gap-1 = 4px
      const MORE_BUTTON_WIDTH = 90; // Approximate width for "More" button (always visible)

      let totalWidth = MORE_BUTTON_WIDTH; // Start with More button width
      let visibleCount = 0;

      // Add tabs one by one until they don't fit (always reserve space for More button)
      for (let i = 0; i < tabWidths.length; i++) {
        const tabWidth = tabWidths[i];
        const gapWidth = GAP; // Always add gap before each tab (including before More button)

        if (totalWidth + tabWidth + gapWidth <= contentWidth) {
          totalWidth += tabWidth + gapWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      setVisibleTabCount(Math.max(0, visibleCount));
    };

    calculateVisibleTabs();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateVisibleTabs);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [tabWidths]);

  // Responsive tabs for floating header
  useEffect(() => {
    const container = floatingTabContainerRef.current;
    if (!container || !showFloatingHeader || tabWidths.length === 0) return;

    const calculateVisibleTabs = () => {
      // Get the actual content width (excluding padding)
      const computedStyle = getComputedStyle(container);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const contentWidth = container.offsetWidth - paddingLeft - paddingRight;

      const GAP = 4;
      const MORE_BUTTON_WIDTH = 90;

      let totalWidth = MORE_BUTTON_WIDTH; // Start with More button width
      let visibleCount = 0;

      for (let i = 0; i < tabWidths.length; i++) {
        const tabWidth = tabWidths[i];
        const gapWidth = GAP;

        if (totalWidth + tabWidth + gapWidth <= contentWidth) {
          totalWidth += tabWidth + gapWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      setFloatingVisibleTabCount(Math.max(0, visibleCount));
    };

    calculateVisibleTabs();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateVisibleTabs);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [showFloatingHeader, tabWidths]);

  return (
    <div className="h-full overflow-auto">
      {/* Floating Compact Header */}
      {showFloatingHeader && (
        <div
          className="sticky top-0 z-50 flex items-start animate-[floatDown_220ms_ease-out]"
          style={floatingHeaderHeight ? { minHeight: `${floatingHeaderHeight}px` } : undefined}
        >
          <div className="bg-[var(--color-primary-strong)] rounded-[var(--radius-small)] pl-10 pr-8 py-2 shadow-[2px_2px_0px_2px_rgba(56,49,47,0.05)] w-full overflow-visible">
            <div className="flex items-center gap-3">
              {/* Avatar and Name */}
              <div className="flex items-center gap-3">
                <img
                  src={employee.avatar}
                  alt={`${employee.preferredName} ${employee.lastName}`}
                  className="w-12 h-12 rounded-[var(--radius-x-small)] object-cover shadow-[1px_1px_0px_1px_rgba(56,49,47,0.04)]"
                />
                <h2
                  className="text-[22px] font-semibold text-white"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
                >
                  {employee.preferredName} {employee.lastName}
                </h2>
              </div>

              {/* Compact Tabs */}
              <div
                ref={floatingTabContainerRef}
                className="pl-[22px] flex-1 min-w-0 relative"
              >
                <div className="flex items-center gap-1 whitespace-nowrap">
                  {profileTabs.slice(0, floatingVisibleTabCount).map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex items-center justify-center gap-3 px-4 py-4 rounded-[var(--radius-small)] shrink-0
                          ${isActive
                            ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--color-primary-strong)] font-bold'
                            : 'text-white font-medium hover:bg-white/10'
                          }
                          text-[15px] leading-[22px] transition-colors
                        `}
                      >
                        {tab.label}
                      </button>
                    );
                  })}

                  {/* More dropdown - always visible */}
                  <div ref={floatingMoreButtonRef} className="relative">
                    <button
                      onClick={() => setShowFloatingMoreDropdown(!showFloatingMoreDropdown)}
                      className={`
                        flex items-center justify-center gap-3 px-4 py-4 rounded-[var(--radius-small)] shrink-0
                        text-white font-medium hover:bg-white/10
                        text-[15px] leading-[22px] transition-colors
                      `}
                    >
                      {MORE_TAB.label}
                      <Icon name="caret-down" size={10} className="text-current" />
                    </button>

                    {/* Dropdown menu */}
                    {showFloatingMoreDropdown && floatingVisibleTabCount < profileTabs.length && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowFloatingMoreDropdown(false)}
                        />
                        <div
                          className="absolute top-full right-0 mt-1 rounded-[var(--radius-small)] shadow-lg py-1 z-[9999] min-w-[160px] max-h-[400px] overflow-y-auto flex flex-col"
                          style={{
                            backgroundColor: 'var(--surface-neutral-white)',
                            border: '1px solid var(--border-neutral-weak)'
                          }}
                        >
                          {profileTabs.slice(floatingVisibleTabCount).map((tab) => {
                            const isActive = tab.id === activeTab;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => {
                                  setActiveTab(tab.id);
                                  setShowFloatingMoreDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2 text-[15px] transition-colors"
                                style={{
                                  backgroundColor: isActive ? 'var(--surface-neutral-xx-weak)' : 'transparent',
                                  color: isActive ? 'var(--color-primary-strong)' : 'var(--text-neutral-strong)',
                                  fontWeight: isActive ? 'bold' : 'normal'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'var(--surface-neutral-xx-weak)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }
                                }}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header - Green Banner */}
      <div
        ref={headerRef}
        className="relative px-8 pt-4 pb-0 bg-[var(--color-primary-strong)] rounded-[var(--radius-large)]"
      >
        {/* Header Contents */}
        <div className="relative flex flex-col gap-[50px] pt-[34px]">
          {/* Top Row: Name/Title and Action Buttons */}
          <div className="flex items-start justify-between pl-[256px]">
            {/* Name and Title */}
            <div className="flex flex-col gap-2 w-[512px]">
              <h1
                className="text-[44px] leading-[52px] font-bold"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', color: 'white' }}
              >
                {employee.preferredName} ({employee.firstName}) {employee.lastName}
              </h1>
              <p className="text-white text-[15px] leading-[22px]">
                {employee.pronouns} · {employee.title}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-[13px]">
              <button
                className="inline-flex items-center gap-2 h-10 px-5 bg-white border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)] text-[var(--color-primary-strong)] text-[15px] font-semibold transition-colors hover:bg-gray-50"
                style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
              >
                Request a Change
                <Icon name="caret-down" size={10} className="text-[var(--color-primary-strong)]" />
              </button>
              <button
                className="inline-flex items-center justify-center w-10 h-10 bg-white border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)] text-[var(--color-primary-strong)] transition-colors hover:bg-gray-50"
                style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
              >
                <Icon name="ellipsis" size={16} className="text-[var(--color-primary-strong)]" />
              </button>
            </div>
          </div>

          {/* Tabs - Filled style */}
          <div
            ref={tabContainerRef}
            className="pl-[256px] flex-1 min-w-0 relative"
          >
            <div className="flex items-center gap-1 whitespace-nowrap">
              {profileTabs.slice(0, visibleTabCount).map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center justify-center gap-3 px-4 py-4 rounded-t-[var(--radius-xx-small)] shrink-0
                      ${isActive
                        ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--color-primary-strong)] font-bold'
                        : 'text-white font-medium hover:bg-white/10'
                      }
                      text-[15px] leading-[22px] transition-colors
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}

              {/* More dropdown - always visible */}
              <div ref={moreButtonRef} className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className={`
                    flex items-center justify-center gap-3 px-4 py-4 rounded-t-[var(--radius-xx-small)] shrink-0
                    text-white font-medium hover:bg-white/10
                    text-[15px] leading-[22px] transition-colors
                  `}
                >
                  {MORE_TAB.label}
                  <Icon name="caret-down" size={10} className="text-current" />
                </button>

                {/* Dropdown menu */}
                {showMoreDropdown && visibleTabCount < profileTabs.length && (
                  <div
                    className="absolute top-full left-0 mt-1 rounded-[var(--radius-small)] shadow-lg py-1 z-[9999] min-w-[160px] max-h-[400px] overflow-y-auto flex flex-col"
                    style={{
                      backgroundColor: 'var(--surface-neutral-white)',
                      border: '1px solid var(--border-neutral-weak)'
                    }}
                  >
                    {profileTabs.slice(visibleTabCount).map((tab) => {
                      const isActive = tab.id === activeTab;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setShowMoreDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[15px] transition-colors"
                          style={{
                            backgroundColor: isActive ? 'var(--surface-neutral-xx-weak)' : 'transparent',
                            color: isActive ? 'var(--color-primary-strong)' : 'var(--text-neutral-strong)',
                            fontWeight: isActive ? 'bold' : 'normal'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'var(--surface-neutral-xx-weak)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Avatar - positioned absolutely with z-10 to appear above tabs */}
        <img
          src={employee.avatar}
          alt={`${employee.preferredName} ${employee.lastName}`}
          className="absolute left-6 top-6 w-[224px] h-[224px] rounded-[var(--radius-large)] object-cover z-10"
          style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)', marginTop: '8px' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8 p-10 pt-8">
        {/* Left Sidebar - Vitals */}
        <aside className="w-[200px] shrink-0">
          {/* Vitals Section */}
          <div className="mb-8 pt-2">
            <h3 className="text-[13px] font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-4">
              Vitals
            </h3>
            <div className="flex flex-col gap-2">
              <VitalItem icon="building" text={employee.workPhone} />
              <VitalItem icon="mobile" text={employee.mobilePhone} />
              <VitalItem icon="envelope" text={employee.workEmail} />
              <VitalItem icon="linkedin" text={employee.linkedIn} />
              <VitalItem icon="clock" text={employee.localTime} />
              <div className="flex items-center gap-2 text-[13px] text-[var(--text-neutral-medium)] pl-5">
                {employee.location}
              </div>
              <VitalItem icon="wrench" text={employee.department} />
              <div className="flex items-center gap-2 text-[13px] text-[var(--text-neutral-medium)] pl-5">
                Full-time
              </div>
            </div>
          </div>

          {/* Hire Date Section */}
          <div className="mb-8">
            <h3 className="text-[13px] font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-4">
              Hire Date
            </h3>
            <div className="flex flex-col gap-1">
              <VitalItem icon="calendar" text={employee.hireDate} />
              <div className="text-[13px] text-[var(--text-neutral-weak)] pl-5">
                {employee.tenure}
              </div>
            </div>
          </div>

          {/* Manager Section */}
          <div className="mb-8">
            <h3 className="text-[13px] font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-4">
              Manager
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={employee.manager.avatar}
                alt={employee.manager.name}
                className="w-10 h-10 rounded-[var(--radius-xx-small)] object-cover"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              <div>
                <p className="text-[13px] font-medium text-[var(--text-neutral-strong)]">
                  {employee.manager.name}
                </p>
                <p className="text-[13px] text-[var(--text-neutral-medium)]">
                  {employee.manager.title}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Reports Section */}
          <div>
            <h3 className="text-[13px] font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-4">
              Direct Reports
            </h3>
            <div className="flex flex-col gap-2">
              {employee.directReports.map((name) => (
                <VitalItem key={name} icon="circle-user" text={name} />
              ))}
              {employee.moreReportsCount > 0 && (
                <VitalItem icon="circle-user" text={`${employee.moreReportsCount} more...`} />
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Conditional rendering based on active tab */}
          {activeTab === 'performance' ? (
            <PerformanceTabContent employeeName={employee.preferredName} />
          ) : activeTab === 'job' ? (
            <JobTabContent employeeName={employee.preferredName} />
          ) : (
            <>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="address-card" size={24} className="text-[var(--color-primary-strong)]" />
                  <h2
                    className="text-[26px] font-semibold text-[var(--color-primary-strong)]"
                    style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
                  >
                    Personal
                  </h2>
                </div>
                <Button variant="text" icon="grid-2-plus" iconPosition="left" showCaret={true}>
                  Customize Layout
                </Button>
              </div>

          {/* Basic Information Card */}
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
                <Icon name="address-card" size={16} className="text-[var(--color-primary-strong)]" />
              </div>
              <h3
                className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                Basic Information
              </h3>
            </div>

            {/* Name Row - 4 columns */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <TextInput label="Name" value={employee.firstName} />
              <TextInput label="Middle Name" value={employee.middleName} placeholder="" />
              <TextInput label="Last Name" value={employee.lastName} />
              <TextInput label="Preferred Name" value={employee.preferredName} />
            </div>

            {/* Birth Date */}
            <div className="mb-6 max-w-[200px]">
              <TextInput label="Birth Date" value={employee.birthDate} type="date" />
            </div>

            {/* SSN */}
            <div className="mb-6 max-w-[200px]">
              <TextInput label="SSN" value={employee.ssn} />
            </div>

            {/* Gender Row - 3 columns */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <TextInput label="Gender" value={employee.gender} type="dropdown" />
              <TextInput label="Gender Identity" value={employee.genderIdentity} type="dropdown" />
              <TextInput label="Pronouns" value={employee.pronouns} type="dropdown" />
            </div>

            {/* Marital Status */}
            <div className="max-w-[200px]">
              <TextInput label="Marital Status" value={employee.maritalStatus} type="dropdown" />
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
                <Icon name="phone" size={16} className="text-[var(--color-primary-strong)]" />
              </div>
              <h3
                className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                Contact
              </h3>
            </div>

            {/* Home Phone */}
            <div className="mb-6 max-w-[224px]">
              <TextInput
                label="Home Phone"
                value="648-555-2415"
                icon="phone"
              />
            </div>

            {/* Work Phone */}
            <div className="mb-6 max-w-[224px]">
              <TextInput
                label="Work Phone"
                value={employee.workPhone}
                icon="building"
              />
            </div>

            {/* Mobile Phone */}
            <div className="mb-6 max-w-[224px]">
              <TextInput
                label="Mobile Phone"
                value={employee.mobilePhone}
                icon="mobile"
              />
            </div>

            {/* Home Email */}
            <div className="mb-6 max-w-[288px]">
              <TextInput
                label="Home Email"
                value={employee.personalEmail}
                icon="envelope"
              />
            </div>

            {/* Work Email */}
            <div className="mb-6 max-w-[288px]">
              <TextInput
                label="Work Email"
                value={employee.workEmail}
                icon="envelope"
              />
            </div>

            {/* T-shirt Size */}
            <div className="mb-6 max-w-[224px]">
              <TextInput
                label="T-shirt Size"
                value={employee.tshirtSize}
                type="dropdown"
              />
            </div>

            {/* Favorite Cold Cereal */}
            <div className="max-w-[224px]">
              <TextInput
                label="Favorite Cold Cereal"
                value={employee.favoriteCereal}
                type="dropdown"
              />
            </div>
          </div>

          {/* Visa Information Section */}
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-6">
              {/* Icon container */}
              <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
                <Icon name="passport" size={16} className="text-[var(--color-primary-strong)]" />
              </div>

              {/* Title and Button */}
              <div className="flex items-center justify-between flex-1">
                <h3
                  className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
                >
                  Visa Information
                </h3>
                <Button variant="outlined" size="small">
                  Add Entry
                </Button>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface-neutral-x-weak)]">
                    <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                      Passport Number
                    </th>
                    <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                      Issued Date
                    </th>
                    <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                      Expiry Date
                    </th>
                    <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                      Issuing Country
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
                  {employee.passports.map((passport, index) => (
                    <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                      <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                        {passport.number}
                      </td>
                      <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                        {passport.issued}
                      </td>
                      <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                        {passport.expiry}
                      </td>
                      <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                        {passport.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}
        </main>
      </div>

      {/* Hidden measurement container for tab widths */}
      <div
        ref={measurementTabsRef}
        className="fixed invisible pointer-events-none flex items-center gap-1"
        aria-hidden="true"
      >
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            className="flex items-center justify-center gap-3 px-4 py-4 rounded-[var(--radius-small)] shrink-0 text-white font-medium text-[15px] leading-[22px]"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper component for vital items
function VitalItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon as any} size={12} className="text-[var(--icon-neutral-strong)]" />
      <span className="text-[13px] text-[var(--text-neutral-medium)]">{text}</span>
    </div>
  );
}

export default MyInfo;
