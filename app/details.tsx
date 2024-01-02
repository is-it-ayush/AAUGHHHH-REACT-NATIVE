import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Details() {
  const { name } = useLocalSearchParams();
  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text className={styles.subtitle}>Showing details for user {name}.</Text>
      </View>
    </View>
  );
}

const styles = {
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960]',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
