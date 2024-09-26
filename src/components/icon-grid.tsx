import IconCard from "./icon-card";

interface IconGridProps {
  icons: Array<{
    name: string;
    Icon: React.ComponentType<any>;
    setName: string;
  }>;
  onIconClick: (icon: {
    name: string;
    Icon: React.ComponentType<any>;
    setName: string;
  }) => void;
}

export default function IconGrid({ icons, onIconClick }: IconGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {icons.map((icon) => (
        <IconCard
          key={`${icon.setName}-${icon.name}`}
          icon={icon}
          onClick={() => onIconClick(icon)}
        />
      ))}
    </div>
  );
}
