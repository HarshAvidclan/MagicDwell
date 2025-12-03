// src/Navigation/BuyerTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { BuyerTabParamList, Routes } from '../Types/Navigation';
import { BuyerAddListing } from '../components/Buyer/BuyerAddListing/BuyerAddListing';
import { BuyerHome } from '../components/Buyer/BuyerHome/BuyerHome';
import { BuyerMessages } from '../components/Buyer/BuyerMessages/BuyerMessages';
import { BuyerSaved } from '../components/Buyer/BuyerSaved/BuyerSaved';
import { BuyerProfile } from '../components/Buyer/BuyerProfile/BuyerProfile';
import { CommonImage, CommonText } from '../components/Common';
import { Logos, Scale, Colors, Strings } from '../components/Constants';

const Tab = createBottomTabNavigator<BuyerTabParamList>();

export const BuyerTabNavigator: React.FC = () => {
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
            <View style={styles.tabItem}>
              <CommonImage
                source={
                  focused ? Logos.HOME_ICON_ACTIVE : Logos.HOME_ICON_INACTIVE
                }
                width={Scale.SCALE_28}
                height={Scale.SCALE_28}
                resizeMode="cover"
              />
              <CommonText
                size={Scale.SCALE_12}
                color={focused ? Colors.TEXT_PRIMARY : Colors.TEXT_SECONDARY}
              >
                {Strings.TABS.HOME}
              </CommonText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BUYER_MESSAGES}
        component={BuyerMessages}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <CommonImage
                source={
                  focused
                    ? Logos.MESSAGE_ICON_ACTIVE
                    : Logos.MESSAGE_ICON_INACTIVE
                }
                width={Scale.SCALE_28}
                height={Scale.SCALE_28}
                resizeMode="cover"
              />
              <CommonText
                size={Scale.SCALE_12}
                color={focused ? Colors.TEXT_PRIMARY : Colors.TEXT_SECONDARY}
              >
                {Strings.TABS.MESSAGES}
              </CommonText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BUYER_ADD_LISTING}
        component={BuyerAddListing}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <CommonImage
                source={Logos.ADD_LISTING_ICON}
                width={Scale.SCALE_48}
                height={Scale.SCALE_48}
                resizeMode="cover"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BUYER_SAVED}
        component={BuyerSaved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <CommonImage
                source={
                  focused ? Logos.SAVED_ICON_ACTIVE : Logos.SAVED_ICON_INACTIVE
                }
                width={Scale.SCALE_28}
                height={Scale.SCALE_28}
                resizeMode="cover"
              />
              <CommonText
                size={Scale.SCALE_12}
                color={focused ? Colors.TEXT_PRIMARY : Colors.TEXT_SECONDARY}
              >
                {Strings.TABS.SAVED}
              </CommonText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BUYER_PROFILE}
        component={BuyerProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <CommonImage
                source={
                  focused
                    ? Logos.PROFILE_ICON_ACTIVE
                    : Logos.PROFILE_ICON_INACTIVE
                }
                width={Scale.SCALE_28}
                height={Scale.SCALE_28}
                resizeMode="cover"
              />
              <CommonText
                size={Scale.SCALE_12}
                color={focused ? Colors.TEXT_PRIMARY : Colors.TEXT_SECONDARY}
              >
                {Strings.TABS.PROFILE}
              </CommonText>
            </View>
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
    paddingBottom: Scale.SCALE_8,
    backgroundColor: Colors.PRIMARY_100,
    borderTopLeftRadius: Scale.SCALE_16,
    borderTopRightRadius: Scale.SCALE_16,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: Scale.SCALE_0, height: -Scale.SCALE_4 },
    shadowOpacity: 0.08,
    shadowRadius: Scale.SCALE_12,
    elevation: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Scale.SCALE_72,
  },
  addButton: {
    width: Scale.SCALE_72,
    height: Scale.SCALE_48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});