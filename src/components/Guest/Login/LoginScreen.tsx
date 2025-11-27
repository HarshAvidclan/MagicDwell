import * as React from "react";
import {StyleSheet, View, Text, Pressable, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Login = () => {
  	
  	return (
    		<SafeAreaView style={styles.viewBg}>
      			<View style={[styles.view, styles.viewBg]}>
        				<View style={[styles.homeindicator, styles.homeindicatorPosition]}>
          					<View style={styles.homeIndicator} />
        				</View>
        				<View style={[styles.statusbarIphone1313Pro, styles.homeindicatorPosition]}>
          					<View style={[styles.notch, styles.notchPosition]}>
            						<Image style={[styles.notchIcon, styles.notchPosition]} resizeMode="cover" />
          					</View>
          					<View style={styles.rightSide}>
            						<View style={styles.battery}>
              							<Image style={styles.outlineIcon} resizeMode="cover" />
              							<Image style={[styles.batteryEndIcon, styles.wifiIconLayout]} resizeMode="cover" />
              							<Image style={styles.fillIcon} resizeMode="cover" />
            						</View>
            						<View style={[styles.wifi, styles.wifiLayout]}>
              							<Image style={[styles.wifiPathIcon, styles.wifiLayout]} resizeMode="cover" />
              							<Image style={[styles.wifiPathIcon2, styles.wifiIconLayout]} resizeMode="cover" />
              							<Image style={[styles.wifiPathIcon3, styles.wifiIconLayout]} resizeMode="cover" />
            						</View>
            						<Image style={styles.iconMobileSignal} resizeMode="cover" />
          					</View>
          					<View style={[styles.leftSide, styles.leftSideLayout]}>
            						<View style={[styles.statusbarTime, styles.leftSideLayout]}>
              							<Text style={[styles.text, styles.enTypo]}>9:41</Text>
            						</View>
          					</View>
        				</View>
        				<View style={styles.frameParent}>
          					<View style={styles.frameGroup}>
            						<View style={[styles.logomarkParent, styles.frameViewFlexBox]}>
              							<Pressable style={[styles.logomark, styles.logomarkFlexBox]} onPress={()=>{}}>
                								<Text style={[styles.md, styles.mdTypo]}>MD</Text>
              							</Pressable>
              							<View style={[styles.language, styles.languageFlexBox]}>
                								<Text style={[styles.en, styles.enTypo]}>EN</Text>
                								<Image style={styles.arrowDropUpIcon} resizeMode="cover" />
              							</View>
            						</View>
            						<View style={styles.frameContainer}>
              							<View style={styles.frameViewFlexBox}>
                								<View style={styles.frameViewFlexBox}>
                  									<View style={styles.frameContainer}>
                    										<View style={styles.whatsYourMobileNumberParent}>
                      											<Text style={[styles.whatsYourMobile, styles.text2Clr]}>What’s your mobile number?</Text>
                        												<Text style={[styles.wellSendAn, styles.wellSendAnClr]}>We’ll send an OTP to verify your number.</Text>
                        												</View>
                        												<Pressable style={[styles.inputTextfield, styles.parentFlexBox]} onPress={()=>{}}>
                          													<View style={styles.parentFlexBox}>
                            														<Image style={styles.frameChild} resizeMode="cover" />
                            														<Text style={[styles.text2, styles.text2Typo]}>+91</Text>
                          													</View>
                          													<Text style={[styles.enterYourMobile, styles.enterYourMobileFlexBox]}>Enter your mobile number</Text>
                        												</Pressable>
                        												</View>
                        												<View style={[styles.buttonComponents, styles.logomarkFlexBox]}>
                          													<Text style={[styles.button, styles.text2Typo]}>Next</Text>
                        												</View>
                        												</View>
                        												<View style={[styles.lineParent, styles.parentFlexBox]}>
                          													<View style={styles.frameItem} />
                          													<View style={[styles.orWrapper, styles.languageFlexBox]}>
                            														<Text style={styles.or}>or</Text>
                          													</View>
                          													<View style={styles.frameItem} />
                        												</View>
                        												</View>
                        												<View style={[styles.ctaCall, styles.parentFlexBox]}>
                          													<Image style={styles.whatsapp1Icon} resizeMode="cover" />
                          													<Text style={[styles.en, styles.enTypo]}>Continue with Whatsapp</Text>
                        												</View>
                        												</View>
                        												</View>
                        												<Text style={[styles.byRegisteringYou, styles.enterYourMobileFlexBox]}>By registering,  you agree to receive calls or messages via SMS or WhatsApp for verification and service updates from MagicDwell and its partners.</Text>
                        												</View>
                        												</View>
                        												</SafeAreaView>);
                      											};
                      											
                      											const styles = StyleSheet.create({
                        												login: {
                          													flex: 1,
                          													backgroundColor: "#fff"
                        												},
                        												viewBg: {
                          													backgroundColor: "#fff",
                          													flex: 1
                        												},
                        												homeindicatorPosition: {
                          													width: 390,
                          													marginLeft: -195,
                          													left: "50%",
                          													position: "absolute"
                        												},
                        												notchPosition: {
                          													height: 32,
                          													width: 164,
                          													marginLeft: -82,
                          													left: "50%",
                          													position: "absolute"
                        												},
                        												wifiIconLayout: {
                          													height: 4,
                          													position: "absolute"
                        												},
                        												wifiLayout: {
                          													width: 17,
                          													position: "absolute"
                        												},
                        												leftSideLayout: {
                          													height: 21,
                          													width: 54,
                          													left: "50%",
                          													position: "absolute"
                        												},
                        												enTypo: {
                          													fontWeight: "600",
                          													textAlign: "center"
                        												},
                        												frameViewFlexBox: {
                          													gap: 20,
                          													alignSelf: "stretch"
                        												},
                        												logomarkFlexBox: {
                          													height: 48,
                          													justifyContent: "center",
                          													alignItems: "center",
                          													flexDirection: "row"
                        												},
                        												mdTypo: {
                          													fontFamily: "Urbanist-Bold",
                          													fontWeight: "700",
                          													lineHeight: 32,
                          													letterSpacing: -0.5,
                          													fontSize: 24
                        												},
                        												languageFlexBox: {
                          													paddingBottom: 4,
                          													justifyContent: "center",
                          													alignItems: "center"
                        												},
                        												text2Clr: {
                          													color: "#13131a",
                          													textAlign: "left"
                        												},
                        												wellSendAnClr: {
                          													color: "#374151",
                          													fontFamily: "Urbanist-Regular",
                          													alignSelf: "stretch"
                        												},
                        												parentFlexBox: {
                          													gap: 8,
                          													alignItems: "center",
                          													flexDirection: "row"
                        												},
                        												text2Typo: {
                          													fontFamily: "Urbanist-Medium",
                          													fontWeight: "500",
                          													fontSize: 16,
                          													lineHeight: 24
                        												},
                        												enterYourMobileFlexBox: {
                          													display: "flex",
                          													textAlign: "left",
                          													alignItems: "center"
                        												},
                        												view: {
                          													width: "100%",
                          													height: 844,
                          													overflow: "hidden"
                        												},
                        												homeindicator: {
                          													bottom: 0,
                          													height: 34
                        												},
                        												homeIndicator: {
                          													marginLeft: -67,
                          													bottom: 8,
                          													width: 134,
                          													height: 5,
                          													backgroundColor: "#000",
                          													borderRadius: 100,
                          													left: "50%",
                          													position: "absolute"
                        												},
                        												statusbarIphone1313Pro: {
                          													height: 44,
                          													top: 0,
                          													overflow: "hidden"
                        												},
                        												notch: {
                          													top: -2
                        												},
                        												notchIcon: {
                          													top: 0
                        												},
                        												rightSide: {
                          													right: 18,
                          													width: 70,
                          													height: 12,
                          													top: 19,
                          													position: "absolute"
                        												},
                        												battery: {
                          													width: 25,
                          													right: 0,
                          													height: 12,
                          													top: 0,
                          													position: "absolute"
                        												},
                        												outlineIcon: {
                          													right: 2,
                          													borderRadius: 3,
                          													width: 23,
                          													opacity: 0.35,
                          													height: 12,
                          													top: 0,
                          													position: "absolute"
                        												},
                        												batteryEndIcon: {
                          													top: 4,
                          													width: 1,
                          													opacity: 0.4,
                          													right: 0
                        												},
                        												fillIcon: {
                          													top: 2,
                          													right: 4,
                          													borderRadius: 1,
                          													height: 8,
                          													width: 19,
                          													position: "absolute"
                        												},
                        												wifi: {
                          													right: 30,
                          													height: 12,
                          													top: 0,
                          													backgroundColor: "#000"
                        												},
                        												wifiPathIcon: {
                          													right: -325,
                          													top: 19,
                          													height: 5
                        												},
                        												wifiPathIcon2: {
                          													top: 23,
                          													right: -322,
                          													width: 11
                        												},
                        												wifiPathIcon3: {
                          													top: 27,
                          													right: -319,
                          													width: 5
                        												},
                        												iconMobileSignal: {
                          													right: 52,
                          													width: 18,
                          													height: 12,
                          													top: 0,
                          													position: "absolute"
                        												},
                        												leftSide: {
                          													marginLeft: -170,
                          													top: 15
                        												},
                        												statusbarTime: {
                          													marginLeft: -27,
                          													borderRadius: 24,
                          													top: 0
                        												},
                        												text: {
                          													top: 1,
                          													left: 0,
                          													letterSpacing: -0.5,
                          													fontFamily: "SF Pro Text",
                          													color: "#000",
                          													height: 20,
                          													textAlign: "center",
                          													lineHeight: 20,
                          													fontSize: 15,
                          													width: 54,
                          													fontWeight: "600",
                          													position: "absolute"
                        												},
                        												frameParent: {
                          													top: 68,
                          													left: 16,
                          													gap: 294,
                          													width: 358,
                          													position: "absolute"
                        												},
                        												frameGroup: {
                          													gap: 24,
                          													alignSelf: "stretch"
                        												},
                        												logomarkParent: {
                          													justifyContent: "space-between",
                          													alignItems: "center",
                          													gap: 20,
                          													flexDirection: "row"
                        												},
                        												logomark: {
                          													width: 48,
                          													borderRadius: 4,
                          													backgroundColor: "#003b73",
                          													padding: 12,
                          													justifyContent: "center"
                        												},
                        												md: {
                          													color: "#fdfdff",
                          													textAlign: "center"
                        												},
                        												language: {
                          													backgroundColor: "#f3f4f6",
                          													paddingLeft: 16,
                          													paddingTop: 4,
                          													paddingRight: 8,
                          													flexDirection: "row",
                          													paddingBottom: 4,
                          													borderRadius: 100,
                          													overflow: "hidden"
                        												},
                        												en: {
                          													fontFamily: "Urbanist-SemiBold",
                          													color: "#333",
                          													lineHeight: 24,
                          													fontSize: 14,
                          													textAlign: "center"
                        												},
                        												arrowDropUpIcon: {
                          													height: 19,
                          													width: 19
                        												},
                        												frameContainer: {
                          													gap: 12,
                          													alignSelf: "stretch"
                        												},
                        												whatsYourMobileNumberParent: {
                          													gap: 4,
                          													alignSelf: "stretch"
                        												},
                        												whatsYourMobile: {
                          													textAlign: "left",
                          													fontFamily: "Urbanist-Bold",
                          													fontWeight: "700",
                          													lineHeight: 32,
                          													letterSpacing: -0.5,
                          													fontSize: 24,
                          													alignSelf: "stretch"
                        												},
                        												wellSendAn: {
                          													textAlign: "left",
                          													lineHeight: 24,
                          													fontSize: 15
                        												},
                        												inputTextfield: {
                          													borderColor: "#13131a",
                          													paddingHorizontal: 16,
                          													paddingVertical: 12,
                          													borderWidth: 1,
                          													gap: 8,
                          													borderStyle: "solid",
                          													height: 48,
                          													borderRadius: 100,
                          													overflow: "hidden",
                          													width: 358
                        												},
                        												frameChild: {
                          													width: 20,
                          													height: 20
                        												},
                        												text2: {
                          													textAlign: "left",
                          													color: "#13131a"
                        												},
                        												enterYourMobile: {
                          													width: 251,
                          													color: "#9ca3af",
                          													fontFamily: "Urbanist-Medium",
                          													fontWeight: "500",
                          													fontSize: 16,
                          													lineHeight: 24
                        												},
                        												buttonComponents: {
                          													backgroundColor: "#e6ebf1",
                          													padding: 16,
                          													justifyContent: "center",
                          													alignSelf: "stretch",
                          													borderRadius: 100,
                          													overflow: "hidden"
                        												},
                        												button: {
                          													color: "#8aa5bf",
                          													textAlign: "center"
                        												},
                        												lineParent: {
                          													alignSelf: "stretch"
                        												},
                        												frameItem: {
                          													height: 1,
                          													borderColor: "#9ca3af",
                          													borderTopWidth: 1,
                          													borderStyle: "solid",
                          													flex: 1
                        												},
                        												orWrapper: {
                          													width: 13
                        												},
                        												or: {
                          													color: "#9ca3af",
                          													fontFamily: "Urbanist-Regular",
                          													fontSize: 14,
                          													alignSelf: "stretch",
                          													textAlign: "center",
                          													lineHeight: 20
                        												},
                        												ctaCall: {
                          													backgroundColor: "#f5f5f5",
                          													borderColor: "#bdbdbd",
                          													paddingHorizontal: 20,
                          													paddingVertical: 12,
                          													borderWidth: 1,
                          													gap: 8,
                          													borderStyle: "solid",
                          													height: 48,
                          													borderRadius: 100,
                          													overflow: "hidden",
                          													justifyContent: "center",
                          													alignSelf: "stretch"
                        												},
                        												whatsapp1Icon: {
                          													height: 24,
                          													width: 24
                        												},
                        												byRegisteringYou: {
                          													height: 60,
                          													color: "#374151",
                          													fontFamily: "Urbanist-Regular",
                          													alignSelf: "stretch",
                          													fontSize: 14,
                          													lineHeight: 20
                        												}
                      											});
                      											
                      											export default Login;
                      											