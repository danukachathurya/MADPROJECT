import { GraduationCap, MapPin, Pencil } from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';

function initials(name = '') { return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'ST'; }

export default function ProfileCard({ profile, onPress }) {
  return <Pressable onPress={onPress} className="rounded-lg border border-slate-200 bg-white p-4 active:opacity-80"><View className="flex-row items-center"><View className="h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-indigo-100">{profile.profileImage ? <Image source={{ uri: profile.profileImage }} className="h-14 w-14" /> : <Text className="text-lg font-bold text-brand">{initials(profile.fullName)}</Text>}</View><View className="ml-3 flex-1"><Text className="text-base font-semibold text-ink">{profile.fullName}</Text><Text className="mt-0.5 text-sm text-muted">{profile.degree || 'Student'}{profile.department ? ` · ${profile.department}` : ''}</Text></View><Pencil size={18} color="#4F46E5" /></View><View className="mt-4 gap-2 border-t border-slate-100 pt-3"><View className="flex-row items-center gap-2"><GraduationCap size={16} color="#64748B" /><Text className="flex-1 text-sm text-muted" numberOfLines={1}>{profile.school}</Text></View>{profile.city ? <View className="flex-row items-center gap-2"><MapPin size={16} color="#64748B" /><Text className="text-sm text-muted">{profile.city}{profile.country ? `, ${profile.country}` : ''}</Text></View> : null}</View></Pressable>;
}
