import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";
interface SettingTypeProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}
const SettingItems = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingTypeProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row justify-between items-center py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text
          className={`text-lg font-rubik-medium text-black-300${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Error while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingItems title="My Boooking" icon={icons.calendar} />
          <SettingItems title="Payments" icon={icons.wallet} />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5">
          {settings.slice(2).map((setting, index) => (
            <SettingItems key={index} {...setting} />
          ))}
        </View>
        <View className="flex flex-col pt-5 border-t mt-5">
          <SettingItems
            title="Logout"
            icon={icons.logout}
            textStyle=" text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
