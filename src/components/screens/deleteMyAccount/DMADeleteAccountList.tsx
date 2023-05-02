import React from "react"
import { StyleSheet, View } from "react-native"
import { CustomThemeType } from "src/shared/styles/colors"
import { useThemeAwareObject } from "src/shared/styles/useThemeAware"
import { ScreenContainer } from "../ScreenContainer/ScreenContainer"
import { ButtonList, Divider } from "src/components/atoms"
import { ImagesName } from "src/shared/styles/images"
import { horizontalEdge } from "src/shared/utils/utilities"

export const DMADeleteAccountList = () => {
    const styles = useThemeAwareObject(createStyles);
    const list = ['data1', 'data2', 'data3', 'data4', 'data5'];
    const handleOnPress = () => {
    }
    return (
        <ScreenContainer
        edge={horizontalEdge}
        backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
            {list.map((listData) => (
                <View style = {{marginHorizontal:30}}>
                    <ButtonList title = {listData} 
                        containerStyle = {styles.containerStyle} 
                        titleStyle = {styles.titleStyle} 
                        iconName = {ImagesName.leftArrowIcon}
                        onPress={handleOnPress}
                    />
                    <Divider />
                </View>
            ))}
        </ScreenContainer>
    )
}

const createStyles = (theme: CustomThemeType) => (
    StyleSheet.create({
        screenBackgroundColor: {
            backgroundColor: theme.profileBackground
        },
        containerStyle: {
            marginVertical: 6,
        },
        titleStyle: {
            color: theme.primaryBlack,
            width: '75%'
        },
    })
)
    

