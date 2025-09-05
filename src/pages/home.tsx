// src/pages/Home.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Briefcase, Users, BarChart3, Settings } from 'lucide-react';

type CardItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const cardItems: CardItem[] = [
  {
    title: 'Projects',
    description:
      'Manage and track your ongoing projects efficiently. Manage and track your ongoing projects efficiently. Manage and track your ongoing projects efficiently.',
    icon: <Briefcase className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Users',
    description:
      'View, invite, and assign roles to your team members., View, invite, and assign roles to your team members. View, invite, and assign roles to your team members.',
    icon: <Users className="h-6 w-6 text-green-500" />,
  },
  {
    title: 'Reports',
    description:
      'Generate insights and performance reports easily.Generate insights and performance reports easily. Generate insights and performance reports easily.',
    icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
  },
  {
    title: 'Settings',
    description:
      'Configure preferences and security options.Configure preferences and security options. Configure preferences and security options.',
    icon: <Settings className="h-6 w-6 text-orange-500" />,
  },
];

export default function Home() {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {cardItems.map((item, index) => (
        <Card
          key={index}
          className="shadow-md hover:shadow-xl transition-transform hover:scale-105 rounded-2xl border border-gray-100"
        >
          <CardHeader className="flex flex-row justify-center items-center gap-3">
            <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
            <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
