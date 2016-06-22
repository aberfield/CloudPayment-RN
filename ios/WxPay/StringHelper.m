//
//  StringHelper.m
//  inholy
//
//  Created by fang.you on 13-5-16.
//  Copyright (c) 2013年 inholy. All rights reserved.
//

#import "StringHelper.h"
#import <CommonCrypto/CommonDigest.h>
#import "common.h"

#define DEFAULT_DATE_FORMAT @"yyyy-MM-dd HH:mm:ss"

@implementation StringHelper

+(BOOL)isNilOrEmpty:(NSString*)value
{
    if(value != nil && ![value isKindOfClass:[NSNull class]])
    {
        return value.length == 0;
    }

    return YES;
}

+ (NSInteger)stringFromHexStr:(NSString*)str
{
    NSString *hexStr = [NSString string];
    for (NSInteger i =  str.length/2-1; i >= 0 ; i--) {
        hexStr = [hexStr stringByAppendingString:[str substringWithRange:NSMakeRange(i*2, 2)]];
        
    }
    
    //先以16为参数告诉strtoul字符串参数表示16进制数字，然后使用0x%X转为数字类型
    unsigned long red = strtoull([hexStr UTF8String],0,16);
    return red;
}

+ (NSString*)timeStamp
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    dateFormatter.dateFormat = @"YYYY-MM-dd hh:mm:ss";
    NSLog(@"%f",[[NSDate date] timeIntervalSince1970]);
    NSTimeInterval timeStamp = [[NSDate date] timeIntervalSince1970]*1000;
   
    return [NSString stringWithFormat:@"%.0f",timeStamp];
}


+(NSString *)md5:(NSString *)str
{
    const char *cStr = [str UTF8String];
    unsigned char digest[CC_MD5_DIGEST_LENGTH];
    CC_MD5( cStr, (unsigned int)strlen(cStr), digest );
    
    NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02X", digest[i]];
    
    return output;
}

//转义字符
+ (NSString*)replaceSpecialChar:(NSString*)baseStr
{
    NSString *slashStr = [baseStr stringByReplacingOccurrencesOfString:@"\\" withString:@"\\\\"];
    NSString *nStr = [slashStr stringByReplacingOccurrencesOfString:@"\n" withString:@"\\\\n"];
    NSString *rStr = [nStr stringByReplacingOccurrencesOfString:@"\r" withString:@"\\\\r"];
    NSString *pStr = [rStr stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"];
    NSString *aStr = [pStr stringByReplacingOccurrencesOfString:@"&" withString:@"\\&"];
    NSString *tStr = [aStr stringByReplacingOccurrencesOfString:@"\t" withString:@"\\\\t"];
    NSString *bStr = [tStr stringByReplacingOccurrencesOfString:@"\b" withString:@"\\\\b"];
    NSString *fStr = [bStr stringByReplacingOccurrencesOfString:@"\f" withString:@"\\\\f"];
    return fStr;
}

//创建package签名
//+(NSString*)createMd5Sign:(NSMutableDictionary*)dict
//{
//    NSMutableString *contentString  =[NSMutableString string];
//    
//    contentString = [NSMutableString stringWithFormat:@"MerId=%@&PayType=%@&UserId=%@&Timestamp=%@&MerToken=%@",dict[@"MerId"],dict[@"PayType"],dict[@"UserId"],dict[@"Timestamp"],Mertoken];
//    
//    //得到MD5 sign签名
//    NSString *md5Sign = [StringHelper md5:contentString];
//    
//    //输出Debug Info
//    
//    return [md5Sign lowercaseString];
//}

@end

@implementation NSString(Extend)

- (NSString*)trim{
    return [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
}


- (BOOL)contains:(NSString*)subString
{
    if([StringHelper isNilOrEmpty:subString]) return NO;
    
    NSRange range = [self rangeOfString:subString];
    
    return range.location != NSNotFound;
}

- (BOOL)isUrl{
    return [self hasPrefix:@"http://"] || [self hasPrefix:@"https://"] || [self hasPrefix:@"local:"];
}

- (NSString*)addUrlHeads
{
    if (![self isUrl]) {
        NSString *urlStr = [NSString stringWithFormat:@"http://%@",self];
        return urlStr;
    }
    return self;
}

- (NSInteger)bytesCount{
    if([StringHelper isNilOrEmpty:self]) return 0;
    
    int count = 0;
    char *p = (char*)[self cStringUsingEncoding:NSUnicodeStringEncoding];
    for ( NSInteger i=0 ; i<[self lengthOfBytesUsingEncoding:NSUnicodeStringEncoding] ;i++) {
        if (*p) count++;
        
        p++;
    }
    return count;
}

- (NSDate*)dateWithFormat:(NSString*)format
{
    if([StringHelper isNilOrEmpty:format]) format = DEFAULT_DATE_FORMAT;
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setTimeZone:[NSTimeZone localTimeZone]];
    [formatter setDateFormat:format];
    
    return [formatter dateFromString:self];
}

- (NSString*)md5String{
    const char *cStr = [self UTF8String];
    unsigned char result[16];
    CC_MD5(cStr, (unsigned int)strlen(cStr), result );
    NSMutableString *md5String = [NSMutableString string];
    for(NSInteger i = 0; i < 16; i++)
    {
        [md5String appendFormat:@"%X2",result[i]];
    }
    
    return md5String;
}



- (BOOL)isNumber
{
    NSString *numberRegex = @"^[0-9]*$";
    NSPredicate *numberTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",numberRegex];
    return  [numberTest evaluateWithObject:self];
}

- (NSString*)removeLineBreak
{
    NSInteger x = self.length;
    NSRange range;
    range.location = x-1;
    range.length = 1;
    NSString *str = [self mutableCopy];
    while ([[str substringWithRange:range] isEqualToString:@"\n"]) {
        str = [str substringToIndex:x - 1];
        x = str.length;
        range.location = x-1;
        range.length = 1;
    }
       return str;
}

- (NSString*)removeSpace
{
    NSString *str = [self stringByReplacingOccurrencesOfString:@" " withString:@""];
    return str;
}


- (NSString*)removeCharacter
{
    NSString *str = self;
    for (NSInteger i = 0; i < self.length; i++) {
        NSString *charStr = [self substringWithRange:NSMakeRange(i, 1)];
        if (!([charStr isNumber]|[charStr isEqualToString:@" "])) {
            str = [str stringByReplacingOccurrencesOfString:charStr withString:@""];
        }
    }
    return str;
}

-(NSString *)URLEncodedString;
{
//    NSString *encodeString = (NSString *)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault,(CFStringRef)self,NULL,(CFStringRef)@"!$&\'()*+,-./:;=?@_~%#[]",kCFStringEncodingUTF8));
    NSString *encodeString = [self stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    return encodeString;
}

-(NSString *)URLDecodedString
{
    NSString *decodedString=(__bridge_transfer NSString *)CFURLCreateStringByReplacingPercentEscapesUsingEncoding(NULL, (__bridge CFStringRef)self, CFSTR(""), CFStringConvertNSStringEncodingToEncoding(NSUTF8StringEncoding));
    
    return decodedString;
}



@end
