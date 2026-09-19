export interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'segmented';
}

export interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}
