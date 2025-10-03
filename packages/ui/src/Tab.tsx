import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface TabContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

function TabList({ children, className }: TabListProps) {
  return (
    <TabsPrimitive.List className={className}>{children}</TabsPrimitive.List>
  );
}

function TabTrigger({ children, value, className }: TabTriggerProps) {
  return (
    <TabsPrimitive.Trigger value={value} className={className}>
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabContent({ children, value, className }: TabContentProps) {
  return (
    <TabsPrimitive.Content value={value} className={className}>
      {children}
    </TabsPrimitive.Content>
  );
}

export { TabList, TabTrigger, TabContent };
