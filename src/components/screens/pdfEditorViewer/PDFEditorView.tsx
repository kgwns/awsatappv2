import React from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { horizontalAndTop } from 'src/shared/utils';
import { getRequiredNativeComponent } from 'src/shared/utils/NativeComponent';
import { StyleSheet } from 'react-native';

const RNPDFViewer = getRequiredNativeComponent('RNPDFViewer');

type PDFEditorViewProps = {
    route: any
}

export const PDFEditorView = ({route}: PDFEditorViewProps) => {
    const selectedPDF = route.params.selectedPDF;

    return (
        <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={selectedPDF.title}>
            <RNPDFViewer style={style.container} selectedPDF={selectedPDF} />
        </ScreenContainer>
    )
}
const style = StyleSheet.create({
    container: {
     flex: 1 
    }
})
