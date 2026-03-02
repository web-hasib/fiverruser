export type DashboardNavigationType = {
  name: string;
  href: string;
  icon?: React.ElementType | React.ReactElement | string;
  children?: DashboardNavigationType[];
  className?: string;
};

export type DashboardNavGroupType = {
  groupLabel?: string; // e.g. "SYSTEM", "USERS & WORKSPACES" — omit for no label
  items: DashboardNavigationType[];
};
