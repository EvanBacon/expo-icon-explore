"use client";

import { useEffect, useRef, useState } from "react";
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
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Octicons,
  Zocial,
} from "@expo/vector-icons";

const AllIcons = {
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Octicons,
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Zocial,
};

const iconSets = AllIcons;

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else {
    return num.toString();
  }
}

const numberOfIcons = formatNumber(Object.values(AllIcons)
  .map((IconSet) => Object.keys(IconSet.getRawGlyphMap()))
  .flat()
  .length);


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
      Object.entries(Icons.getRawGlyphMap())
        .filter(([name]) =>
          name.toLowerCase().includes(searchQuery)
        )
        .map(([name, Icon]) => ({ name, Icon: (props) => <Icons name={name} size={24} {...props} />, setName }))
    );

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src="/expo.svg" alt="Expo Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">Icon Explorer</h1>
        </div>
        <a href="https://docs.expo.dev/guides/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Expo Docs
        </a>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="search"
            ref={searchInputRef}
            placeholder={`Search ${numberOfIcons} icons`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>
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
