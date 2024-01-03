import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { View, Text, TouchableOpacity } from "react-native";

export const BottomTabBar = (props: BottomTabBarProps) => {
  return (
    <View className="flex-1">
      {props.state.routes.map((route, index) => {
        // state
        const isFocused = props.state.index === index;
        const routeDescription = props.descriptors[route.key];
        const label = routeDescription.options.title;

        if (!route.name) {
          console.log(`[Navigation] Skipping rendering ${route.key}-${route.path}`);
          return;
        }

        // handlers.
        function onRoutePress() {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name, route.params);
          }
        };
        function onRouteLongPress() {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={routeDescription.options.tabBarAccessibilityLabel}
            testID={routeDescription.options.tabBarTestID}
            onPress={onRoutePress}
            onLongPress={onRouteLongPress}
            className="flex-1"
          >
            <Text className="">
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
