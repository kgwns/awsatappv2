//
//  PDFArchivesRootViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 17/05/22.
//

#import "PDFArchivesRootViewControllerOne.h"
#import "Awsatapp-Swift.h"


@implementation PDFArchivesRootViewControllerOne

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [PDFEditionViewer new];
}

RCT_EXPORT_VIEW_PROPERTY(selectedPDF, NSDictionary)

@end
