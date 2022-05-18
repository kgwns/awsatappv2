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
  PDFArchiveViewController *vc = [PDFArchiveViewController new];
  return  vc.view;
}

RCT_EXPORT_VIEW_PROPERTY(onItemClicked, RCTBubblingEventBlock)

@end
