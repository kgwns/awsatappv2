//
//  Strings.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

struct Strings {
    static let userViewControllerTitle              = NSLocalizedString("User", comment: "View title")
    static let searchViewControllerTitle            = NSLocalizedString("Search", comment: "View title")
    static let downloadViewControllerTitle          = NSLocalizedString("Download", comment: "View title")
    static let bookmarksViewControllerTitle         = NSLocalizedString("Bookmarks", comment: "Bookmarks view title")
    static let languageViewControllerTitle          = NSLocalizedString("Language", comment: "Language view title")
    static let settingsViewControllerTItle          = NSLocalizedString("Settings", comment: "Settings view title")
    static let newsArchiveViewControllerTitle       = NSLocalizedString("News Archive", comment: "News Archive view title")
    static let userAccountViewControllerTitle       = NSLocalizedString("User Account", comment: "User Account view title")
    static let favoriteCategoriesVCTitle            = NSLocalizedString("My Settings", comment: "Favorite Categories view title")
    static let accountWelcomeVCTitle                = NSLocalizedString("My Account", comment: "Accoutn welcome view title")
    static let syncContactsVCTitle                  = NSLocalizedString("Follow Friends", comment: "Sync Contacts view title")
    static let onBoardingVCTitle                    = NSLocalizedString("Start", comment: "Onboarding view title")
    
    static let allMyLikesVCTitle                    = NSLocalizedString("Likes", comment: "All my likes view title")
    static let allArticlesCommentedOnVCTitle        = NSLocalizedString("Commented", comment: "All articles commented on view title")

    
    static let searchResultsTitle                   = NSLocalizedString("Search Results", comment: "Search results view title")
    
    static let loginTitle                           = NSLocalizedString("Login", comment: "Login title")
    static let signupTitle                          = NSLocalizedString("Sign Up", comment: "Sign Up")
    static let loginTitleCaps                       = NSLocalizedString("LOGIN", comment: "Login title")
    static let signupTitleCaps                      = NSLocalizedString("SIGN UP", comment: "Sign Up")
    
    static let forceLoginMessage                    = NSLocalizedString("Please login to access this feature", comment: "Force Login Message")
    
    static let followingViewControllerTitle         = NSLocalizedString("Following", comment: "View title")
    static let followersViewControllerTitle         = NSLocalizedString("Followers", comment: "View title")
    
    static let bookmakedViewControllerTitle         = NSLocalizedString("Bookmarked", comment: "View title")
    static let likesViewControllerTitle             = NSLocalizedString("Likes", comment: "View title")
    static let readViewControllerTitle              = NSLocalizedString("Read", comment: "View title")

    static let forgotPasswordViewControllerTitle    = NSLocalizedString("Recover Password", comment: "View title")

    static let userActivity                         = NSLocalizedString("User Activity", comment: "view title")
    
    static let comments                             = NSLocalizedString("Comments", comment: "comments title")
    
    static let newsNearbyTitle                      = NSLocalizedString("What is happening in", comment: "news nearby title")
    
    static let AcceptTitle                          = NSLocalizedString("Accept", comment: "Action title")
    static let continueTitle                        = NSLocalizedString("Continue", comment: "Action title")
    static let gotIt                                = NSLocalizedString("Got it", comment: "Action title")
    static let skip                                 = NSLocalizedString("Skip", comment: "Action title")
    static let skipLogin                            = NSLocalizedString("Skip Login", comment: "Action title")


    static let follow                               = NSLocalizedString("Follow", comment: "Action title")
    static let following                            = NSLocalizedString("Following", comment: "Action title")
    static let followed                             = NSLocalizedString("Followed", comment: "Action title")
    static let unfollowed                           = NSLocalizedString("Unfollowed", comment: "Action title")
    static let unfollow                             = NSLocalizedString("Unfollow", comment: "Action title")
    static let block                                = NSLocalizedString("Block", comment: "Action title")
    
    static let syncContactsConfirmation             = NSLocalizedString("Your personal contact details will be uploaded to our servers to determine if any of your contacts are registered with Asharq Al-awsat", comment: "Action title")
    
    static let unfollowConfirmation                 = NSLocalizedString("Are you sure you want to unfollow %@?", comment: "Action title")

