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
    return [PDFArchiveView new];
}

RCT_EXPORT_VIEW_PROPERTY(onItemClick, RCTBubblingEventBlock)

@end
