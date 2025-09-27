import {
  Home,
  Building2,
  Warehouse,
  FileText,
  Mail,
  Star,
  ClipboardCheck,
  DollarSign,
  Database,
  Users,
} from "lucide-react";

const stats = {
  properties: [
    { title: "Lands", value: 0, icon: Warehouse },
    { title: "Flats", value: 0, icon: Building2 },
    { title: "Houses", value: 0, icon: Home },
    { title: "Drafts", value: 0, icon: FileText },
  ],
  engagement: [
    { title: "Messages", value: 0, icon: Mail },
    { title: "Inquiries", value: 0, icon: ClipboardCheck },
    { title: "Featured", value: 0, icon: Star },
  ],
  system: [
    { title: "Pending Approvals", value: 0, icon: ClipboardCheck },
    { title: "Total Value", value: "৳0", icon: DollarSign },
    { title: "Storage Usage", value: "0 GB", icon: Database },
    { title: "Active Admins", value: 1, icon: Users },
  ],
};

const Section = ({ title, items }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4 text-cyan-400">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {items.map(({ title, value, icon: Icon }, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
                     hover:shadow-cyan-500/40 transition group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{title}</h2>
            <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition" />
          </div>
          <p className="text-3xl font-bold mt-2 text-cyan-400">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const DashboardStats = () => {
  return (
    <div className="space-y-10">
      <Section title="Properties" items={stats.properties} />
      <Section title="Engagement" items={stats.engagement} />
      <Section title="System" items={stats.system} />
    </div>
  );
};

export default DashboardStats;
