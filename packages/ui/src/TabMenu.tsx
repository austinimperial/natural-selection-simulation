import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { TabContent, TabList, TabTrigger } from './Tab';

interface TabMenuProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function TabMenu({
  children,
  defaultValue,
  value,
  onValueChange,
}: TabMenuProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

TabMenu.List = TabList;
TabMenu.Trigger = TabTrigger;
TabMenu.Content = TabContent;

export default TabMenu;
