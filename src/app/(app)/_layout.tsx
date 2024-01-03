import { BottomTabBar } from "~/components/BottomTabBar";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router";
import { useAppState } from "~/hooks/useAppState";
import { SafeAreaView } from "react-native";
import { useSession } from "~/hooks/useSession";

function ApplicationLayout() {
  const { state } = useAppState();
  const session = useSession();

  console.log(JSON.stringify(session, null, 2));

  if (!state.isAuthenticated) {
    return <Redirect href={"/auth/login"} />
  }

  return (
    <Tabs tabBar={(props) => <BottomTabBar {...props} />}>
        <Tabs.Screen name="links" options={{ tabBarLabel: "links." }} />
    </Tabs>
  );
}

export default ApplicationLayout;
