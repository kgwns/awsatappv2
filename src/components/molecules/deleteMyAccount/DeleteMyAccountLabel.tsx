import React from "react"
import { StyleSheet, TextStyle } from "react-native";
import { CustomThemeType } from "src/shared/styles/colors";
import { useThemeAwareObject } from "src/shared/styles/useThemeAware";
import { fonts } from "src/shared/styles/fonts";
import { Label } from "src/components/atoms";
import { isTab } from "src/shared/utils";

type DeleteMyAccountLabelProps = {
    title: string;
    textStyle?: TextStyle
}

export const DeleteMyAccountLabel = ({
    title,
    textStyle,
}: DeleteMyAccountLabelProps) => {

    const styles = useThemeAwareObject(deleteMyAccountLabelStyle)

    return (
        <>
            <Label style={[styles.titleStyle, textStyle]} children={title} />
        </>
    )
}

const deleteMyAccountLabelStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        titleStyle: {
            fontSize: isTab ? 26 : 22,
            fontFamily: fonts.AwsatDigitalV2_Bold,
            lineHeight: isTab ? 48 : 38,
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.primary,
            marginTop: 30,
        },
    })
)
