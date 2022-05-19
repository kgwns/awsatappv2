//
//  PDFArchivesRootViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "RNPDFViewerManager.h"
#import "Awsatapp-Swift.h"

@implementation RNPDFViewerManager

RCT_EXPORT_MODULE(RNPDFViewer)

- (UIView *)view {
    return [PDFViewer new];
}

RCT_EXPORT_VIEW_PROPERTY(selectedPDF, NSDictionary)

@end
