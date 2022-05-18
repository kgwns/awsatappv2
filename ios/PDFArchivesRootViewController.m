//
//  PDFArchivesRootViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "PDFArchivesRootViewController.h"
#import "Awsatapp-Swift.h"


@implementation PDFArchivesRootViewController

+ (BOOL)requiresMainQueueSetup {
    return true;
}

RCT_EXPORT_MODULE()

- (UIView *)view {
  PDFArchiveView *view = [PDFArchiveView new];
  return view;
}

RCT_EXPORT_VIEW_PROPERTY(onItemClick, RCTBubblingEventBlock)

@end
