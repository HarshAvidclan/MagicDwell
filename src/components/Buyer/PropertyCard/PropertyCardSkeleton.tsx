// src/Components/Buyer/PropertyCard/PropertyCardSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Scale, Colors } from '../../Constants';

export const PropertyCardSkeleton: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageSkeleton} />
            <View style={styles.contentSkeleton}>
                <View style={styles.titleSkeleton} />
                <View style={styles.detailsRow}>
                    <View style={styles.detailItemSkeleton} />
                    <View style={styles.dotSkeleton} />
                    <View style={styles.detailItemSkeleton} />
                    <View style={styles.dotSkeleton} />
                    <View style={styles.detailItemSkeleton} />
                </View>
                <View style={styles.priceSkeleton} />
            </View>
            <View style={styles.favouriteSkeleton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Scale.SCALE_300,
        backgroundColor: Colors.WHITE,
        borderRadius: Scale.SCALE_8,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: Scale.SCALE_0, height: Scale.SCALE_3 },
        shadowOpacity: 0.05,
        shadowRadius: Scale.SCALE_5,
        elevation: 5,
        alignItems: 'center',
    },
    imageSkeleton: {
        width: Scale.SCALE_300,
        height: Scale.SCALE_152,
        borderTopLeftRadius: Scale.SCALE_8,
        borderTopRightRadius: Scale.SCALE_8,
        backgroundColor: Colors.GRAY_200,
    },
    contentSkeleton: {
        paddingHorizontal: Scale.SCALE_8,
        paddingBottom: Scale.SCALE_8,
        gap: Scale.SCALE_8,
        alignSelf: 'stretch',
    },
    titleSkeleton: {
        width: '80%',
        height: Scale.SCALE_24,
        borderRadius: Scale.SCALE_4,
        backgroundColor: Colors.GRAY_200,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Scale.SCALE_8,
    },
    detailItemSkeleton: {
        width: Scale.SCALE_60,
        height: Scale.SCALE_16,
        borderRadius: Scale.SCALE_4,
        backgroundColor: Colors.GRAY_200,
    },
    dotSkeleton: {
        width: Scale.SCALE_2,
        height: Scale.SCALE_10,
        backgroundColor: Colors.GRAY_200,
    },
    priceSkeleton: {
        width: Scale.SCALE_80,
        height: Scale.SCALE_24,
        borderRadius: Scale.SCALE_4,
        backgroundColor: Colors.GRAY_200,
    },
    favouriteSkeleton: {
        position: 'absolute',
        top: Scale.SCALE_12,
        right: Scale.SCALE_12,
        width: Scale.SCALE_36,
        height: Scale.SCALE_36,
        borderRadius: Scale.SCALE_24,
        backgroundColor: Colors.GRAY_200,
    },
});
