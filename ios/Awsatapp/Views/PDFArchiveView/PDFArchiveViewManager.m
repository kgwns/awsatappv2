//
//  PDFArchiveViewManager.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "PDFArchiveViewManager.h"
#import "Awsatapp-Swift.h"

@implementation PDFArchiveViewManager

+ (BOOL)requiresMainQueueSetup {
    return true;
}

RCT_EXPORT_MODULE(RNPDFArchiveView)

- (UIView *)view {
    return [[PDFArchiveView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(onItemClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(selectedLayoutTypeInfo, NSString)

@end
