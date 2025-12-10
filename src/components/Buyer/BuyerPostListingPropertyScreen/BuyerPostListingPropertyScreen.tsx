import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    SelectionOption,
} from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { BuyerPostListingPropertyNavigationProp, Routes } from '../../../Types/Navigation';
import { Colors, Scale } from '../../Constants';
import { PropertyStep1 } from './PropertyStep1/PropertyStep1';
import { PropertyStep2 } from './PropertyStep2/PropertyStep2';
import { PropertyStep3 } from './PropertyStep3/PropertyStep3';
import { PropertyStep4 } from './PropertyStep4/PropertyStep4';
import { PropertyStepHeader } from './PropertyStepHeader/PropertyStepHeader';
import { PropertyFooter } from './PropertyFooter/PropertyFooter';
import {
    PropertyAddEditInput,
    tbl_Property,
    tbl_Post,
    tbl_PropertyAmenities,
    tbl_PropertyFurnishItems,
} from '../../../Services/API/Input/inputIndex';
import { PropertyMasterDataResult, PropertyByPostIdResult } from '../../../Services/API/Result/resultIndex';
import { API } from '../../../Services/API/Api';
import { PropertyMaster, Property } from '../../../Services/API/URL/URLS';

// Props supporting both Add and Edit modes
interface BuyerPostListingPropertyScreenProps {
    postId?: number;
    initialData?: PropertyAddEditInput;
}

// Defaults from React web code
const defaultPropertyDetail = (): tbl_Property => ({
    PropertyId: 0,
    SeqNo: 1,
    PropertyTypeId: 1, // Default to Residential to populate initial categories
    ChildPropertyTypeId: 0,
    LookingToId: 0,
    BHKId: null,
    BuildingName: '',
    Locality: '',
    TotalFloor: 0,
    FloorNo: 0,
    BuildArea: 0,
    BuildAreaId: null,
    ConstructionStatusId: 0,
    FurnishTypeId: 0,
    AvailableFromDate: null,
    AgeOfProperty: 0,
    Price: 0,
    PostId: 0,
});

const defaultPostDetail = (): tbl_Post => ({
    PostId: 0,
    PostEntityId: 1,
    UserId: '',
    SeqNo: 1,
    IsPublish: null,
    IsApproved: null,
});

const defaultAddEdit = (): PropertyAddEditInput => ({
    Post: defaultPostDetail(),
    Property: defaultPropertyDetail(),
    PropertyAmenities: [],
    PropertyFurnishItems: [],
    PropertyImages: [],
});

