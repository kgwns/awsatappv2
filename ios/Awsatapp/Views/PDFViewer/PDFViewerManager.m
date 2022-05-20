//
//  PDFViewerManager.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "PDFViewerManager.h"
#import "Awsatapp-Swift.h"

@implementation PDFViewerManager

RCT_EXPORT_MODULE(RNPDFViewer)

- (UIView *)view {
    return [PDFViewer new];
}

RCT_EXPORT_VIEW_PROPERTY(selectedPDF, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(selectedLayoutTypeInfo, NSString)

@end
