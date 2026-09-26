import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookOpen, Eye, Pencil, Plus } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import useAuth from '../hooks/useAuth';
import { studentService } from '../services/studentService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ProfileCard from '../components/ProfileCard';
import CustomButton from '../components/CustomButton';

const completionFields = ['fullName', 'phoneNumber', 'birthday', 'gender', 'nationality', 'school', 'faculty', 'department', 'degree', 'studentId', 'academicYear', 'address', 'city', 'country', 'bio', 'skills', 'hobbies', 'careerInterests', 'linkedin', 'github'];
function completion(profile) { return Math.round((completionFields.filter((field) => Array.isArray(profile[field]) ? profile[field].length : Boolean(profile[field])).length / completionFields.length) * 100); }

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth(); const [profile, setProfile] = useState(null); const [loading, setLoading] = useState(true); const [refreshing, setRefreshing] = useState(false);
  const load = useCallback(async (refresh = false) => { refresh ? setRefreshing(true) : setLoading(true); try { const response = await studentService.mine(); setProfile(response.data); } catch (error) { if (!error.message.includes('not found')) Toast.show({ type: 'error', text1: 'Could not load profile', text2: error.message }); setProfile(null); } finally { setLoading(false); setRefreshing(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  if (loading && !refreshing) return <LoadingSpinner />;
  const percent = profile ? completion(profile) : 0;
  return <ScrollView className="flex-1 bg-canvas" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} />} contentContainerClassName="px-5 pb-10 pt-14"><Text className="text-sm font-medium text-brand">STUDENT SPACE</Text><Text className="mt-1 text-3xl font-bold text-ink">Welcome, {user.firstName}</Text><Text className="mt-2 text-base text-muted">Keep your academic story ready for the next opportunity.</Text>{profile ? <><View className="mt-7 rounded-lg bg-brand p-5"><View className="flex-row items-end justify-between"><View><Text className="text-sm font-medium text-indigo-100">PROFILE COMPLETION</Text><Text className="mt-1 text-3xl font-bold text-white">{percent}%</Text></View><BookOpen color="#C7D2FE" size={30} /></View><View className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-300"><View className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} /></View></View><View className="mt-6"><ProfileCard profile={profile} onPress={() => navigation.navigate('Profile')} /></View><View className="mt-6 flex-row gap-3"><View className="flex-1"><CustomButton title="View" onPress={() => navigation.navigate('Profile')} variant="outline" icon={Eye} /></View><View className="flex-1"><CustomButton title="Edit" onPress={() => navigation.navigate('StudentForm', { profile })} icon={Pencil} /></View></View></> : <View className="mt-8"><EmptyState onCreate={() => navigation.navigate('StudentForm')} /></View>}<View className="mt-8"><Text className="mb-3 text-base font-semibold text-ink">At a glance</Text><View className="flex-row gap-3"><View className="flex-1 rounded-lg border border-slate-200 bg-white p-4"><Text className="text-2xl font-bold text-brand">{profile ? percent : 0}%</Text><Text className="mt-1 text-xs text-muted">Profile ready</Text></View><View className="flex-1 rounded-lg border border-slate-200 bg-white p-4"><Text className="text-2xl font-bold text-ink">{profile?.skills?.length || 0}</Text><Text className="mt-1 text-xs text-muted">Skills listed</Text></View></View></View>{!profile && <View className="mt-5"><CustomButton title="Create profile" onPress={() => navigation.navigate('StudentForm')} icon={Plus} /></View>}</ScrollView>;
}
