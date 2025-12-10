import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Scale, Typography, Logos, Strings } from "../../Constants";
import { CommonButton, CommonImage, CommonText, CommonModal } from "../../Common";
import { LOCALHOSTWITHPORT } from "../../../Services/API/URL/BaseURL";
import { API } from "../../../Services/API/Api";
import { Property } from "../../../Services/API/URL/URLS";
import { PropertyAddEditResult } from "../../../Services/API/Result/resultIndex";
import { Alert } from "react-native";
import { calculateEMIText, formatPrice, formatPricePerSqft } from "../../../Services/Utility/Functions";

export const ListingPreviewScreen = ({ navigation, route }: any) => {
    const { data, masterData } = route.params || {};
    const property = data?.Property || {};
    const images = data?.PropertyImages || [];
    const amenities = data?.PropertyAmenities || [];

    const [loading, setLoading] = useState(false);
    const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] = useState(false);
    const [isViewAmenitiesModalVisible, setIsViewAmenitiesModalVisible] = useState(false);

    // Helper to get name from master data
    const getMasterName = (list: any[], id: number, key: string, labelKey: string) => {
        const item = list?.find((x: any) => x[key] === id);
        return item?.[labelKey] || 'N/A';
    };

    const propertyTypeName = getMasterName(masterData?.PropertyTypes, property.PropertyTypeId, 'PropertyTypeId', 'PropertyTypeName');
    const childPropertyTypeName = getMasterName(masterData?.ChildPropertyTypes, property.ChildPropertyTypeId, 'PropertyTypeId', 'PropertyTypeName');
    const lookingToName = getMasterName(masterData?.LookingToList, property.LookingToId, 'LookingToId', 'LookingToName');
    const bhkName = getMasterName(masterData?.BHKList, property.BHKId, 'BHKId', 'BHKName');
    const furnishName = getMasterName(masterData?.FurnishTypeList, property.FurnishTypeId, 'FurnishTypeId', 'FurnishTypeName');
    const constructionStatusName = getMasterName(masterData?.ConstructionStatusList, property.ConstructionStatusId, 'ConstructionStatusId', 'ConstructionStatusName');

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePublish = async () => {
        if (!data) return;
        setLoading(true);
        try {
            console.log("Publishing listing...", JSON.stringify(data));
            const response = await API.POST<PropertyAddEditResult>(
                Property.ADDEDIT,
                data
            );

            const postId = data?.Post?.PostId;

            if (response != null) {
                console.log("Property Save Response", response);

                if (
                    response.IsSuccess &&
                    (Number(postId) <= 0 || postId == undefined)
                ) {
                    Alert.alert("Success", "Property listed successfully!", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.popToTop();
                            }
                        }
                    ]);
                } else if (response.IsSuccess) {
                    Alert.alert("Success", "Property details updated!", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.popToTop();
                            }
                        }
                    ]);
                }
            }
        } catch (error) {
            console.error("Publish error:", error);
            Alert.alert("Error", "Failed to publish listing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Render amenity cards similar to PropertyStep3
    const renderAmenityCard = (amenity: any, index: number) => {
        const amenityName = getMasterName(masterData?.AmenitiesList, amenity.AmenityId, 'AmenityId', 'AmenityName');
        return (
            <View key={index} style={[styles.amenityCard]}>
                <Image style={styles.amenityIcon} resizeMode="cover" source={Logos.RESIDENTIAL_ICON} />
                <CommonText variant="caption" color={Colors.BLACK} style={styles.amenityLabel}>
                    {amenityName}
                </CommonText>
            </View>
        );
    };

    // Show first 5 amenities (3 in first row, 2 in second row)
    const defaultAmenities = amenities.slice(0, 5);
    const hasMoreAmenities = amenities.length > 5;

    return (
        <SafeAreaView style={styles.viewBg} edges={['top', 'bottom']}>
            <View style={[styles.view, styles.viewLayout]}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Pressable style={styles.backButtonWrapper} onPress={handleBack}>
                        <Image source={Logos.CHEVRON_LEFT_ICON} style={styles.icon} resizeMode="contain" />
                    </Pressable>
                    <CommonText variant="heading" bold align="center" style={styles.listingPreviewTitle}>
                        {Strings.PROPERTY_LISTING.LISTING_PREVIEW}
                    </CommonText>
                    <View style={styles.placeholderRight} />
                </View>

                <ScrollView
                    style={[styles.frameParent]}
                    contentContainerStyle={styles.frameContainerContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Images Section */}
                    <View style={styles.frameView}>
                        <ScrollView
                            style={[styles.imageParent]}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.frameContainer5Content}
                        >
                            {images.length > 0 ? (
                                images.map((img: any, index: number) => (
                                    <CommonImage
                                        key={index}
                                        style={styles.imageIcon}
                                        resizeMode="cover"
                                        source={{ uri: `${LOCALHOSTWITHPORT}${img.ImagePath}` }}
                                    />
                                ))
                            ) : (
                                <View style={[styles.imageIcon, { justifyContent: 'center', alignItems: 'center' }]}>
                                    <CommonText>No Images Uploaded</CommonText>
                                </View>
                            )}
                        </ScrollView>

                        {/* Property Details */}
                        <View style={styles.frameParent2}>
                            <View style={styles.frameParent3}>
                                <View style={[styles.nameWithLocationWrapper, styles.parentFrameFlexBox]}>
                                    <View style={styles.nameWithLocation}>
                                        <CommonText bold variant="heading" style={styles.aresta}>
                                            {property.BuildingName || 'Building Name'}
                                        </CommonText>
                                        <View style={[styles.location, styles.parentFrameFlexBox]}>
                                            <CommonText medium variant="caption" color={Colors.GRAY_500} style={styles.sGHighway}>
                                                {property.Locality || 'Location'}
                                            </CommonText>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.lParent, styles.parentFrameFlexBox]}>
                                    <CommonText bold style={styles.priceText}>
                                        {formatPrice(property.Price)}
                                    </CommonText>
                                    <View style={[styles.ksqftParent, styles.containerFlexBox]}>
                                        <CommonText medium size={Scale.SCALE_13} color={Colors.SECONDARY_700} style={styles.ksqft}>
                                            {formatPricePerSqft(property.Price, property.BuildArea || 1, property.BuildAreaId || 1)}
                                        </CommonText>
                                        <View style={styles.frameInner} />
                                        <CommonText medium size={Scale.SCALE_13} color={Colors.TERTIARY_700} style={styles.emiStartsAt}>
                                            {calculateEMIText(property.Price)}
                                        </CommonText>
                                    </View>
                                </View>
                            </View>

                            {/* Key Features */}
                            <View style={styles.carpetAreaParent}>
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">
                                        Build Area
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">
                                        {property.BuildArea} sq.ft
                                    </CommonText>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">
                                        Status
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">
                                        {constructionStatusName}
                                    </CommonText>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">
                                        Furnishing
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">
                                        {furnishName}
                                    </CommonText>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Project Overview */}
                    <View style={styles.frameParent4}>
                        <View style={styles.frameParent5}>
                            <View style={styles.frameParent3}>
                                <CommonText bold variant="subheading" style={styles.projectOverview}>
                                    {Strings.PROPERTY_LISTING.PROJECT_OVERVIEW}
                                </CommonText>
                                <View style={styles.horizontalDivider} />
                            </View>
                            <View style={[styles.carpetAreaGroup, styles.carpetFlexBox]}>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>
                                        {Strings.PROPERTY_LISTING.PROPERTY_TYPE}
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>
                                        {childPropertyTypeName || propertyTypeName}
                                    </CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>
                                        Age of Property
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>
                                        {property.AgeOfProperty} Years
                                    </CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>
                                        Configuration
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>
                                        {bhkName}
                                    </CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>
                                        Floor
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>
                                        {property.FloorNo} of {property.TotalFloor}
                                    </CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>
                                        Looking To
                                    </CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>
                                        {lookingToName}
                                    </CommonText>
                                </View>
                            </View>
                        </View>

                        {/* View All Details Button */}
                        <CommonButton
                            title={Strings.PROPERTY_LISTING.VIEW_ALL_DETAILS || "View all details"}
                            variant="outline"
                            onPress={() => setIsViewDetailsModalVisible(true)}
                            buttonStyle={styles.viewAllDetailsButton}
                            textColor={Colors.BLACK}
                            borderColor={Colors.BLACK}
                        />
                    </View>

                    {/* Amenities Section - Using PropertyStep3 Style */}
                    <View style={styles.frameView}>
                        <CommonText bold variant="subheading" style={styles.projectOverview}>
                            {Strings.PROPERTY_LISTING.PROPERTY_AMENITIES}
                        </CommonText>

                        {/* First Row: 3 Amenities */}
                        <View style={styles.amenityRow}>
                            {defaultAmenities.slice(0, 3).map((amenity: any, index: number) => renderAmenityCard(amenity, index))}
                        </View>

                        {/* Second Row: 2 Amenities + View All Button */}
                        <View style={styles.amenityRow}>
                            {defaultAmenities.slice(3, 5).map((amenity: any, index: number) => renderAmenityCard(amenity, index + 3))}

                            {/* View All Button */}
                            {hasMoreAmenities && (
                                <Pressable
                                    style={styles.viewAllAmenitiesCard}
                                    onPress={() => setIsViewAmenitiesModalVisible(true)}
                                >
                                    <View style={styles.viewAllCountBadge}>
                                        <CommonText semibold size={Scale.SCALE_13} color={Colors.GRAY_700}>
                                            +{amenities.length - 5}
                                        </CommonText>
                                    </View>
                                    <View style={styles.viewAllTextContainer}>
                                        <CommonText bold size={Scale.SCALE_14} color={Colors.PRIMARY_600} style={styles.viewAllAmenitiesText}>
                                            View all amenities
                                        </CommonText>
                                        <Image source={Logos.CHEVRON_LEFT_ICON} style={styles.chevronIcon} resizeMode="contain" />
                                    </View>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Buttons */}
                <View style={[styles.buttonComponentsParent]}>
                    <CommonButton
                        title={Strings.PROPERTY_LISTING.BACK}
                        variant="outline"
                        onPress={handleBack}
                        buttonStyle={styles.backButton}
                        textColor={Colors.BLACK}
                        borderColor={Colors.BLACK}
                    />
                    <CommonButton
                        title={Strings.PROPERTY_LISTING.PUBLISH_POSTING}
                        onPress={handlePublish}
                        buttonStyle={styles.publishButton}
                        loading={loading}
                    />
                </View>

                {/* View Details Modal */}
                <CommonModal
                    visible={isViewDetailsModalVisible}
                    onClose={() => setIsViewDetailsModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <CommonText bold variant="heading" align="center" style={styles.modalTitle}>
                            {Strings.PROPERTY_LISTING.PROJECT_OVERVIEW}
                        </CommonText>
                        <View style={styles.detailsGrid}>
                            <DetailRow label="Property type" value={childPropertyTypeName || propertyTypeName} />
                            <DetailRow label="Project area" value="1.08 Acres" />
                            <DetailRow label="Tower & Unit" value="4 Towers & 141 Units" />
                            <DetailRow label="Launch date" value="Sept, 2024" />
                            <DetailRow label="Facing" value="East" />
                            <DetailRow label="Size" value={`${property.BuildArea} sq. ft.`} />
                            <DetailRow label="Possession date" value="August, 2028" />
                            <DetailRow label="Configuration" value={`${bhkName} Apartment`} />
                            <DetailRow label="Price / Sq. Ft." value={formatPricePerSqft(property.Price, property.BuildArea || 1, property.BuildAreaId || 1)} />
                            <DetailRow label="Bedrooms" value="3" />
                            <DetailRow label="Bathrooms" value="3" />
                            <DetailRow label="Transaction type" value="New property" />
                        </View>
                    </View>
                </CommonModal>

                {/* View Amenities Modal */}
                <CommonModal
                    visible={isViewAmenitiesModalVisible}
                    onClose={() => setIsViewAmenitiesModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <CommonText bold variant="heading" align="center" style={styles.modalTitle}>
                            Amenities
                        </CommonText>
                        <View style={styles.allAmenitiesGrid}>
                            {amenities.map((amenity: any, index: number) => {
                                const amenityName = getMasterName(masterData?.AmenitiesList, amenity.AmenityId, 'AmenityId', 'AmenityName');
                                return (
                                    <View key={index} style={styles.modalAmenityCard}>
                                        <Image style={styles.modalAmenityIcon} resizeMode="cover" source={Logos.RESIDENTIAL_ICON} />
                                        <CommonText semibold size={Scale.SCALE_15} color={Colors.BLACK}>
                                            {amenityName}
                                        </CommonText>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </CommonModal>
            </View>
        </SafeAreaView>
    );
};

// Helper component for detail rows in modal
const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.detailRow}>
        <CommonText variant="caption" color={Colors.GRAY_500}>
            {label}
        </CommonText>
        <CommonText semibold variant="subheading" color={Colors.BLACK}>
            {value}
        </CommonText>
    </View>
);

const styles = StyleSheet.create({
    viewBg: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    view: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    viewLayout: {
        overflow: "hidden",
        width: "100%"
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Scale.SCALE_16,
        paddingVertical: Scale.SCALE_12,
    },
    backButtonWrapper: {
        width: Scale.SCALE_42,
        height: Scale.SCALE_42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Scale.BORDER_RADIUS_12,
        borderWidth: 1,
        borderColor: Colors.GRAY_200,
    },
    placeholderRight: {
        width: Scale.SCALE_42,
    },
    frameParent: {
        flex: 1,
        paddingHorizontal: Scale.SCALE_16,
    },
    frameContainerContent: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: Scale.SCALE_20,
        paddingBottom: 100,
    },
    listingPreviewTitle: {
        flex: 1
    },
    icon: {
        width: Scale.SCALE_24,
        height: Scale.SCALE_24,
        tintColor: Colors.BLACK
    },
    frameView: {
        gap: Scale.SCALE_12,
        alignSelf: "stretch"
    },
    imageParent: {
        flexGrow: 0,
    },
    frameContainer5Content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: Scale.SCALE_12
    },
    imageIcon: {
        height: 176,
        width: 316,
        borderRadius: Scale.BORDER_RADIUS_12,
        backgroundColor: Colors.GRAY_100,
    },
    frameParent2: {
        gap: Scale.SCALE_16,
        alignSelf: "stretch"
    },
    frameParent3: {
        gap: Scale.SCALE_8,
        alignSelf: "stretch"
    },
    nameWithLocationWrapper: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    parentFrameFlexBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    nameWithLocation: {
        flex: 1
    },
    aresta: {
        lineHeight: Scale.SCALE_28,
        alignSelf: "stretch"
    },
    location: {
        alignItems: "center"
    },
    sGHighway: {
        flex: 1
    },
    lParent: {
        gap: Scale.SCALE_12,
        alignItems: "center",
        alignSelf: "stretch"
    },
    priceText: {
        fontSize: 26,
        lineHeight: 36,
        color: Colors.TERTIARY_700,
        textAlign: "left"
    },
    ksqftParent: {
        paddingHorizontal: Scale.SCALE_12,
        paddingVertical: Scale.SCALE_4,
        gap: Scale.SCALE_8,
        flex: 1
    },
    containerFlexBox: {
        backgroundColor: Colors.GRAY_100,
        borderRadius: Scale.BORDER_RADIUS_4,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    ksqft: {},
    frameInner: {
        height: 10,
        width: 2,
        backgroundColor: Colors.GRAY_300
    },
    emiStartsAt: {},
    carpetAreaParent: {
        backgroundColor: Colors.GRAY_50,
        paddingVertical: Scale.SCALE_8,
        borderColor: Colors.GRAY_200,
        borderRadius: Scale.BORDER_RADIUS_8,
        gap: Scale.SCALE_12,
        borderWidth: 1,
        borderStyle: "solid",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "stretch"
    },
    carpetArea: {
        flex: 1,
        alignItems: "center",
        gap: 0,
    },
    carpetFlexBox1: {
        gap: 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    verticalDivider: {
        width: 1,
        height: 20,
        backgroundColor: Colors.GRAY_300,
    },
    frameParent4: {
        padding: Scale.SCALE_12,
        borderColor: Colors.GRAY_200,
        borderRadius: Scale.BORDER_RADIUS_8,
        gap: Scale.SCALE_16,
        borderWidth: 1,
        borderStyle: "solid",
        alignSelf: "stretch"
    },
    frameParent5: {
        gap: Scale.SCALE_12,
    },
    projectOverview: {
        alignItems: "center"
    },
    horizontalDivider: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.GRAY_200,
    },
    carpetAreaGroup: {
        gap: Scale.SCALE_16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    carpetFlexBox: {
        alignContent: "flex-start",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    carpetArea5: {
        width: '45%'
    },
    viewAllDetailsButton: {
        width: '100%',
        borderColor: Colors.BLACK,
        borderWidth: 1,
        backgroundColor: Colors.WHITE
    },
    // Amenities Section - PropertyStep3 Style
    amenityRow: {
        flexDirection: 'row',
        gap: Scale.SCALE_12,
        justifyContent: 'flex-start',
    },
    amenityCard: {
        flex: 1,
        height: Scale.SCALE_80,
        padding: Scale.SCALE_8,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_4,
    },
    amenityIcon: {
        width: Scale.SCALE_20,
        height: Scale.SCALE_20,
        tintColor: Colors.GRAY_500,
    },
    amenityLabel: {
        lineHeight: Typography.LINE_HEIGHT_16,
        flex: 1,
    },
    viewAllAmenitiesCard: {
        flex: 1,
        height: Scale.SCALE_80,
        padding: Scale.SCALE_8,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        justifyContent: 'space-between',
        gap: Scale.SCALE_4,
    },
    viewAllCountBadge: {
        backgroundColor: Colors.GRAY_100,
        borderRadius: Scale.BORDER_RADIUS_4,
        paddingVertical: 0,
        paddingHorizontal: Scale.SCALE_8,
        alignSelf: 'flex-start',
    },
    viewAllTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Scale.SCALE_4,
        alignSelf: 'stretch',
    },
    viewAllAmenitiesText: {
        textDecorationLine: 'underline',
        flex: 1,
    },
    chevronIcon: {
        width: Scale.SCALE_16,
        height: Scale.SCALE_16,
        transform: [{ rotate: '180deg' }],
        tintColor: Colors.PRIMARY_600,
    },
    buttonComponentsParent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Scale.SCALE_16,
        backgroundColor: Colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: Colors.GRAY_200,
        flexDirection: 'row',
        gap: Scale.SCALE_12,
        alignItems: 'center',
    },
    backButton: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.BLACK,
        borderWidth: 1,
    },
    publishButton: {
        flex: 2,
        backgroundColor: Colors.PRIMARY_500,
    },
    // Modal Styles
    modalContent: {
        paddingHorizontal: Scale.SCALE_16,
        gap: Scale.SCALE_24,
        alignSelf: 'stretch',
    },
    modalTitle: {
        alignSelf: 'stretch',
    },
    detailsGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: Scale.SCALE_16,
    },
    detailRow: {
        width: '47%',
        height: 44,
        justifyContent: 'space-between',
        gap: 0,
        alignItems: 'center',
    },
    allAmenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: Scale.SCALE_12,
    },
    modalAmenityCard: {
        width: '47%',
        borderRadius: Scale.BORDER_RADIUS_8,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_300,
        borderWidth: 1,
        paddingHorizontal: Scale.SCALE_8,
        paddingVertical: Scale.SCALE_12,
        gap: Scale.SCALE_4,
    },
    modalAmenityIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.GRAY_500,
    },
});
