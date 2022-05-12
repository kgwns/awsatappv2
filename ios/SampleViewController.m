//
//  SampleViewController.m
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

#import "SampleViewController.h"
#import "Awsatapp-Swift.h"


@implementation SampleViewController

RCT_EXPORT_MODULE()

- (UIView *)view {
  DownloadViewController *vc = [DownloadViewController new];
  return  vc.view;
  
  
  
//  ViewController *vc = [ViewController new];
//  return vc.view;
}

@end
