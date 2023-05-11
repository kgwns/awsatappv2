import React, { useEffect, useRef, useState } from 'react';
import { ScreenContainer } from '..';
import { dateTimeAgo, horizontalAndTop, isNonEmptyArray, isTab, screenHeight } from 'src/shared/utils';
import { useCartoon } from 'src/hooks';
import { CartoonDataType, CartoonListBodyType } from 'src/redux/cartoon/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { LoadingState } from 'src/components/atoms';
import { ImageFullView } from 'src/components/molecules/imageFullView/ImageFullView';
import { Image } from 'src/components/atoms/image/Image'
import { ImageResize } from 'src/shared/styles/text-styles';
import { ArticleWithOutImage } from 'src/components/molecules';
import { fonts } from 'src/shared/styles/fonts';
import { TimeIcon } from 'src/shared/utils/utilities';

const CARTOON_ITEMS_PER_PAGE = 10;

export const CartoonList = () => {
    const [page, setPage] = useState<number>(0);
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const [showFullScreen, setFullScreen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<CartoonDataType | null>(null);
    const [listData, setData] = useState<CartoonDataType[]>([]);
    const initialRef = useRef<boolean>(true);
    const { params } = useRoute<RouteProp<any>>();
    const { isLoading, cartoonList, hasNextPage, getCartoonListInfo } =
        useCartoon();
    const title = (params && params.title) ? params.title : '';
    const styles = useThemeAwareObject(cartoonListStyle);

    useEffect(() => {
        getCartoonList();
        return (() => {
            setData([]);
            setPage(0);
        })
    }, []);

    useEffect(() => {
        if (initialRef.current) {
            initialRef.current = false;
        } else {
            setInitialLoader(false);
            if (isNonEmptyArray(cartoonList)) {
                setData((data: CartoonDataType[]) => [...data, ...cartoonList]);
            }
        }
    }, [cartoonList]);

    useEffect(() => {
        if (page !== 0) {
            getCartoonList();
        }
    }, [page]);

    const getCartoonList = () => {
        const payload: CartoonListBodyType = {
            page: page,
            items_per_page: CARTOON_ITEMS_PER_PAGE,
        };
        getCartoonListInfo(payload);
    };

    const loadMoreData = () => {
        if (!isLoading && hasNextPage) {
            setPage(page + 1);
        }
    };

    const renderLoader = () => (
        <View style={styles.initialLoaderStyle}>
            <LoadingState />
        </View>
    );


    const renderFooterComponent = () => {
        if (isNonEmptyArray(listData)) {
            return (
                <View style={styles.loaderStyle}>
                    {isLoading && <LoadingState />}
                </View>
            );
        }
        return null;
    };

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        const timeFormat = dateTimeAgo(item.created);
        const footerData = {
            rightTitle: timeFormat.time,
            rightTitleStyle: {
                fontFamily: fonts.Effra_Arbc_Regular,
                lineHeight: 40,
                fontSize: 12,
            },
            rightIcon: () => TimeIcon(timeFormat.icon),
            rightTitleColor: styles.footerTitleColor.color,
            hideBookmark: true,
        };
        return (
            <TouchableOpacity onPress={() => { setSelectedItem(item); setFullScreen(true) }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            url={item.image}
                            resizeMode={ImageResize.COVER}
                            fallback
                        />
                    </View>
                    <View
                        style={[
                            styles.contentContainer,
                        ]}>
                        <ArticleWithOutImage
                            title={item.title}
                            showDivider={false}
                            isBookmarked={false}
                            showFooterTitle={true}
                            titleStyle={styles.titleStyle}
                            footerContainerStyle={styles.footerContainerStyle}
                            footerInfo={footerData}
                            viewStyle={styles.footerContainerStyle}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer edge={horizontalAndTop} showHeader headerTitle={title} textStyle={styles.textStyle}>
            {initialLoader && renderLoader()}
            {showFullScreen && selectedItem && <ImageFullView
                uri={selectedItem.image}
                onClose={() => setFullScreen(!showFullScreen)}
            />}
            <FlatList
                testID="cartoon_list"
                scrollEventThrottle={16}
                data={listData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooterComponent}
                contentContainerStyle={styles.listStyle}
            />
        </ScreenContainer>
    );
};

const cartoonListStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        listStyle: {
            paddingHorizontal: 20,
        },
        loaderStyle: {
            width: '100%',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
        },
        initialLoaderStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: screenHeight / 4,
        },
        container: {
            marginTop: 10,
            width: '100%',
        },
        imageContainer: {
            aspectRatio: 4 / 3,
            marginTop: 30,
            width: '100%',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        contentContainer: {
            paddingTop: isTab ? 15 : 10,
        },
        titleContainerStyle: {
            marginTop: 10,
        },
        titleStyle: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: isTab ? 20 : 16,
            lineHeight: isTab ? 32 : 28,
            textAlign: 'left',
            paddingVertical: 8,
            color: theme.primaryBlack,
        },
        textStyle: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: isTab ? 20 : 16,
            lineHeight: isTab ? 32 : 28,
            color: theme.primaryBlack,
        },
        footerTitleColor: {
            color: theme.footerTextColor
        },
        footerContainerStyle: {
            paddingTop: 0,
            paddingBottom: 0,
        }
    });
}
