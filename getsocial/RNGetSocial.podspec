Pod::Spec.new do |s|

  s.name         = "RNGetSocial"
  s.version      = "6.27.0"
  s.summary      = "GetSocial provides the whole social layer stack that powers engagement, retention, acquisition and revenue tools."

  s.description  = <<-DESC
                   GetSocial lets you create highly effective in-app social marketing platforms. 
                   
                   In fact, you can build in-app social networks within your eco-system of apps. We’ve made it incredibly easy to blend social engagement, user acquisition & promotional layers into your app – seamlessly – with full stack solutions. 
                   
                   Our tool suite supports your app’s entire user lifecycle. And you get it all from just one great source. GetSocial.
                   DESC

  s.homepage          = "http://www.getsocial.im"
  s.social_media_url  = "https://twitter.com/GetSocial_now"
  s.documentation_url = "http://docs.getsocial.im"

  s.license      = { :type => 'Commercial', :text => 'See https://www.getsocial.im/legal/' }
  s.authors      = { "GetSocial" => "support@getsocial.im"}
  s.source        = { :http => "https://downloads.getsocial.im/ios/GetSocial-iOS-v#{s.version}.zip" }

  s.platform     = :ios, "9.0"
  s.ios.deployment_target = '9.0'
  s.requires_arc = true
  
  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'index.js'
  s.source_files   = 'ios/**/*.{h,m}'
  
  s.dependency "React"
  s.dependency "GetSocial/Core"
  s.dependency "GetSocial/UI"
  
end
