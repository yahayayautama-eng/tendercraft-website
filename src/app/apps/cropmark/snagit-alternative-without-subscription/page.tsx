import { WindowsComparison, comparisonMetadata } from '@/components/WindowsComparison';
import { windowsComparisons } from '@/lib/windows-comparisons';
const comparison = windowsComparisons[1];
export const metadata = comparisonMetadata(comparison);
export default function Page() { return <WindowsComparison comparison={comparison} />; }
