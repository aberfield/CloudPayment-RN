
//
//  common.h
//  TongxingSdk
//
//  Created by 刘芳友 on 16/2/18.
//  Copyright © 2016年 NNK. All rights reserved.
//

#ifndef common_h
#define common_h


#endif /* common_h */


#import "StringHelper.h"


//static NSString *Mertoken = @"007ka";

//#define merId @"1"
#define merId @"weiBank428"
//#define merId @"1100000131"
//#define merId @"1888888024"

#define TokenStr            @"TokenStr"
#define TokenUpdateState    @"TokenUpdateState"
#define lastAccount         @"account"
#define lastPhone           @"phone"




//将int类型转化为string
#define intToString(x)   [NSString stringWithFormat:@"%d",x]
#define integerToString(x)   [NSString stringWithFormat:@"%ld",x]
#define floatToString(x) [NSString stringWithFormat:@"%0.2f",x]
//将string类型转换为int
#define stringToInt(str) [str intValue]

#define Color(r,g,b,a) [UIColor colorWithRed:(r/255.0) green:(g/255.0) blue:(b/255.0) alpha:a]
#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]


#define SCREEN_WIDTH ([[UIScreen mainScreen]bounds].size.width)
#define SCREEN_HEIGHT ([[UIScreen mainScreen]bounds].size.height)
#define SCREEN_WITHOUT_STATUS_HEIGHT (SCREEN_HEIGHT - [[UIApplication sharedApplication] statusBarFrame].size.height)

/*! @brief 错误码
 *
 */




