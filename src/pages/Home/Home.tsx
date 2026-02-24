import { Avatar, Button, TextHeadline, Gridlet, Timesheet } from '../../components';
import avatarLarge from '../../assets/images/avatar-large.png';

// Mock user data
const user = {
  name: 'Jess',
  title: 'Director, Demand Generation',
  department: 'Marketing',
  avatar: avatarLarge,
};


export function Home() {
  return (
    <div className="p-10">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-8">
          <Avatar src={user.avatar} size="large" />
          <div className="flex flex-col">
            <TextHeadline size="x-large" color="primary">
              {`Hi, ${user.name}`}
            </TextHeadline>
            <p
              className="font-medium text-[15px] leading-[22px] text-[var(--text-neutral-medium)]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {user.title} in {user.department}
            </p>
          </div>
        </div>
        <Button icon="pen-to-square" variant="standard">
          Edit
        </Button>
      </div>

      {/* Gridlet Dashboard */}
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))',
          gridTemplateRows: 'auto',
        }}
      >
        {/* Row 1 */}
        <Timesheet />
        <Gridlet
          title="What's happening at BambooHR"
          className="col-span-2 row-span-2"
          minHeight={684}
        />

        {/* Row 2 */}
        <Gridlet title="Time off" minHeight={350} />

        {/* Row 3 */}
        <Gridlet title="Welcome to BambooHR" minHeight={332} />
        <Gridlet title="Celebrations" minHeight={332} />
        <Gridlet title="Who's out" minHeight={332} />

        {/* Row 4 */}
        <Gridlet title="Starting soon" minHeight={332} />
        <Gridlet title="Company links" minHeight={332} />
        <Gridlet title="Gender breakdown" minHeight={332} />
      </div>
    </div>
  );
}

export default Home;
