// src/Screens/Buyer/BuyerHome/BuyerHome.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { BuyerHomeScreenNavigationProp } from '../../../Types/Navigation';
import { CommonText } from '../../Common';
import { Images, Strings, Logos, Scale, Colors } from '../../Constants';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { CategoryItemSkeleton } from '../CategoryItem/CategoryItemSkeleton';
import { CategoryTab } from '../CategoryTab/CategoryTab';
import { LocationHeader } from '../LocationHeader/LocationHeader';
import { PropertyCard } from '../PropertyCard/PropertyCard';
import { PropertyCardSkeleton } from '../PropertyCard/PropertyCardSkeleton';
import { ToolCard } from '../ToolCard/ToolCard';
import { SearchBar } from '../SearchBar/SearchBar';
import ToastService from '../../../Services/Toast/ToastService';
import { CATEGORY_CONFIGS, CategoryType } from '../../Constants/Categories';
import { API } from '../../../Services/API/Api';
import { PropertyMaster, VehicleMaster } from '../../../Services/API/URL/URLS';
import { PropertyMasterDataInput } from '../../../Services/API/Input/Property';
import { PropertyMasterDataResult } from '../../../Services/API/Result/Property';
import { VehicleMasterDataInput } from '../../../Services/API/Input/Vehicle';
import { VehicleMasterDataResult } from '../../../Services/API/Result/Vehicle';
import { PostListingInput } from '../../../Services/API/Input/Post';
import { PostListingResult } from '../../../Services/API/Result/Post';
import { Post } from '../../../Services/API/URL/URLS';
import { getImageUrl } from '../../../Services/Utility/Functions';

