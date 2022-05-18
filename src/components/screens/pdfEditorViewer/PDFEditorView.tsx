import { requireNativeComponent } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { horizontalAndTop } from 'src/shared/utils';

const NativeView = requireNativeComponent('PDFArchivesRootViewControllerOne');

type PDFEditorViewProps = {
    route: any
}

export const PDFEditorView = ({
    route
}: PDFEditorViewProps) => {
    const selectedPDF = route.params.selectedPDF;

    return (
        <ScreenContainer edge={horizontalAndTop} showHeader={true}
            headerTitle={selectedPDF.title}>
            <NativeView style={{ flex: 1 }} selectedPDF={selectedPDF} />
        </ScreenContainer>
    )
}