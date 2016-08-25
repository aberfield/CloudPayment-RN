//
//  TestViewController.m
//  CloudPaymentProject
//
//  Created by aberfield on 16/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestViewController.h"

@interface TestViewController ()

@end

@implementation TestViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor greenColor];
  UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
  btn.backgroundColor = [UIColor blueColor];
  btn.frame = CGRectMake(140, 200, 40, 20);
  [btn addTarget:self action:@selector(clickBtn) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:btn];
  
}

- (void)clickBtn
{
  NSLog(@"asddd");
  [self dismissViewControllerAnimated:YES completion:^{
    NSLog(@"111");
  }];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
}


@end
