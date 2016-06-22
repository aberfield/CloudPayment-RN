//
//  TXAPIModel.m
//  TongxingSdk
//
//  Created by 刘芳友 on 16/2/23.
//  Copyright © 2016年 NNK. All rights reserved.
//

#import "TXAPIModel.h"
#import <objc/runtime.h>

@implementation BaseModel

- (instancetype)initWithDic:(NSDictionary*)modelDic
{
    self = [super init];
    if (self) {
        
    }
    return self;
}

@end

@implementation MerInfoModel

- (instancetype)initWithDic:(NSDictionary *)modelDic
{
    self = [super initWithDic:modelDic];
    if (self) {
        self.merchId = modelDic[@"merchId"];
        self.userId = modelDic[@"userId"];
        self.payType = modelDic[@"payType"];
    }
    return self;
}

@end


@implementation OrderInfoModel
- (instancetype)initWithDic:(NSDictionary *)modelDic
{
    self = [super initWithDic:modelDic];
    if (self) {
        self.payType = modelDic[@"payType"];
        self.userPayAmount = modelDic[@"userPayAmount"];
        self.orderId = modelDic[@"orderId"];
        self.phone = modelDic[@"phone"];
        self.sign = modelDic[@"sign"];
        self.amount = [modelDic[@"amount"] integerValue];
        self.orderType = modelDic[@"orderType"];
        self.merPayAmount = modelDic[@"merPayAmount"];
    }
    return self;
}

@end

@implementation OrderResultModel

- (instancetype)initWithDic:(NSDictionary *)modelDic
{
    self = [super initWithDic:modelDic];
    if (self) {
        self.orderInfoModel = modelDic[@"orderInfoModel"];
        self.payResult = [modelDic[@"payResult"] integerValue];
        self.merchId = modelDic[@"merchId"];
    }
    return self;
}

@end

@implementation BerbonInfoModel

- (instancetype)initWithDic:(NSDictionary *)modelDic
{
    self = [super initWithDic:modelDic];
    if (self) {
        self.wxShareUrl = modelDic[@"wxShareUrl"];
        self.wxShareTitle = modelDic[@"wxShareTitle"];
        self.wxShareDescription = modelDic[@"wxShareDescription"];
        self.wxSharePicUrl = modelDic[@"wxSharePicUrl"];
    }
    
    return self;
}

@end

@implementation TXAPiModel


@end






//
////通过运行时获取当前对象属性名称，以数字形式返回
//- (NSArray*)allPropertyNames
//{
//    NSMutableArray *allNames = [[NSMutableArray alloc] init];
//    unsigned int propertyCount = 0;
//    
//    objc_property_t *propertys = class_copyPropertyList([self class], &propertyCount);
//    
//    for (NSInteger i = 0 ; i < propertyCount; i ++) {
//        objc_property_t property = propertys[i];
//        const char *propertyName = property_getName(property);
//        [allNames addObject:[NSString stringWithUTF8String:propertyName]];
//    }
//    
//    free(propertys);
//    return allNames;
//}
//
//- (SEL)creatGetterWithPropertyName:(NSString*)propertyName
//{
//    //返回get方法，OC中的get方法就是属性的本身
//    return NSSelectorFromString(propertyName);
//}
//
//- (void)displayCurrentModelProperty
//{
//    NSArray *array = [self allPropertyNames];
//    
//    NSMutableString *resultString = [NSMutableString string];
//    for (NSInteger i = 0; i < array.count; i++) {
//        SEL getSel = [self creatGetterWithPropertyName:array[i]];
//        if ([self respondsToSelector:getSel]) {
//            NSMethodSignature *signature = [self methodSignatureForSelector:getSel];
//            NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
//            [invocation setTarget:self];
//            [invocation setSelector:getSel];
//            
//            NSObject *__unsafe_unretained returnValue = nil;
//            
//            [invocation invoke];
//            
//            [invocation getReturnValue:&returnValue];
//            [resultString appendFormat:@"%@\n",returnValue];
//            
//        }
//    }
//    NSLog(@"%@",resultString);
//}
