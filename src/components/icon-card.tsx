import { Card, CardContent } from "@/components/ui/card";

interface IconCardProps {
  icon: { name: string; Icon: React.ComponentType<any>; setName: string };
  onClick: () => void;
}

export default function IconCard({ icon, onClick }: IconCardProps) {
  return (
    <Card
      className="flex flex-col items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0 flex flex-col items-center gap-1">
        <icon.Icon className="w-8 h-8 mb-2" />
        <p className="text-sm text-center">{icon.name}</p>
        <p className="text-xs text-center text-muted-foreground">
          {icon.setName}
        </p>
      </CardContent>
    </Card>
  );
}