export const BuyerPostListingPropertyScreen: React.FC<BuyerPostListingPropertyScreenProps> = ({
    postId,
    initialData,
}) => {
    const navigation = useNavigation<BuyerPostListingPropertyNavigationProp>();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [masterData, setMasterData] = useState<PropertyMasterDataResult | null>(null);
    const [listing, setListing] = useState<PropertyByPostIdResult | null>(null);

    // Form payload state - matches React web pattern
    const [payload, setPayload] = useState<PropertyAddEditInput>(
        initialData || defaultAddEdit(),
    );

    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

    useEffect(() => {
        const fetchProperty = async () => {
            if (!postId || Number(postId) <= 0) return;
            // If we already have a listing prop from parent, skip fetching. (Assuming initialData acts as prop here maybe? keeping it simple like user snippet)
            try {
                const input = { PostId: Number(postId) };
                const res = await API.POST<PropertyByPostIdResult>(
                    Property.GETBYPOSTID,
                    input,
                );
                console.log("Fetched property details:", res);
                setListing(res);
            } catch (err) {
                console.error("Failed to fetch property by PostId", err);
            }
        };

        fetchProperty();
    }, [postId]);

    // Map incoming listing (either fetched or passed from parent) into payload
    useEffect(() => {
        if (listing) {
            console.log("Mapping listing -> payload", listing);
            const property = listing.Property || {};
            const post = listing.Post || {};
            const amenities = listing.Amenities || [];
            const furnish = listing.FurnishItems || [];

            // Note: The original code sets currentPropertyTypeId state here. 
            // In RN code, we depend on payload.Property.PropertyTypeId to fetch MasterData.
            // So updating payload property type here effectively triggers MasterData fetch.

            setPayload({
                Post: { ...defaultPostDetail(), ...post },
                Property: { ...defaultPropertyDetail(), ...property },
                PropertyAmenities: amenities.map((a: any, idx: number) => ({
                    PropertyId: a.PropertyId ?? 0,
                    AmenityId: a.AmenityId ?? 0,
                    SeqNo: a.SeqNo ?? idx + 1,
                })),
                PropertyFurnishItems: furnish.map((f: any, idx: number) => ({
                    PropertyId: f.PropertyId ?? 0,
                    FurnishItemId: f.FurnishItemId ?? 0,
                    SeqNo: f.SeqNo ?? idx + 1,
                })),
                PropertyImages: listing.PropertyImages || [],
                PropertyDocuments: listing.PropertyDocuments || []
            });
        }
    }, [listing]);

    // Fetch master data on mount and when PropertyTypeId changes
    useEffect(() => {
        const fetchMasterData = async () => {
            setIsLoading(true);
            try {
                const result = await API.POST<PropertyMasterDataResult>(
                    PropertyMaster.GET,
                    { PropertyTypeId: payload.Property.PropertyTypeId }
                );
                setMasterData(result);
            } catch (error) {
                console.error('Failed to fetch master data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMasterData();
    }, [payload.Property.PropertyTypeId]); // Re-fetch when PropertyTypeId changes

    // Update property field
    const setPropertyField = <K extends keyof tbl_Property>(
        field: K,
        value: tbl_Property[K],
    ) => {
        setPayload((p) => ({ ...p, Property: { ...p.Property, [field]: value } }));
    };

    // Convert master data to SelectionOptions
    const propertyTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.PropertyTypes || []).map((pt) => ({
                value: pt.PropertyTypeId,
                label: pt.PropertyTypeName,
            })),
        [masterData],
    );

    const lookingToOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.LookingToList || []).map((lt) => ({
                value: lt.LookingToId,
                label: lt.LookingToName,
            })),
        [masterData],
    );

    // Dynamically filtered category options based on PropertyTypeId
    const categoryOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.ChildPropertyTypes || [])
                .filter((ct) => ct.ParentPropertyTypeId === payload.Property.PropertyTypeId)
                .map((ct) => ({
                    value: ct.PropertyTypeId,
                    label: ct.PropertyTypeName,
                })),
        [masterData, payload.Property.PropertyTypeId],
    );

    const bhkOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.BHKList || []).map((bhk) => ({
                value: bhk.BHKId,
                label: bhk.BHKName,
            })),
        [masterData],
    );

    const buildAreaUnitOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.BuildAreaList || []).map((ba) => ({
                value: ba.BuildAreaId,
                label: ba.BuildAreaName,
            })),
        [masterData],
    );

    const furnishTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.FurnishTypeList || []).map((ft) => ({
                value: ft.FurnishTypeId,
                label: ft.FurnishTypeName,
            })),
        [masterData],
    );

    const constructionStatusOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.ConstructionStatusList || []).map((cs) => ({
                value: cs.ConstructionStatusId,
                label: cs.ConstructionStatusName,
            })),
        [masterData],
    );

    // Available amenities from master data
    const availableAmenities = useMemo(
        () => masterData?.AmenitiesList || [],
        [masterData],
    );

    // Step titles
    const getStepTitle = (step: number): string => {
        switch (step) {
            case 1:
                return 'Add basic details';
            case 2:
                return 'Add property details';
            case 3:
                return 'Add photos & amenities';
            case 4:
                return 'Add pricing & verification';
            default:
                return '';
        }
    };

    const getNextStepTitle = (step: number): string | null => {
        switch (step) {
            case 1:
                return 'Property details';
            case 2:
                return 'Photos & amenities';
            case 3:
                return 'Pricing & verification';
            case 4:
                return 'Happy posting';
            default:
                return null;
        }
    };

    // Navigation handlers
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleContinue = () => {
        // Validate current step
        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
                setErrors({});
            } else {
                // Navigate to Preview Screen instead of direct submit
                // navigation.navigate(Routes.BUYER_LISTING_PREVIEW); // Needs navigation prop
                // Assuming navigation might be available via hook or prop
                // User didn't explicitly inject it in component props but it's a screen in stack.
                // I will use useNavigation hook.
                onPreviewAndPublish();
            }
        }
    };

    const onPreviewAndPublish = () => {
        // @ts-ignore - Navigation type safety handled loosely here or needs hook
        navigation.navigate(Routes.BUYER_LISTING_PREVIEW, {
            data: payload,
            masterData: masterData
        });
    };

    // Basic validation
    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<string, string>> = {};
        const prop = payload.Property;

        // Validation commented out for now - uncomment when needed
        switch (step) {
            case 1:
                if (!prop.PropertyTypeId) newErrors.PropertyTypeId = 'Property type is required';
                if (!prop.LookingToId) newErrors.LookingToId = 'Looking to is required';
                if (!prop.Locality) newErrors.Locality = 'Location is required';
                break;
            case 2:
                if (!prop.ChildPropertyTypeId)
                    newErrors.ChildPropertyTypeId = 'Category is required';
                if (!prop.BuildingName) newErrors.BuildingName = 'Building name is required';
                if (!prop.TotalFloor) newErrors.TotalFloor = 'Total floors is required';
                if (prop.PropertyTypeId === 1 && !prop.BHKId) newErrors.BHKId = 'BHK is required';
                if (!prop.BuildArea) newErrors.BuildArea = 'Build area is required';
                if (!prop.FurnishTypeId) newErrors.FurnishTypeId = 'Furnish type is required';
                if (!prop.ConstructionStatusId)
                    newErrors.ConstructionStatusId = 'Construction status is required';
                break;
            case 3:
                if (payload.PropertyAmenities.length === 0)
                    newErrors.amenities = 'Select at least one amenity';
                break;
            case 4:
                if (!prop.Price) newErrors.Price = 'Price is required';
                if (!prop.AgeOfProperty) newErrors.AgeOfProperty = 'Age of property is required';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement actual submission
            console.log('Submitting payload:', payload);
            // const result = await API.POST<PropertyAddEditResult>(Property.ADDEDIT, payload);
        } catch (error) {
            console.error('Failed to submit property:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        // Reset to initial state logic
        setCurrentStep(1);
        setPayload(initialData || defaultAddEdit());
        setErrors({});
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <PropertyStepHeader
                        currentStep={currentStep}
                        totalSteps={4}
                        stepTitle={getStepTitle(currentStep)}
                        nextStepTitle={getNextStepTitle(currentStep)}
                        onBack={handleBack}
                        onReset={handleReset}
                    />
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ... Steps content ... */}
                {currentStep === 1 && (
                    <PropertyStep1
                        data={payload.Property}
                        propertyTypes={propertyTypeOptions}
                        lookingToOptions={lookingToOptions}
                        onChange={setPropertyField}
                        errors={errors}
                    />
                )}

                {currentStep === 2 && (
                    <PropertyStep2
                        data={payload.Property}
                        propertyTypeId={payload.Property.PropertyTypeId}
                        categoryOptions={categoryOptions}
                        bhkOptions={bhkOptions}
                        buildAreaUnitOptions={buildAreaUnitOptions}
                        furnishTypeOptions={furnishTypeOptions}
                        constructionStatusOptions={constructionStatusOptions}
                        onChange={setPropertyField}
                        errors={errors}
                    />
                )}

                {currentStep === 3 && (
                    <PropertyStep3
                        selectedAmenities={payload.PropertyAmenities.map((a) => a.AmenityId)}
                        availableAmenities={availableAmenities}
                        onAmenitiesChange={(amenityIds) =>
                            setPayload((p) => ({
                                ...p,
                                PropertyAmenities: amenityIds.map((id, idx) => ({
                                    PropertyId: p.Property.PropertyId,
                                    AmenityId: id,
                                    SeqNo: idx + 1,
                                })),
                            }))
                        }
                        images={payload.PropertyImages}
                        onImagesChange={(images) =>
                            setPayload((p) => ({ ...p, PropertyImages: images }))
                        }
                        errors={errors}
                    />
                )}

                {currentStep === 4 && (
                    <PropertyStep4
                        data={payload.Property}
                        onChange={setPropertyField}
                        documents={payload.PropertyDocuments}
                        onDocumentsChange={(docs) =>
                            setPayload((p) => ({ ...p, PropertyDocuments: docs }))
                        }
                        errors={errors}
                    />
                )}
            </ScrollView>

            {/* Footer with navigation buttons */}
            <View style={styles.footerContainer}>
                <PropertyFooter
                    currentStep={currentStep}
                    totalSteps={4}
                    onBack={handleBack}
                    onContinue={handleContinue}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    headerContainer: {
        backgroundColor: Colors.WHITE, // Changed from GRAY_50
        paddingHorizontal: Scale.SCALE_16, // Adjusted padding
        paddingBottom: Scale.SCALE_0,
        paddingTop: Scale.SCALE_8,
    },
    headerContent: {
        // Additional header styling if needed
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Scale.SCALE_16, // Consistent padding
        paddingTop: Scale.SCALE_24,
    },
    footerContainer: {
        backgroundColor: Colors.WHITE,
        borderTopWidth: Scale.SCALE_1,
        borderTopColor: Colors.GRAY_100,
        paddingHorizontal: Scale.SCALE_16,
        paddingVertical: Scale.SCALE_16,
    },
});