    static let logoutConfirmation                   = NSLocalizedString("Are you sure you want to logout?", comment: "Logout confirmation")
    
    static let myAccountSetting                     = NSLocalizedString("My Account", comment: "Settings entry title")
    static let syncContactsSetting                  = NSLocalizedString("Sync Contacts", comment: "Settings entry title")

    static let useMobileDataSetting                 = NSLocalizedString("Use Mobile Data", comment: "Settings entry title")
    static let pushNotificationsSetting             = NSLocalizedString("Push Notificaitons", comment: "Settings entry title")
    static let automaticDownloadArticle             = NSLocalizedString("Automatically download  new articless", comment: "Settings entry title")
    static let browseOffline                        = NSLocalizedString("Browse Offline", comment: "Settings entry title")
    static let privaySetting                        = NSLocalizedString("Privacy Settings", comment: "Settings entry title")
    static let aboutUsSetting                       = NSLocalizedString("About us", comment: "Settings entry title")
    static let termsOfUseSetting                    = NSLocalizedString("Terms of use", comment: "Settings entry title")
    static let privacyPolicySetting                 = NSLocalizedString("Privacy poilicy", comment: "Settings entry title")
    static let contactUsSetting                     = NSLocalizedString("Contact us", comment: "Settings view title")
    static let playGamesSetting                     = NSLocalizedString("Play Games", comment: "Settings view title")
    static let invertColorsSetting                  = NSLocalizedString("Invert Article Color", comment: "Settings view title")
    static let chosseLanguageSetting                = NSLocalizedString("Choose Language", comment: "Settings view title")
    static let reportBugSetting                     = NSLocalizedString("Report a bug", comment: "Settings view title")
    static let shareAppSetting                      = NSLocalizedString("Share this App", comment: "Settings view title")
    static let reviewAppSettng                      = NSLocalizedString("Review App on App Store", comment: "Settings view title")
    
    static let enablePushSetting                    = NSLocalizedString("Enable Push Notifications", comment: "Settings view title")
    static let newCommentsSetting                   = NSLocalizedString("New Comments", comment: "Settings view title")
    static let newFollowersSetting                  = NSLocalizedString("New Followers", comment: "Settings view title")
    static let newArticlesByFavAuthorSetting        = NSLocalizedString("New articles by favourite author", comment: "Settings view title")
    static let newArticlesByFavCategorySetting      = NSLocalizedString("New articles by favourite category", comment: "Settings view title")
    static let breakingNewsNotificationSetting      = NSLocalizedString("Breaking News", comment: "Settings view title")

    static let letOtherUsersFollowMe                = NSLocalizedString("Let other users follow me", comment: "Settings view title")
    static let shareMyLocationWith                  = NSLocalizedString("Share my location with other users", comment: "Settings view title")
    static let shareWhatIReadWith                   = NSLocalizedString("Share what I read with other users", comment: "Settings view title")
    static let shareWhatILikeWith                   = NSLocalizedString("Share what I like with other users", comment: "Settings view title")
    static let letOtherUsersFollowMyComments        = NSLocalizedString("Let other users follow my comments", comment: "Settings view title")

    static let settingsMenu                         = NSLocalizedString("SETTINGS", comment: "Settings menu")
    static let pdfArchiveMenu                       = NSLocalizedString("PDF ARCHIVE", comment: "Settings menu")
    static let newsArchiveMenu                      = NSLocalizedString("NEWS ARCHIVE", comment: "Settings menu")
    static let myNewsCategorisMenu                  = NSLocalizedString("MY NEWS CATEGORIES", comment: "Settings menu")
    static let newsNearMe                           = NSLocalizedString("NEWS NEAR ME", comment: "Settings menu")
    static let playGames                            = NSLocalizedString("PLAY GAMES", comment: "Settings menu")

    static let myNews                               = NSLocalizedString("MY NEWS", comment: "Tab title")
    static let topStories                           = NSLocalizedString("TOP STORIES", comment: "Tab title")
    static let opinion                              = NSLocalizedString("OPINION", comment: "Tab title")
    static let live                                 = NSLocalizedString("LIVE", comment: "Tab title")
    static let discover                             = NSLocalizedString("DISCOVER", comment: "Tab title")
    static let trending                             = NSLocalizedString("TRENDING", comment: "Tab title")
    static let mostCommented                        = NSLocalizedString("MOST COMMENTED", comment: "Tab title")
    static let mostShared                           = NSLocalizedString("MOST SHARED", comment: "Tab title")
    
