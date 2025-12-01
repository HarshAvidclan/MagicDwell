import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Typography, Scale } from '../../Constants';
import { CommonText } from '../CommonText/CommonText';
import { MapplsAutosuggestResult } from '../../../Services/API/Result/resultIndex';
import { MapplsAutosuggestInput } from '../../../Services/API/Input/inputIndex';
import { Mappls } from '../../../Services/API/URL/URLS';
import { API } from '../../../Services/API/Api';

interface CommonCitySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: MapplsAutosuggestResult.SuggestedLocation) => void;
  initialQuery?: string;
}

export const CommonCitySelector: React.FC<CommonCitySelectorProps> = ({
  visible,
  onClose,
  onSelectCity,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [cities, setCities] = useState<
    MapplsAutosuggestResult.SuggestedLocation[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce timer ref
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const fetchCities = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      console.log('Query too short:', query);
      setCities([]);
      return;
    }

    console.log('Fetching cities for query:', query);
    setIsLoading(true);
    setError(null);

    try {
      const input: MapplsAutosuggestInput = {
        query: query.trim(),
        IsCity: true,
      };

      console.log('API Request:', input);

      const result = await API.POST<MapplsAutosuggestResult>(
        Mappls.AUTOSUGGEST,
        input,
      );
      const list =
        (result as MapplsAutosuggestResult)?.suggestedLocations ?? [];
      if (list.length > 0) setCities(list || []);
    } catch (err: any) {
      console.error('Error fetching cities:', err);
      setError(err.message || 'Failed to fetch cities');
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchCities(searchQuery);
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, fetchCities]);

  const handleCitySelect = (
    city: MapplsAutosuggestResult.SuggestedLocation,
  ) => {
    console.log('City selected:', city);
    onSelectCity(city);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setCities([]);
    setError(null);
    onClose();
  };

  const renderCityItem = ({
    item,
  }: {
    item: MapplsAutosuggestResult.SuggestedLocation;
  }) => {
    console.log('Rendering city item:', item);
    return (
      <Pressable
        style={({ pressed }) => [
          styles.cityItem,
          pressed && styles.cityItemPressed,
        ]}
        onPress={() => handleCitySelect(item)}
      >
        <View style={styles.cityItemContent}>
          <CommonText semibold variant="body" color={Colors.BLACK}>
            {item.placeName}
          </CommonText>
          <CommonText variant="caption" color={Colors.GRAY_500}>
            {item.placeAddress}
          </CommonText>
          {/* {item.alternateName && item.alternateName.length > 0 && (
            <CommonText variant="caption" color={Colors.GRAY_400}>
              {item.alternateName}
            </CommonText>
          )} */}
        </View>
      </Pressable>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={Colors.PRIMARY_500} />
          <CommonText variant="body" color={Colors.GRAY_500}>
            Searching cities...
          </CommonText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyState}>
          <CommonText variant="body" color={Colors.ALERT_DANGER_500}>
            {error}
          </CommonText>
        </View>
      );
    }

    if (searchQuery.trim().length < 2) {
      return (
        <View style={styles.emptyState}>
          <CommonText variant="body" color={Colors.GRAY_500}>
            Type at least 2 characters to search
          </CommonText>
        </View>
      );
    }

    if (cities.length === 0) {
      return (
        <View style={styles.emptyState}>
          <CommonText variant="body" color={Colors.GRAY_500}>
            No cities found
          </CommonText>
        </View>
      );
    }

    return null;
  };

  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      <CommonText variant="caption" color={Colors.GRAY_500}>
        {cities.length > 0
          ? `Found ${cities.length} cities`
          : 'Search results will appear here'}
      </CommonText>
    </View>
  );

  console.log(
    'Component render - Cities count:',
    cities.length,
    'Loading:',
    isLoading,
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalOverlay}>
            <Pressable style={styles.backdrop} onPress={handleClose} />
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <CommonText bold variant="heading" color={Colors.BLACK}>
                  Select City
                </CommonText>
                <Pressable style={styles.closeButton} onPress={handleClose}>
                  <CommonText variant="body" color={Colors.PRIMARY_500}>
                    Close
                  </CommonText>
                </Pressable>
              </View>

              {/* Search Input */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search city..."
                  placeholderTextColor={Colors.TEXT_PLACEHOLDER}
                  autoFocus={true}
                  autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                  <Pressable
                    onPress={() => setSearchQuery('')}
                    style={styles.clearButton}
                  >
                    <CommonText variant="body" color={Colors.GRAY_500}>
                      Clear
                    </CommonText>
                  </Pressable>
                )}
              </View>

              {/* City List */}
              <View style={styles.listContainer}>
                {cities.length > 0 ? (
                  <FlatList
                    data={cities}
                    renderItem={renderCityItem}
                    keyExtractor={(item, index) => `${item.eLoc}-${index}`}
                    ListHeaderComponent={ListHeaderComponent}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.flatListContent}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    removeClippedSubviews={false}
                    style={styles.flatList}
                  />
                ) : (
                  renderEmptyState()
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    height: '60%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_100,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.BORDER_SECONDARY,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.TEXT_PRIMARY,
    padding: 0,
    height: 48,
  },
  clearButton: {
    paddingLeft: 8,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.GRAY_50,
  },
  cityItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_SECONDARY,
    minHeight: 60,
  },
  cityItemPressed: {
    backgroundColor: Colors.GRAY_100,
  },
  cityItemContent: {
    gap: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
    minHeight: 200,
  },
});
