import React, { useEffect } from "react"
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native"
import { CustomThemeType } from "src/shared/styles/colors"
import { useThemeAwareObject } from "src/shared/styles/useThemeAware"
import { ScreenContainer } from "../ScreenContainer/ScreenContainer"
import { Divider, Label } from "src/components/atoms"
import { ImagesName } from "src/shared/styles/images"
import { horizontalEdge } from "src/shared/utils/utilities"
import { isTab, normalize, screenWidth } from "src/shared/utils"
import { DeleteMyAccountLabel } from "src/components/molecules"
import { ScreensConstants, TranslateConstants, TranslateKey } from "src/constants/Constants"
import { useNavigation } from "@react-navigation/native"
import { getSvgImages } from "src/shared/styles/svgImages"
import { fonts } from "src/shared/styles/fonts"
import { useDeleteMyAccount } from "src/hooks"


export type DMAOptionsListType = {
    id: number;
    ar_option: string;
    en_option: string;
}

export const DMAOptionsListScreen = () => {

    const {
        isLoading,
        dmaOptionsListData,
        fetchDMAOptionsListRequest
    } = useDeleteMyAccount();

    useEffect(() => {
        fetchDMAOptionsListRequest();
    }, []);

    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const TITLE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_LIST_TITLE });

    const onPressToNavigate = (item: DMAOptionsListType) => {
        navigation.navigate(ScreensConstants.DMA_FEED_BACK_SCREEN, { optionId: item.id } as never)
    }

    const itemSeparator = () => <Divider style={styles.divider} />;

    const ArrowIcon = () => (
        <>
            {getSvgImages({
                name: ImagesName.arrowLeftDimGrey,
                size: normalize(12),
            })}
        </>
    )

    const renderItem: ListRenderItem<DMAOptionsListType> = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} key={`DMAOption-${index}`} onPress={() => onPressToNavigate(item)}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemLeftContainer}>
                        <Label
                            children={item.ar_option}
                            style={styles.optionLabel}
                            testID={"optionLabelId"}
                        />
                    </View>
                    <ArrowIcon />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer
            edge={horizontalEdge}
            backgroundColor={styles.screenBackgroundColor?.backgroundColor}
            isLoading={isLoading}>
            <View style={styles.listScreenContainer}>
                <DeleteMyAccountLabel title={TITLE} />
                <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    style={styles.listContainer}
                    data={dmaOptionsListData}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={itemSeparator}
                    ListFooterComponent={itemSeparator}
                    bounces={false}
                />
            </View>
        </ScreenContainer>
    )
}

const createStyles = (theme: CustomThemeType) => (
    StyleSheet.create({
        listScreenContainer: {
            flex: 1,
        },
        listContainer: {
            flex: 1,
            marginTop: 25,
            marginHorizontal: isTab ? '6%' : 0.06 * screenWidth
        },
        screenBackgroundColor: {
            backgroundColor: theme.profileBackground
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: normalize(20),
        },
        itemLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        divider: {
            height: 1,
            backgroundColor: theme.dividerColor,
            marginTop: 0,
        },
        optionLabel: {
            fontSize: isTab ? 28 : 18,
            lineHeight: isTab ? 42 : 32,
            fontFamily: fonts.AwsatDigital_Bold,
            color: theme.primaryBlack
        }
    })
)


