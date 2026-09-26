import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function LoadingSpinner({ label = 'Loading your profile...' }) {
  return <View className="flex-1 items-center justify-center bg-canvas gap-3"><ActivityIndicator color={colors.primary} size="large" /><Text className="text-sm text-muted">{label}</Text></View>;
}

