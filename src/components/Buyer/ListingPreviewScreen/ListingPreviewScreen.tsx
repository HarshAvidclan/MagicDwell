import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Scale, Typography, Logos, Strings } from "../../Constants";
import { CommonButton } from "../../Common";

export const ListingPreviewScreen = ({ navigation }: any) => {

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePublish = () => {
        // Implement publish logic here
        console.log("Publishing listing...");
    };

    return (
        <SafeAreaView style={styles.viewBg} edges={['top', 'bottom']}>
            <View style={[styles.view, styles.viewLayout]}>
                {/* Header with Back Button (Custom or just consistent with design) */}
                <View style={styles.headerContainer}>
                    <Pressable style={styles.backButtonWrapper} onPress={handleBack}>
                        <Image source={Logos.CHEVRON_LEFT_ICON} style={styles.icon} resizeMode="contain" />
                    </Pressable>
                    <Text style={[styles.listingPreview2, styles.lTypo]}>{Strings.PROPERTY_LISTING.LISTING_PREVIEW}</Text>
                    <View style={styles.placeholderRight} />
                </View>

                <ScrollView style={[styles.frameParent]} contentContainerStyle={styles.frameContainerContent} showsVerticalScrollIndicator={false}>

                    {/* Images Section */}
                    <View style={styles.frameView}>
                        <ScrollView style={[styles.imageParent]} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frameContainer5Content}>
                            <Image style={styles.imageIcon} resizeMode="cover" source={{ uri: "https://via.placeholder.com/300" }} />
                            <Image style={styles.imageIcon} resizeMode="cover" source={{ uri: "https://via.placeholder.com/300" }} />
                            <Image style={styles.imageIcon} resizeMode="cover" source={{ uri: "https://via.placeholder.com/300" }} />
                        </ScrollView>

                        {/* Property Details */}
                        <View style={styles.frameParent2}>
                            <View style={styles.frameParent3}>
                                <View style={[styles.nameWithLocationWrapper, styles.parentFrameFlexBox]}>
                                    <View style={styles.nameWithLocation}>
                                        <Text style={[styles.aresta, styles.lTypo]}>Aresta</Text>
                                        <View style={[styles.location, styles.parentFrameFlexBox]}>
                                            <Text style={styles.sGHighway}>{`S G Highway, Ahmedabad `}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.lParent, styles.parentFrameFlexBox]}>
                                    <Text style={[styles.l, styles.lTypo]}>₹85.50 L</Text>
                                    <View style={[styles.ksqftParent, styles.containerFlexBox]}>
                                        <Text style={[styles.ksqft, styles.ksqftTypo]}>₹4.33 K/sq.ft</Text>
                                        <Image style={styles.frameInner} resizeMode="cover" />
                                        <Text style={[styles.emiStartsAt, styles.ksqftTypo]}>EMI starts at ₹37.88 K</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Key Features */}
                            <View style={styles.carpetAreaParent}>
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <Text style={[styles.carpetArea2, styles.carpetArea2Typo]}>Carpet Area</Text>
                                    <Text style={[styles.sqft, styles.sqftTypo]}>1760 sq.ft</Text>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <Text style={[styles.carpetArea2, styles.carpetArea2Typo]}>Possession</Text>
                                    <Text style={[styles.sqft, styles.sqftTypo]}>Aug, 2028</Text>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={[styles.carpetArea, styles.carpetFlexBox1]}>
                                    <Text style={[styles.carpetArea2, styles.carpetArea2Typo]}>Furnishing</Text>
                                    <Text style={[styles.sqft, styles.sqftTypo]}>Unfurnished</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Project Overview */}
                    <View style={styles.frameParent4}>
                        <View style={styles.frameParent5}>
                            <View style={styles.frameParent3}>
                                <Text style={[styles.projectOverview, styles.projectOverviewTypo]}>{Strings.PROPERTY_LISTING.PROJECT_OVERVIEW}</Text>
                                <View style={styles.horizontalDivider} />
                            </View>
                            <View style={[styles.carpetAreaGroup, styles.carpetFlexBox]}>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>{Strings.PROPERTY_LISTING.PROPERTY_TYPE}</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>Apartment</Text>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>Project area</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>1.08 Acres</Text>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>{`Tower & Unit`}</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>{`4 Towers & 141 Units`}</Text>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>Launch date</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>Sept, 2024</Text>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>Facing</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>East</Text>
                                </View>
                                <View style={[styles.carpetArea5, styles.carpetFlexBox1]}>
                                    <Text style={[styles.propertyType, styles.carpetArea2Typo]}>{`Bedrooms & Bathrooms`}</Text>
                                    <Text style={[styles.apartment, styles.sqftTypo]}>{`3 BHK & 3 Baths`}</Text>
                                </View>
                            </View>
                        </View>
                        <Pressable style={[styles.buttonComponents, styles.buttonFlexBox]} onPress={() => { }}>
                            <Text style={[styles.button, styles.viewDetailsText]}>{Strings.PROPERTY_LISTING.VIEW_ALL_DETAILS}</Text>
                        </Pressable>
                    </View>

                    {/* Amenities */}
                    <View style={styles.frameView}>
                        <Text style={[styles.projectOverview, styles.projectOverviewTypo]}>{Strings.PROPERTY_LISTING.PROPERTY_AMENITIES}</Text>
                        <View style={[styles.carpetAreaContainer, styles.carpetFlexBox]}>
                            {/* Static Amenities for Preview */}
                            <View style={[styles.carpetArea11, styles.carpetBorder]}>
                                <Image style={styles.carRIcon} resizeMode="cover" source={Logos.RESIDENTIAL_ICON} />
                                <Text style={[styles.carParking, styles.sqftTypo]}>Car parking</Text>
                            </View>
                            <View style={[styles.carpetArea11, styles.carpetBorder]}>
                                <Image style={styles.carRIcon} resizeMode="cover" source={Logos.RESIDENTIAL_ICON} />
                                <Text style={[styles.carParking, styles.sqftTypo]}>Internet/Wifi</Text>
                            </View>
                            {/* ... Add more or map dynamically later */}

                            <Pressable style={[styles.carpetArea11, styles.carpetBorder]} onPress={() => { }}>
                                <View style={[styles.container, styles.containerFlexBox]}>
                                    <Text style={[styles.text2, styles.sqftTypo]}>+08</Text>
                                </View>
                                <View style={[styles.viewAllAmenitiesParent, styles.parentFrameFlexBox]}>
                                    <Text style={[styles.viewAllAmenities, styles.carParkingTypo]}>{Strings.PROPERTY_LISTING.VIEW_ALL_AMENITIES}</Text>
                                    <Image style={styles.chevronLeftIcon} resizeMode="cover" source={Logos.CHEVRON_LEFT_ICON} />
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    {/* Nearby - Placeholder for now as per design */}
                    {/* ... */}
                </ScrollView>

                {/* Bottom Buttons */}
                <View style={[styles.buttonComponentsParent]}>
                    <CommonButton
                        title={Strings.PROPERTY_LISTING.BACK}
                        variant="outline"
                        onPress={handleBack}
                        buttonStyle={styles.backButton}
                    // titleStyle={{ color: Colors.BLACK }}
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
    listingPreview2: {
        fontSize: Scale.SCALE_20,
        lineHeight: Scale.SCALE_28,
        color: Colors.BLACK,
        textAlign: "center"
    },
    lTypo: {
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: "700"
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
        textAlign: "left",
        lineHeight: Scale.SCALE_28,
        fontSize: Scale.SCALE_20,
        color: Colors.BLACK,
        alignSelf: "stretch"
    },
    location: {
        alignItems: "center"
    },
    sGHighway: {
        color: Colors.GRAY_500,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: "500",
        fontSize: Scale.SCALE_14,
        textAlign: "left",
        lineHeight: Scale.SCALE_20,
        flex: 1
    },
    lParent: {
        gap: Scale.SCALE_12,
        alignItems: "center",
        alignSelf: "stretch"
    },
    l: {
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
        color: Colors.PRIMARY_500, // #306ba1 match
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: "500"
    },
    ksqftTypo: {
        fontSize: Scale.SCALE_13,
        textAlign: "left",
        lineHeight: Scale.SCALE_20
    },
    frameInner: {
        height: 10,
        width: 2,
        backgroundColor: Colors.GRAY_300 // Placeholder
    },
    emiStartsAt: {
        color: Colors.PRIMARY_600,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: "500"
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
    carpetArea2: {
        textAlign: "center"
    },
    carpetArea2Typo: {
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        color: Colors.GRAY_500,
        fontSize: 14,
        alignSelf: "stretch",
        lineHeight: 20
    },
    sqft: {
        lineHeight: 24,
        fontSize: 16,
        alignSelf: "stretch",
        textAlign: "center",
        color: Colors.BLACK
    },
    sqftTypo: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
        fontWeight: "600"
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
        lineHeight: 24,
        height: 24,
        alignItems: "center"
    },
    projectOverviewTypo: {
        fontSize: Scale.SCALE_18,
        textAlign: "left",
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: "700",
        alignSelf: "stretch",
        color: Colors.BLACK
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
    propertyType: {
        textAlign: "left"
    },
    apartment: {
        lineHeight: 24,
        fontSize: 16,
        textAlign: "left",
        alignSelf: "stretch",
        color: Colors.BLACK
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
    button: {
        lineHeight: 24,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: "500",
        textAlign: "center",
        color: Colors.BLACK
    },
    viewDetailsText: {
        fontSize: Scale.SCALE_16,
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
        fontSize: 14,
        textAlign: "left",
        lineHeight: 20,
        alignSelf: "stretch",
        color: Colors.BLACK
    },
    container: {
        paddingVertical: 0,
        paddingHorizontal: Scale.SCALE_8
    },
    text2: {
        color: Colors.GRAY_900,
        fontSize: 13,
        textAlign: "left",
        lineHeight: 20
    },
    viewAllAmenitiesParent: {
        gap: Scale.SCALE_4,
        alignItems: "center",
        alignSelf: "stretch"
    },
    viewAllAmenities: {
        textDecorationLine: "underline",
        color: Colors.PRIMARY_600,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: "700",
        flex: 1
    },
    carParkingTypo: {
        fontSize: 14,
        textAlign: "left",
        lineHeight: 20
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
