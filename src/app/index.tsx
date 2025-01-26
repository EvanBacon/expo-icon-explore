import IconGrid from "@/components/icon-grid";
import IconModal from "@/components/icon-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";

import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const AllIcons = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

const iconSets = AllIcons;

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else {
    return num.toString();
  }
}

const numberOfIcons = formatNumber(
  Object.values(AllIcons)
    .map((IconSet) => Object.keys(IconSet.getRawGlyphMap()))
    .flat().length
);

export default function IconExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const searchQuery = searchTerm.toLowerCase();
  const filteredIcons = Object.entries(iconSets)
    .filter(([setName]) => selectedSet === "all" || setName === selectedSet)
    .flatMap(([setName, Icons]) =>
      Object.entries(Icons.getRawGlyphMap())
        .filter(([name]) => name.toLowerCase().includes(searchQuery))
        .map(([name]) => ({
          name,
          Icon: ({ className, ...props }) => (
            <Icons
              name={name}
              size={24}
              className={cn(
                className,
                // adjust for light/dark mode
                "text-center dark:text-white"
              )}
              {...props}
            />
          ),
          setName,
        }))
    );

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            src="/expo.svg"
            alt="Expo Logo"
            className="h-8 w-8 mr-3 dark:filter dark:invert"
          />
          <div>
            <h1 className="text-2xl font-bold">Icon Explorer</h1>
            <p className="text-sm text-muted-foreground">
              {`@expo/vector-icons@${
                require("@expo/vector-icons/package.json").version
              }`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://docs.expo.dev/guides/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Expo Docs
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                  document.documentElement.classList.add("light");
                }}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  document.documentElement.classList.remove("light");
                  document.documentElement.classList.add("dark");
                }}
              >
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="search"
            ref={searchInputRef}
            placeholder={`Search ${numberOfIcons} icons`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-16 text-base"
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

      <IconGrid icons={filteredIcons} onIconClick={setSelectedIcon} />

      {selectedIcon && (
        <IconModal icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
      )}
    </div>
  );
}