export const BuyerHome: React.FC = () => {
  const navigation = useNavigation<BuyerHomeScreenNavigationProp>();
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>('residential');
  const [categories, setCategories] = useState<
    Array<{ image: string; label: string }>
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [posts, setPosts] = useState<PostListingResult[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const handleSearchPress = () => {
    ToastService.SUCCESS('Search pressed');
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const getCurrentCategoryConfig = () => {
    return CATEGORY_CONFIGS[activeCategory];
  };

  const fetchCategoriesForType = async (categoryType: CategoryType) => {
    setIsLoadingCategories(true);
    try {
      const config = CATEGORY_CONFIGS[categoryType];

      if (config.apiType === 'property') {
        // Call PropertyMaster API for Residential & Commercial
        const input: PropertyMasterDataInput = {
          PropertyTypeId: config.propertyTypeId!,
        };
        const res = await API.POST<PropertyMasterDataResult>(
          PropertyMaster.GET,
          input,
        );

        // Map ChildPropertyTypes to categories
        const loadedCategories = res.ChildPropertyTypes.map(child => ({
          image: child.Property_Category_Images?.[0]?.ImagePath ?? '',
          label: child.PropertyTypeName,
        }));

        setCategories(loadedCategories);
      } else {
        // Call VehicleMaster API for Cars & Two Wheeler
        const input: VehicleMasterDataInput = {
          VehicleTypeId: config.vehicleTypeId!,
        };
        const res = await API.POST<VehicleMasterDataResult>(
          VehicleMaster.GET,
          input,
        );

        // Map lstChildVehicleType to categories
        const loadedCategories = res.lstChildVehicleType.map(child => ({
          image: child.Vehicle_Category_Images?.[0]?.ImagePath ?? '',
          label: child.VehicleTypeName,
        }));

        setCategories(loadedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      ToastService.ERROR('Failed to load categories');
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategoriesForType(activeCategory);
    fetchPostListings(activeCategory);
  }, [activeCategory]);

  const fetchPostListings = async (categoryType: CategoryType) => {
    setIsLoadingPosts(true);
    try {
      const config = CATEGORY_CONFIGS[categoryType];
      const input: PostListingInput = {
        IsPublish: true,
        PageNumber: 1,
        PageSize: 10,
      };

      // Add category-specific filters
      if (config.apiType === 'property') {
        input.Comm_PropertyTypeId = config.propertyTypeId!.toString();
      } else {
        input.Comma_VehicleTypeId = config.vehicleTypeId!.toString();
      }

      const response = await API.POST<PostListingResult[]>(
        Post.GETFORLISTING,
        input,
      );
      setPosts(response ?? []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      ToastService.ERROR('Failed to load properties');
      setPosts([]);
    } finally {
      setIsLoadingPosts(false);
    }
  };



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

  const currentConfig = getCurrentCategoryConfig();

  return (
    <View style={styles.container}>
      {/* Sticky Header Section with Dynamic Height */}
      <SafeAreaView style={styles.headerWrapper} edges={['top']}>
        {/* Dynamic Background that covers the entire header */}
        <View
          style={[
            styles.headerBackground,
            { backgroundColor: currentConfig.backgroundColor },
          ]}
        />

        {/* Header Content */}
        <View style={styles.headerContent}>
          <LocationHeader
            locationText="Ahmedabad"
            onLocationPress={() => { }}
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
              isActive={activeCategory === 'residential'}
              activeColor={CATEGORY_CONFIGS.residential.primaryColor}
              onPress={() => handleCategoryChange('residential')}
            />
            <CategoryTab
              icon={Logos.COMMERCIAL_ICON}
              label={Strings.CATEGORIES.COMMERCIAL}
              isActive={activeCategory === 'commercial'}
              activeColor={CATEGORY_CONFIGS.commercial.primaryColor}
              onPress={() => handleCategoryChange('commercial')}
            />
            <CategoryTab
              icon={Logos.CARS_ICON}
              label={Strings.CATEGORIES.CARS}
              isActive={activeCategory === 'cars'}
              activeColor={CATEGORY_CONFIGS.cars.primaryColor}
              onPress={() => handleCategoryChange('cars')}
            />
            <CategoryTab
              icon={Logos.TWO_WHEELER_ICON}
              label={Strings.CATEGORIES.TWO_WHEELER}
              isActive={activeCategory === 'two_wheeler'}
              activeColor={CATEGORY_CONFIGS.two_wheeler.primaryColor}
              onPress={() => handleCategoryChange('two_wheeler')}
            />
          </ScrollView>

          <View style={styles.searchBarContainer}>
            <SearchBar onPress={handleSearchPress} />
          </View>
        </View>
      </SafeAreaView>

      {/* Scrollable Content Section - Categories and Below */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <CommonText bold size={Scale.SCALE_18}>
            {Strings.HOME.CATEGORIES}
          </CommonText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {isLoadingCategories ? (
              <>
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
              </>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  IsFormAPI={true}
                  ImageName={category.image}
                  label={category.label}
                />
              ))
            ) : (
              <CommonText>No categories available</CommonText>
            )}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <CommonText bold size={Scale.SCALE_18}>
            {Strings.HOME.NEWLY_ADDED_PROPERTIES}
          </CommonText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {isLoadingPosts ? (
              <>
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
              </>
            ) : posts.length > 0 ? (
              posts.map(post => {
                const formattedPrice = `₹${(post.Price / 100000).toFixed(2)} L`;

                return (
                  <PropertyCard
                    key={post.PostId}
                    IsFormAPI={true}
                    ImageName={post.PostImages?.[0]?.ImagePath ?? ''}
                    title={post.PostName}
                    location={post.Locality}
                    bhk={post.PostRightDetail?.split('|')[0]?.trim() ?? ''}
                    area={post.PostRightDetail?.split('|')[1]?.trim() ?? ''}
                    price={formattedPrice}
                    onPress={() => { }}
                    onFavouritePress={() => { }}
                  />
                );
              })
            ) : (
              <CommonText>No properties available</CommonText>
            )}
          </ScrollView>
        </View>

        <View style={styles.toolsSection}>
          <CommonText bold size={Scale.SCALE_18}>
            {Strings.HOME.TOOLS_INSIGHTS}
          </CommonText>
          <View style={styles.toolsGrid}>
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                label={tool.label}
                onPress={() => { }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: Scale.SCALE_0,
    left: Scale.SCALE_0,
    right: Scale.SCALE_0,
    bottom: Scale.SCALE_0,
    borderBottomLeftRadius: Scale.SCALE_16,
    borderBottomRightRadius: Scale.SCALE_16,
  },
  headerContent: {
    position: 'relative',
    zIndex: 2,
    paddingTop: Scale.SCALE_16,
    paddingBottom: Scale.SCALE_20,
  },
  categoryTabs: {
    marginTop: Scale.SCALE_20,
    maxHeight: Scale.SCALE_40,
    marginHorizontal: Scale.SCALE_16
  },
  categoryTabsContent: {
    gap: Scale.SCALE_8,
  },
  searchBarContainer: {
    marginTop: Scale.SCALE_16,
    paddingHorizontal: Scale.SCALE_16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Scale.SCALE_16,
    paddingTop: Scale.SCALE_16,
    paddingBottom: Scale.SCALE_16,
    gap: Scale.SCALE_20,
  },
  section: {
    gap: Scale.SCALE_12,
  },
  horizontalList: {
    gap: Scale.SCALE_16,
  },
  toolsSection: {
    backgroundColor: Colors.WHITE,
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
