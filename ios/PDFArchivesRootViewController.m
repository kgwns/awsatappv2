//
//  PDFArchivesRootViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "PDFArchivesRootViewController.h"
#import "Awsatapp-Swift.h"


@implementation PDFArchivesRootViewController


RCT_EXPORT_MODULE()

- (UIView *)view {
  PDFArchiveViewController *vc = [PDFArchiveViewController new];
  return  vc.view;
}

@end
