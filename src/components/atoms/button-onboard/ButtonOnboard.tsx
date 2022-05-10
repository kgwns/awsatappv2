import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { colors } from 'src/shared/styles/colors';
import { normalize } from 'src/shared/utils/dimensions';
import { fonts } from 'src/shared/styles/fonts';

interface ButtonOnboardProps {
    title: string;
    onPress?: () => void;
    titleStyle?: StyleProp<TextStyle>;
}

export const ButtonOnboard = (props: ButtonOnboardProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={styles.container}>
                <Text style={StyleSheet.flatten([styles.titleStyle, props.titleStyle])}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: normalize(291),
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 29,
        backgroundColor: colors.greenishBlue
    },
    titleStyle: {
        fontFamily: fonts.Almarai_Bold,
        fontSize: 13,
        textAlign: 'center',
        color: colors.white,
        lineHeight: 25,
    }
});
