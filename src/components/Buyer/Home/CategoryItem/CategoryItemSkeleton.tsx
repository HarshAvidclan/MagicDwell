// src/Components/Buyer/CategoryItem/CategoryItemSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Scale, Colors } from '../../../Constants';

export const CategoryItemSkeleton: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageSkeleton} />
            <View style={styles.labelSkeleton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_4,
        alignItems: 'center',
    },
    imageSkeleton: {
        width: Scale.SCALE_72,
        height: Scale.SCALE_72,
        borderRadius: Scale.SCALE_36,
        backgroundColor: Colors.GRAY_200,
    },
    labelSkeleton: {
        width: Scale.SCALE_60,
        height: Scale.SCALE_16,
        borderRadius: Scale.SCALE_4,
        backgroundColor: Colors.GRAY_200,
    },
});
