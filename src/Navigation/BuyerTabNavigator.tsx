// src/Navigation/BuyerTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { BuyerTabParamList, Routes } from '../Types/Navigation';
import { BuyerAddListing } from '../components/Buyer/Home/BuyerAddListing/BuyerAddListing';
import { BuyerMessages } from '../components/Buyer/Home/BuyerMessages/BuyerMessages';
import { BuyerSaved } from '../components/Buyer/Home/BuyerSaved/BuyerSaved';
import { BuyerProfile } from '../components/Buyer/Home/BuyerProfile/BuyerProfile';
import { BuyerHome } from '../components/Buyer/Home/BuyerHome/BuyerHome';
import { CommonImage, CommonTabIcon } from '../components/Common';
import { Logos, Scale, Colors, Strings } from '../components/Constants';
import { usePostListingModal } from '../contexts/PostListingModalContext';

const Tab = createBottomTabNavigator<BuyerTabParamList>();

export const BuyerTabNavigator: React.FC = () => {
  // Use context provided by BuyerStackNavigator
  const { openModal } = usePostListingModal();

  return (
    <Tab.Navigator
      initialRouteName={Routes.BUYER_HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={Routes.BUYER_HOME}
        component={BuyerHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTabIcon
              activeIcon={Logos.HOME_ICON_ACTIVE}
              inactiveIcon={Logos.HOME_ICON_INACTIVE}
              label={Strings.TABS.HOME}
              isActive={focused}
              activeColor={Colors.TAB_ACTIVE}
              inactiveColor={Colors.GRAY_500}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BUYER_MESSAGES}
        component={BuyerMessages}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTabIcon
              activeIcon={Logos.MESSAGE_ICON_ACTIVE}
              inactiveIcon={Logos.MESSAGE_ICON_INACTIVE}
              label={Strings.TABS.MESSAGES}
              isActive={focused}
              activeColor={Colors.TAB_ACTIVE}
              inactiveColor={Colors.GRAY_500}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BUYER_ADD_LISTING}
        component={BuyerAddListing}
        listeners={{
          tabPress: (e) => {
            // Prevent default navigation
            e.preventDefault();
            // Open modal instead
            openModal();
          },
        }}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButtonContainer}>
              <View style={styles.addButton}>
                <CommonImage
                  source={Logos.ADD_ICON}
                  width={Scale.SCALE_28}
                  height={Scale.SCALE_28}
                  resizeMode="contain"
                  tintColor={Colors.WHITE}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BUYER_SAVED}
        component={BuyerSaved}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTabIcon
              activeIcon={Logos.SAVED_ICON_ACTIVE}
              inactiveIcon={Logos.SAVED_ICON_INACTIVE}
              label={Strings.TABS.SAVED}
              isActive={focused}
              activeColor={Colors.TAB_ACTIVE}
              inactiveColor={Colors.GRAY_500}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BUYER_PROFILE}
        component={BuyerProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTabIcon
              activeIcon={Logos.PROFILE_ICON_ACTIVE}
              inactiveIcon={Logos.PROFILE_ICON_INACTIVE}
              label={Strings.TABS.PROFILE}
              isActive={focused}
              activeColor={Colors.TAB_ACTIVE}
              inactiveColor={Colors.GRAY_500}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: Scale.SCALE_70,
    paddingTop: Scale.SCALE_16,
    marginBottom: Scale.SCALE_6,
    backgroundColor: Colors.WHITE,
  },
  addButtonContainer: {
    width: Scale.SCALE_72,
    height: Scale.SCALE_48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: Scale.SCALE_44,
    height: Scale.SCALE_44,
    borderRadius: Scale.SCALE_28,
    backgroundColor: Colors.TERTIARY_500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});