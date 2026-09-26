import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '../constants/colors';

export default function CustomButton({ title, onPress, loading, disabled, variant = 'primary', icon: Icon }) {
  const isDanger = variant === 'danger';
  const outline = variant === 'outline';
  const className = outline ? 'border border-slate-200 bg-white' : isDanger ? 'bg-red-600' : 'bg-brand';
  const textClass = outline ? 'text-ink' : 'text-white';
  return (
    <Pressable disabled={loading || disabled} onPress={onPress} className={`h-12 flex-row items-center justify-center gap-2 rounded-lg px-4 ${className} ${(loading || disabled) ? 'opacity-50' : 'active:opacity-85'}`}>
      {loading ? <ActivityIndicator color={outline ? colors.primary : '#fff'} /> : <>{Icon && <Icon size={18} color={outline ? colors.text : '#fff'} />}<Text className={`font-semibold ${textClass}`}>{title}</Text></>}
    </Pressable>
  );
}

