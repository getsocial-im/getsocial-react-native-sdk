 //
 // Created by Orest Savchak on 6/2/17.
 //

 #import "GetSocialSuggestedFriend+Json.h"
 #import "GetSocialPublicUser+Json.h"


 @implementation GetSocialSuggestedFriend (Json)

 - (NSMutableDictionary *)toJsonDictionary
 {
     NSMutableDictionary *dictionary = [super toJsonDictionary];
     dictionary[@"MUTUAL_FRIENDS_COUNT"] = @(self.mutualFriendsCount);
     return dictionary;
 }

 @end