    static let issueNumber                          = NSLocalizedString("Issue No.", comment: "title")
    
    static let languageChangeMessage                = NSLocalizedString("Reopen app to change language.", comment: "Alert message")
    static let change                               = NSLocalizedString("Change", comment: "Alert option")
    static let cancel                               = NSLocalizedString("Cancel", comment: "Alert option")
    
    static let recentlyBookmarked                   = NSLocalizedString("recently bookmarked", comment: "User activity title")
    static let recentlyLiked                        = NSLocalizedString("recently liked", comment: "User activity title")
    static let recentlyShared                       = NSLocalizedString("recently shared", comment: "User activity title")
    
    static let loading                              = NSLocalizedString("Loading", comment: "Loading")
    
    static let moreOpinions                         = NSLocalizedString("more opinions", comment: "title")
    
    static let friendsAreReading                    = NSLocalizedString("friends are reading", comment: "title")
    static let friendsLikes                         = NSLocalizedString("friends likes", comment: "title")
    static let friendsComments                      = NSLocalizedString("friends comments", comment: "title")
    
    static let goodMorning                          = NSLocalizedString("Good Morning", comment: "greeting")
    static let goodAfterNoon                        = NSLocalizedString("Good Afternoon", comment: "greeting")
    static let goodEvening                          = NSLocalizedString("Good Evening", comment: "greeting")
    
    static let fieldsRequired                       = NSLocalizedString("Sorry, all fields are required", comment: "alert")
    static let OK                                   = NSLocalizedString("OK", comment: "alert")
    
    static let mobileDataOffAlert                   = NSLocalizedString("Please toggle use mobile data in settings to download", comment: "alert")
    
    static let weHaveFound                          = NSLocalizedString("We have found", comment: "seach result text")
    static let articlesContaining                   = NSLocalizedString("articles containing the words", comment: "seach result text")
    
    static let subscribedToAuthor                   = NSLocalizedString("Subscribed to author", comment: "alert text")
    static let unSubscribedToAuthor                 = NSLocalizedString("UnSubscribed to author", comment: "alert text")
    
    static let latestArticles                       = NSLocalizedString("latest articles", comment: "Channel title")
    static let suggestedToYou                       = NSLocalizedString("suggested to you", comment: "Channel title")
    static let readMore                             = NSLocalizedString("read more", comment: "Channel title")
    static let opinionSmall                         = NSLocalizedString("opinion", comment: "Channel title")
    static let editorsPick                          = NSLocalizedString("editor's pick", comment: "Channel title")
    static let varieties                            = NSLocalizedString("varieties", comment: "Channel title")
    static let multimedia                           = NSLocalizedString("multimedia", comment: "Channel title")
    static let moreNews                             = NSLocalizedString("more news", comment: "Channel title")
    
    static let relatedNews                          = NSLocalizedString("related news", comment: "Channel title")
    static let moreFromTheseAuthors                 = NSLocalizedString("more from these authors", comment: "Channel title")
    
    static let photoGalleryTitle                    = NSLocalizedString("photo gallery", comment: "Channel title")

    
    static let typeYourComment                      = NSLocalizedString("Type your comment...", comment: "Place holder text")
    static let allCommentsVCTitle                   = NSLocalizedString("All Comments", comment: "View title")
    static let commentWasSent                       = NSLocalizedString("Comment Submitted", comment: "Alert title")
    
    static let favoriteCategoriesLimitAlert         = NSLocalizedString("Please choose minimum of three, maximum 10 categories", comment: "Alert title")
    
    
    static let download                             = NSLocalizedString("Download", comment: "Button title")
    static let downloading                          = NSLocalizedString("Downloading...", comment: "Button title")
    static let readEdition                          = NSLocalizedString("Read Edition", comment: "Button title")
    static let edition                              = NSLocalizedString("Edition", comment: "Button title")
    
    static let emptyContactsResultsMessage          = NSLocalizedString("Sorry we can not find any of your friends on the system", comment: "Info title")
    static let articlesWillAppearHere               = NSLocalizedString("Articles will appear here", comment: "Button title")
}
