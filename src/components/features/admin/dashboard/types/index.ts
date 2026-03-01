export type DashboardNavigationType = {
  name: string;
  href: string;
  icon?: React.ReactElement | string;
  children?: DashboardNavigationType[];
};

export type DashboardNavGroupType = {
  groupLabel?: string; // e.g. "SYSTEM", "USERS & WORKSPACES" — omit for no label
  items: DashboardNavigationType[];
};
