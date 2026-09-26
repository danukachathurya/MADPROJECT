import { FilePlus2 } from 'lucide-react-native';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';

export default function EmptyState({ onCreate }) {
  return <View className="items-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10"><View className="mb-4 rounded-full bg-indigo-50 p-4"><FilePlus2 size={30} color="#4F46E5" /></View><Text className="text-lg font-semibold text-ink">Build your profile</Text><Text className="mt-2 text-center text-sm leading-5 text-muted">Add your academic details and the essentials that help your campus profile feel complete.</Text><View className="mt-6 w-full"><CustomButton title="Create profile" onPress={onCreate} /></View></View>;
}

