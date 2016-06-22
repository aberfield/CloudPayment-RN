//
//  StringHelper.h
//  inholy
//
//  Created by fang.you on 13-5-16.
//  Copyright (c) 2013年 inholy. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface StringHelper : NSObject

//判断字符串是否为空值(nil和empty)
+(BOOL)isNilOrEmpty:(NSString*)value;

+ (NSInteger)stringFromHexStr:(NSString*)str;

+(NSString *)md5:(NSString *)str;

//+(NSString*)createMd5Sign:(NSMutableDictionary*)dict;

//获取当前时间戳
+ (NSString*)timeStamp;

@end

//对NSString类进行扩展
@interface NSString(Extend)



//移除字符串首尾的空白
- (NSString*)trim;

//去除空白格
- (NSString*)removeSpace;

//去除非数字字符
- (NSString*)removeCharacter;

//判断某字符串是否包含在本字符串中
- (BOOL)contains:(NSString*)subString;

//是否为url字符串
- (BOOL)isUrl;

- (NSString*)addUrlHeads;

//判断是否为纯数字字符串
- (BOOL)isNumber;

//去除字符串末尾的换行符
- (NSString*)removeLineBreak;

//获取字符串的字节数
- (NSInteger)bytesCount;

//转化为日期类型
- (NSDate*)dateWithFormat:(NSString*)format;

//获取本字符串的md5加密结果
- (NSString*)md5String;

//UrlEncode
-(NSString *)URLEncodedString;

//UrlDecode
-(NSString *)URLDecodedString;





@end
