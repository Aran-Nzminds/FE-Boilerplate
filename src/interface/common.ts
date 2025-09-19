type StorageType = "local" | "session" | "cookie";

interface ICardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface IDropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    type?: "checkbox" | "radio" | "default" | "separator";
    checked?: boolean;
  }[];
}

interface IUseStorageOptions {
  expires?: number; // for cookies (in days)
}

interface IUseDebounceOptions {
  delay?: number;
  immediate?: boolean;
}

export { ICardItem, IDropdownProps, IUseDebounceOptions, IUseStorageOptions, StorageType };
