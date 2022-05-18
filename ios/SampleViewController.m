//
//  SampleViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

#import "SampleViewController.h"
#import "Awsatapp-Swift.h"


@implementation SampleViewController

+ (BOOL)requiresMainQueueSetup {
    return true;
}

RCT_EXPORT_MODULE()

-(UIView *) view {
    return [TodayTabView new];
}

RCT_EXPORT_VIEW_PROPERTY(onItemClick, RCTBubblingEventBlock)

@end
