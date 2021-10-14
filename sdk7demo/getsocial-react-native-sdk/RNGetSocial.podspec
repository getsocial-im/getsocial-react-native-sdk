#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html.
# Run `pod lib lint getsocial_flutter_sdk.podspec' to validate before publishing.
#
Pod::Spec.new do |s|
  s.name             = 'RNGetSocial'
  s.version          = '7.3.0'
  s.summary          = 'GetSocial React Native SDK v7.'
  s.description      = <<-DESC
GetSocial React Native SDK v7.
                       DESC
  s.homepage         = 'https://getsocial.im'
  s.license          = { :file => './LICENSE' }
  s.author           = { 'GetSocial' => 'info@getsocial.im' }
  s.source           = { :path => '.' }
  s.source_files = 'Classes/**/*'
  s.dependency 'GetSocialExtended', '7.6.3'
  s.platform     = :ios, "9.0"
  s.ios.deployment_target = '9.0'
  s.requires_arc = true
  
  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'index.js'
  s.source_files   = 'ios/**/*.{h,m}'
  
  s.dependency "React"
end
