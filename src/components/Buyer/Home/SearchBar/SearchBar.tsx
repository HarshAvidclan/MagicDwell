// src/components/Buyer/SearchBar/SearchBar.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CommonText, CommonImage } from '../../../Common';
import { Colors, Scale, Logos, Strings } from '../../../Constants';

interface SearchBarProps {
  onPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.searchParent} onPress={onPress}>
      <CommonImage
        source={Logos.SEARCH_ICON}
        width={Scale.SCALE_24}
        height={Scale.SCALE_24}
        resizeMode="cover"
      />
      <CommonText
        size={Scale.SCALE_13}
        color={Colors.TEXT_SECONDARY}
        style={styles.searchText}
      >
        {Strings.HOME.SEARCH_PLACEHOLDER}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchParent: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Scale.SCALE_12,
    gap: Scale.SCALE_8,
    borderRadius: Scale.SCALE_8,
  },
  searchText: {
    flex: 1,
    textAlign: 'left',
  },
});