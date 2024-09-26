"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconGrid from "@/components/icon-grid";
import IconModal from "@/components/icon-modal";

import {
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

const AllIcons = {
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,

  // Foundation,
  // MaterialIcons,
  // MaterialCommunityIcons,
  // SimpleLineIcons,
  // Zocial,
};

const iconSets = AllIcons;

// console.log(EvilIcons.glyphMap);

const iconItems = Object.entries(AllIcons)
  .map(([iconName, IconSet]) => {
    // <IconSet name={name} />
    return Object.keys(IconSet.glyphMap).map((name) => ({
      name,
      Icon: () => <IconSet name={name} size={24} />,
      setName: iconName,
    }));
  })
  .flat();

// console.log(iconItems);

function NoSSR({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? children : null;
}

export default function IconExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const searchQuery = searchTerm.toLowerCase();
  const filteredIcons = Object.entries(iconSets)
    .filter(([setName]) => selectedSet === "all" || setName === selectedSet)
    .flatMap(([setName, Icons]) =>
      Object.entries(Icons.glyphMap)
        .filter(([name]) =>
          name.toLowerCase().includes(searchQuery)
        )
        .map(([name, Icon]) => ({ name, Icon: () => <Icons name={name} size={24} />, setName }))
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Icon Explorer</h1>
      <div className="flex gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedSet} onValueChange={setSelectedSet}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select icon set" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sets</SelectItem>
            {Object.keys(iconSets).map((setName) => (
              <SelectItem key={setName} value={setName}>
                {setName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <NoSSR>
      <IconGrid
        icons={filteredIcons}
        // icons={[...filteredIcons.slice(0, 10)]}
        onIconClick={setSelectedIcon}
      />
      </NoSSR>
      {selectedIcon && (
        <IconModal icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
      )}
    </div>
  );
}
