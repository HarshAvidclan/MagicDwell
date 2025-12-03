// src/Screens/Buyer/BuyerHome/BuyerHome.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { BuyerHomeScreenNavigationProp } from '../../../Types/Navigation';
import { CommonText } from '../../Common';
import { Images, Strings, Logos, Scale, Colors } from '../../Constants';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { CategoryTab } from '../CategoryTab/CategoryTab';
import { LocationHeader } from '../LocationHeader/LocationHeader';
import { PropertyCard } from '../PropertyCard/PropertyCard';
import { ToolCard } from '../ToolCard/ToolCard';
import { SearchBar } from '../SearchBar/SearchBar';
import ToastService from '../../../Services/Toast/ToastService';

export const BuyerHome: React.FC = () => {
  const navigation = useNavigation<BuyerHomeScreenNavigationProp>();
  const handleSearchPress = () => {
    // Navigate to search screen or open search modal
    ToastService.SUCCESS('Search pressed');
  };
  const categories = [
    { image: Images.CATEGORY_APARTMENTS, label: Strings.CATEGORIES.APARTMENTS },
    {
      image: Images.CATEGORY_BUILDER_FLOORS,
      label: Strings.CATEGORIES.BUILDER_FLOORS,
    },
    { image: Images.CATEGORY_PLOTS, label: Strings.CATEGORIES.PLOTS_LAND },
    { image: Images.CATEGORY_VILLAS, label: Strings.CATEGORIES.VILLAS },
    { image: Images.CATEGORY_COLIVING, label: Strings.CATEGORIES.CO_LIVING },
  ];

  const properties = [
    {
      id: '1',
      image: Images.PROPERTY_IMAGE_1,
      title: 'Aresta',
      location: 'S G Highway, Ahmedabad',
      bhk: '3 BHK',
      area: '1,760 sqft.',
      price: '₹85.50 L',
    },
    {
      id: '2',
      image: Images.PROPERTY_IMAGE_2,
      title: 'Palm Heights Apartments',
      location: 'Shilaj, Ahmedabad',
      bhk: '2-3 BHK',
      area: '900-1300 sqft.',
      price: '₹60 L - ₹1.2 Cr',
    },
    {
      id: '3',
      image: Images.PROPERTY_IMAGE_3,
      title: 'Aristo Anandam',
      location: 'S G Highway, Ahmedabad',
      bhk: '3 BHK',
      area: '1,200 sqft.',
      price: '₹1.43 Cr',
    },
    {
      id: '4',
      image: Images.PROPERTY_IMAGE_4,
      title: 'Green Valley Villas',
      location: 'Shantigram, Ahmedabad',
      bhk: '4 BHK',
      area: '1,650 sqft.',
      price: '₹1.27 Cr onwards',
    },
  ];

  const tools = [
    {
      icon: Logos.PRICING_INSIGHTS_ICON,
      label: Strings.TOOLS.PRICING_INSIGHTS,
    },
    { icon: Logos.EMI_CALCULATOR_ICON, label: Strings.TOOLS.EMI_CALCULATOR },
    {
      icon: Logos.RESEARCH_SNAPSHOT_ICON,
      label: Strings.TOOLS.RESEARCH_SNAPSHOT,
    },
    {
      icon: Logos.LOCALITY_INSIGHTS_ICON,
      label: Strings.TOOLS.LOCALITY_INSIGHTS,
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerBackground} />

        <LocationHeader
          locationText="Ahmedabad"
          onLocationPress={() => {}}
          onPostListingPress={() => navigation.navigate('BuyerAddListing')}
        />

        <ScrollView
          style={styles.categoryTabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabsContent}
        >
          <CategoryTab
            icon={Logos.RESIDENTIAL_ICON}
            label={Strings.CATEGORIES.RESIDENTIAL}
            isActive
          />
          <CategoryTab
            icon={Logos.COMMERCIAL_ICON}
            label={Strings.CATEGORIES.COMMERCIAL}
          />
          <CategoryTab icon={Logos.CARS_ICON} label={Strings.CATEGORIES.CARS} />
          <CategoryTab
            icon={Logos.TWO_WHEELER_ICON}
            label={Strings.CATEGORIES.TWO_WHEELER}
          />
        </ScrollView>
        <View style={styles.searchBarContainer}>
          <SearchBar onPress={handleSearchPress} />
        </View>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.section}>
            <CommonText size={Scale.SCALE_18}>
              {Strings.HOME.CATEGORIES}
            </CommonText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  label={category.label}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <CommonText size={Scale.SCALE_18}>
              {Strings.HOME.NEWLY_ADDED_PROPERTIES}
            </CommonText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  image={property.image}
                  title={property.title}
                  location={property.location}
                  bhk={property.bhk}
                  area={property.area}
                  price={property.price}
                  onPress={() => {}}
                  onFavouritePress={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.toolsSection}>
            <CommonText size={Scale.SCALE_18}>
              {Strings.HOME.TOOLS_INSIGHTS}
            </CommonText>
            <View style={styles.toolsGrid}>
              {tools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  label={tool.label}
                  onPress={() => {}}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  searchBarContainer: {
    marginTop: Scale.SCALE_16,
    paddingHorizontal: Scale.SCALE_16,
  },
  safeArea: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: Scale.SCALE_0,
    left: Scale.SCALE_0,
    right: Scale.SCALE_0,
    height: Scale.SCALE_246,
    backgroundColor: Colors.SECONDARY_100,
    borderBottomLeftRadius: Scale.SCALE_16,
    borderBottomRightRadius: Scale.SCALE_16,
  },
  categoryTabs: {
    marginTop: Scale.SCALE_20,
    maxHeight: Scale.SCALE_40,
    paddingHorizontal: Scale.SCALE_16,
  },
  categoryTabsContent: {
    gap: Scale.SCALE_8,
  },
  content: {
    flex: 1,
    marginTop: Scale.SCALE_16,
  },
  contentContainer: {
    paddingHorizontal: Scale.SCALE_16,
    paddingBottom: Scale.SCALE_20,
    gap: Scale.SCALE_20,
  },
  section: {
    gap: Scale.SCALE_12,
  },
  horizontalList: {
    gap: Scale.SCALE_16,
  },
  toolsSection: {
    backgroundColor: Colors.PRIMARY_100,
    borderRadius: Scale.SCALE_12,
    padding: Scale.SCALE_16,
    gap: Scale.SCALE_20,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: Scale.SCALE_0, height: Scale.SCALE_0 },
    shadowOpacity: 0.08,
    shadowRadius: Scale.SCALE_8,
    elevation: 8,
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
