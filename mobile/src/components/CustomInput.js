import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function CustomInput({ control, name, label, placeholder, secureTextEntry, multiline, keyboardType = 'default', autoCapitalize = 'sentences' }) {
  const [hidden, setHidden] = useState(secureTextEntry);
  return <Controller control={control} name={name} render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-ink">{label}</Text>
      <View className={`flex-row items-center rounded-lg border bg-white px-3 ${error ? 'border-red-500' : 'border-slate-200'} ${multiline ? 'min-h-28 items-start pt-3' : 'h-12'}`}>
        <TextInput value={value ?? ''} onChangeText={onChange} onBlur={onBlur} placeholder={placeholder} placeholderTextColor="#94A3B8" secureTextEntry={hidden} multiline={multiline} keyboardType={keyboardType} autoCapitalize={autoCapitalize} className="flex-1 text-base text-ink" textAlignVertical={multiline ? 'top' : 'center'} />
        {secureTextEntry && <Pressable onPress={() => setHidden(!hidden)} hitSlop={10}>{hidden ? <Eye size={19} color="#64748B" /> : <EyeOff size={19} color="#64748B" />}</Pressable>}
      </View>
      {error && <Text className="mt-1.5 text-xs text-red-600">{error.message}</Text>}
    </View>
  )} />;
}

