import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface IconModalProps {
  icon: { name: string; Icon: React.ComponentType<any>; setName: string };
  onClose: () => void;
}

export default function IconModal({ icon, onClose }: IconModalProps) {
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState( document.documentElement.classList.contains("dark") ? "#ffffff" : "#000000");

  const codeString = `import ${icon.setName} from '@expo/vector-icons/${icon.setName}'

<${icon.setName} name="${icon.name}" size={12} color="${color}" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{icon.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row justify-around items-center my-4">
          <icon.Icon size={72} color={color} />
          <HexColorPicker color={color} onChange={setColor} className="mt-4" />
        </div>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>{codeString}</code>
        </pre>
        <Button onClick={copyToClipboard} className="mt-4">
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
