import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ScanBoardScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText type="title">Scan Board</ThemedText>
      <ThemedText className="mt-4 text-center">
        This is where the chess board scanning functionality will be implemented.
      </ThemedText>
    </ThemedView>
  );
}
