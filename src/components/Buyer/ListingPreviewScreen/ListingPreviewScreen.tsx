import React from "react";
import { StyleSheet, View, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Scale, Typography, Logos, Strings } from "../../Constants";
import { CommonButton, CommonImage, CommonText } from "../../Common";
import { LOCALHOSTWITHPORT } from "../../../Services/API/URL/BaseURL";

export const ListingPreviewScreen = ({ navigation, route }: any) => {
    const { data, masterData } = route.params || {};
    const property = data?.Property || {};
    const images = data?.PropertyImages || [];
    const amenities = data?.PropertyAmenities || [];

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
    const buildAreaName = getMasterName(masterData?.BuildAreaList, property.BuildAreaId, 'BuildAreaId', 'BuildAreaName'); // Note: Assuming ID match or separate unit logic

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePublish = () => {
        // Implement publish logic here
        console.log("Publishing listing...", data);
    };

    return (
        <SafeAreaView style={styles.viewBg} edges={['top', 'bottom']}>
            <View style={[styles.view, styles.viewLayout]}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Pressable style={styles.backButtonWrapper} onPress={handleBack}>
                        <Image source={Logos.CHEVRON_LEFT_ICON} style={styles.icon} resizeMode="contain" />
                    </Pressable>
                    <CommonText variant="heading" bold align="center" style={styles.listingPreviewTitle}>{Strings.PROPERTY_LISTING.LISTING_PREVIEW}</CommonText>
                    <View style={styles.placeholderRight} />
                </View>

                <ScrollView style={[styles.frameParent]} contentContainerStyle={styles.frameContainerContent} showsVerticalScrollIndicator={false}>

                    {/* Images Section */}
                    <View style={styles.frameView}>
                        <ScrollView style={[styles.imageParent]} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frameContainer5Content}>
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
                                        <CommonText bold variant="heading" style={styles.aresta}>{property.BuildingName || 'Building Name'}</CommonText>
                                        <View style={[styles.location, styles.parentFrameFlexBox]}>
                                            <CommonText medium variant="caption" color={Colors.GRAY_500} style={styles.sGHighway}>{property.Locality || 'Location'}</CommonText>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.lParent, styles.parentFrameFlexBox]}>
                                    <CommonText bold style={styles.priceText}>₹{property.Price?.toLocaleString()}</CommonText>
                                    <View style={[styles.ksqftParent, styles.containerFlexBox]}>
                                        <CommonText medium size={Scale.SCALE_13} color={Colors.PRIMARY_500} style={styles.ksqft}>₹{(property.Price / (property.BuildArea || 1)).toFixed(2)}/sq.ft</CommonText>
                                        <View style={styles.frameInner} />
                                        <CommonText medium size={Scale.SCALE_13} color={Colors.PRIMARY_600} style={styles.emiStartsAt}>EMI starts at ₹10k</CommonText>
                                    </View>
                                </View>
                            </View>

                            {/* Key Features */}
                            <View style={styles.carpetAreaParent}>
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">Build Area</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">{property.BuildArea} sq.ft</CommonText>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">Status</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">{constructionStatusName}</CommonText>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500} align="center">Furnishing</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK} align="center">{furnishName}</CommonText>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Project Overview */}
                    <View style={styles.frameParent4}>
                        <View style={styles.frameParent5}>
                            <View style={styles.frameParent3}>
                                <CommonText bold variant="subheading" style={styles.projectOverview}>{Strings.PROPERTY_LISTING.PROJECT_OVERVIEW}</CommonText>
                                <View style={styles.horizontalDivider} />
                            </View>
                            <View style={[styles.carpetAreaGroup, styles.carpetFlexBox]}>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>{Strings.PROPERTY_LISTING.PROPERTY_TYPE}</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>{childPropertyTypeName || propertyTypeName}</CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>Age of Property</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>{property.AgeOfProperty} Years</CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>Configuration</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>{bhkName}</CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>Floor</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>{property.FloorNo} of {property.TotalFloor}</CommonText>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <CommonText variant="caption" color={Colors.GRAY_500}>Looking To</CommonText>
                                    <CommonText semibold variant="subheading" color={Colors.BLACK}>{lookingToName}</CommonText>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Amenities */}
                    <View style={styles.frameView}>
                        <CommonText bold variant="subheading" style={styles.projectOverview}>{Strings.PROPERTY_LISTING.PROPERTY_AMENITIES}</CommonText>
                        <View style={[styles.carpetAreaContainer, styles.carpetFlexBox]}>
                            {amenities.map((item: any, index: number) => {
                                const amenityName = getMasterName(masterData?.AmenitiesList, item.AmenityId, 'AmenityId', 'AmenityName');
                                return (
                                    <View key={index} style={[styles.carpetArea11, styles.carpetBorder]}>
                                        <Image style={styles.carRIcon} resizeMode="cover" source={Logos.RESIDENTIAL_ICON} />
                                        <CommonText variant="caption" color={Colors.BLACK} style={styles.carParking}>{amenityName}</CommonText>
                                    </View>
                                );
                            })}
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
                    />
                    <CommonButton
                        title={Strings.PROPERTY_LISTING.PUBLISH_POSTING}
                        onPress={handlePublish}
                        buttonStyle={styles.publishButton}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

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
        paddingBottom: 100, // Space for bottom buttons
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
        color: Colors.PRIMARY_600, // Assuming #067b62 match
        textAlign: "left"
    },
    ksqftParent: {
        paddingHorizontal: Scale.SCALE_12,
        paddingVertical: Scale.SCALE_4,
        gap: Scale.SCALE_8,
        flex: 1
    },
    containerFlexBox: {
        backgroundColor: Colors.GRAY_100, // #f3f4f6
        borderRadius: Scale.BORDER_RADIUS_4,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    ksqft: {
        // color: Colors.PRIMARY_500, // #306ba1 match
    },
    frameInner: {
        height: 10,
        width: 2,
        backgroundColor: Colors.GRAY_300 // Placeholder
    },
    emiStartsAt: {
        // color: Colors.PRIMARY_600,
    },
    carpetAreaParent: {
        backgroundColor: Colors.GRAY_50, // #f9fafb
        paddingVertical: Scale.SCALE_8,
        borderColor: Colors.GRAY_200, // #e5e7eb
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
        // height: 44
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
        // lineHeight: 24,
        // height: 24,
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
        width: '45%' // approximate
    },
    buttonComponents: {
        width: '100%',
        borderColor: Colors.BLACK,
        height: 49,
        // padding: Scale.SCALE_16,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Colors.WHITE
    },
    buttonFlexBox: {
        borderRadius: Scale.BORDER_RADIUS_100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden"
    },
    carpetAreaContainer: {
        gap: Scale.SCALE_12
    },
    carpetArea11: {
        width: 111,
        gap: Scale.SCALE_4
    },
    carpetBorder: {
        padding: Scale.SCALE_8,
        height: 80,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: 1,
        borderColor: Colors.GRAY_300,
        borderStyle: "solid"
    },
    carRIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.GRAY_500
    },
    carParking: {
        // textAlign: "left",
        // lineHeight: 20,
        alignSelf: "stretch",
    },
    container: {
        paddingVertical: 0,
        paddingHorizontal: Scale.SCALE_8
    },
    viewAllAmenitiesParent: {
        gap: Scale.SCALE_4,
        alignItems: "center",
        alignSelf: "stretch"
    },
    viewAllAmenities: {
        textDecorationLine: "underline",
        flex: 1
    },
    chevronLeftIcon: {
        height: 16,
        width: 16,
        tintColor: Colors.PRIMARY_600,
        transform: [{ rotate: '180deg' }]
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
    }
});
