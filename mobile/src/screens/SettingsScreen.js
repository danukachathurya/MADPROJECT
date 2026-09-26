import { Alert, ScrollView, Text, View } from 'react-native';
import { LogOut, ShieldCheck } from 'lucide-react-native';
import CustomButton from '../components/CustomButton';
import useAuth from '../hooks/useAuth';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  return <ScrollView className="flex-1 bg-canvas" contentContainerClassName="px-5 pb-10 pt-14"><Text className="text-3xl font-bold text-ink">Settings</Text><Text className="mt-2 text-base text-muted">Your account and session preferences.</Text><View className="mt-8 rounded-lg border border-slate-200 bg-white p-5"><View className="flex-row items-center gap-3"><View className="rounded-full bg-green-50 p-3"><ShieldCheck color="#16A34A" size={23} /></View><View className="flex-1"><Text className="font-semibold text-ink">Signed in as {user.firstName}</Text><Text className="mt-1 text-sm text-muted">{user.email}</Text></View></View></View><View className="mt-8"><CustomButton title="Log out" variant="outline" icon={LogOut} onPress={() => Alert.alert('Log out?', 'You will need your email and password to sign back in.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Log out', style: 'destructive', onPress: logout }])} /></View></ScrollView>;
}
