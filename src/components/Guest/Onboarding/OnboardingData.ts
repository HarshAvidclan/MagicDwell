// src/Screens/Guest/OnboardingData.ts
import { Images, Colors, Strings } from '../../Constants';

export interface OnboardingSlide {
    image: any;
    heading: string;
    description: string;
    backgroundColor: string;
    activeColor: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
    {
        image: Images.ONBOARDING_HOME,
        heading: Strings.ONBOARDING.SLIDES[0].HEADING,
        description: Strings.ONBOARDING.SLIDES[0].DESCRIPTION,
        backgroundColor: Colors.MAINFOUR_RESIDENTIAL_100,
        activeColor: Colors.MAINFOUR_RESIDENTIAL_500,
    },
    {
        image: Images.ONBOARDING_HOME1,
        heading: Strings.ONBOARDING.SLIDES[1].HEADING,
        description: Strings.ONBOARDING.SLIDES[1].DESCRIPTION,
        backgroundColor: Colors.MAINFOUR_COMMERCIAL_100,
        activeColor: Colors.MAINFOUR_COMMERCIAL_500,
    },
    {
        image: Images.ONBOARDING_HOME2,
        heading: Strings.ONBOARDING.SLIDES[2].HEADING,
        description: Strings.ONBOARDING.SLIDES[2].DESCRIPTION,
        backgroundColor: Colors.MAINFOUR_CARS_100,
        activeColor: Colors.MAINFOUR_CARS_500,
    },
    {
        image: Images.ONBOARDING_HOME3,
        heading: Strings.ONBOARDING.SLIDES[3].HEADING,
        description: Strings.ONBOARDING.SLIDES[3].DESCRIPTION,
        backgroundColor: Colors.MAINFOUR_TWOWHEELER_100,
        activeColor: Colors.MAINFOUR_TWOWHEELER_500,
    },
];

export const SLIDE_INTERVAL = 3000; // 3 seconds per slide