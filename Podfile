# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
    "react-native/scripts/react_native_pods.rb",
    {paths: [process.argv[1]]},
  )', __dir__]).strip

platform :ios, min_ios_version_supported
prepare_react_native_project!
use_frameworks! :linkage => :static    # firebase auth
$RNFirebaseAsStaticFramework = true    # firebase auth
#use_modular_headers!   # firebase auth

linkage = ENV['USE_FRAMEWORKS']
if linkage != nil
  Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
  use_frameworks! :linkage => linkage.to_sym
end

# Disable IDFA collection (keeps Apple Review happy if you don't use Ads)
$RNFirebaseAnalyticsWithoutAdIdSupport = true



target 'KetoTrainAI' do
  config = use_native_modules!

#   # Firebase Swift/Obj-C compatibility
#   pod 'GoogleUtilities', :modular_headers => true
#   pod 'FirebaseCore', :modular_headers => true
#   pod 'FirebaseCoreInternal', :modular_headers => true
#   pod 'FirebaseAuth', :modular_headers => true

#     # The "Hidden" dependencies of Firebase auth:
#   pod 'FirebaseAuthInterop', :modular_headers => true
#   pod 'FirebaseAppCheckInterop', :modular_headers => true
#   pod 'FirebaseCoreExtension', :modular_headers => true
#   pod 'RecaptchaInterop', :modular_headers => true

  # If you use Analytics, you might eventually need this too, but try without first:
  # pod 'FirebaseInstallations', :modular_headers => true

  use_react_native!(
    :path => config[:reactNativePath],
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # :ccache_enabled => true
    )
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        if config.name == 'Release'
          config.build_settings['DEBUG_INFORMATION_FORMAT'] = 'dwarf-with-dsym'
        end
      end
    end
  end
end
