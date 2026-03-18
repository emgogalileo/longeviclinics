# Apple Developer Portal Instructions for Longeviclinics

As I do not have direct access to the Apple Developer Portal, please follow these steps to generate the required assets for the App Store release.

## 1. Create iOS Distribution Certificate
1. Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/certificates/list).
2. Click the **+** button.
3. Select **iOS Distribution** (or Apple Distribution).
4. Follow the steps to upload a CSR (Certificate Signing Request) from your Mac's Keychain Access.
5. Download the `.cer` file, double-click to install in Keychain, and then export it as a `.p12` file with a password.
6. **Save as Secret**: Base64 encode the `.p12` and save as `IOS_CERTIFICATE_P12_BASE64`. Save the password as `IOS_CERTIFICATE_PASSWORD`.

## 2. Register App ID & Capabilities
1. Go to [Identifiers](https://developer.apple.com/account/resources/identifiers/list).
2. Click **+** and select **App IDs**.
3. Use Bundle ID: `com.longeviclinics.app`.
4. Under **Capabilities**, ensure the following are checked:
   - **Sign in with Apple**
   - **HealthKit**
   - **Push Notifications**
5. Click **Save**.

## 3. Create Provisioning Profile (App Store)
1. Go to [Profiles](https://developer.apple.com/account/resources/profiles/list).
2. Click **+** and select **App Store** under Distribution.
3. Select the App ID created above.
4. Select your Distribution Certificate.
5. Name it `Longeviclinics_App_Store`.
6. Download the `.mobileprovision` file.
7. **Save as Secret**: Base64 encode this file and save as `IOS_PROVISIONING_PROFILE_BASE64`.

## 4. App Store Connect API Key (.p8)
1. Go to [App Store Connect > Users and Access > Integrations](https://appstoreconnect.apple.com/access/api).
2. Click **+** to generate a new API Key.
3. Name: `Antigravity_Deploy`.
4. Access: **App Manager** or **Developer**.
5. Download the `.p8` file (you can only download it once!).
6. **Save as Secret**: Base64 encode the `.p8` and save as `APPSTORE_API_KEY_BASE64`.
7. Note the **Key ID** (`APPSTORE_KEY_ID`) and **Issuer ID** (`APPSTORE_ISSUER_ID`).

---

## Final Build Command
Once secrets are set, you can build the IPA using:
```bash
npx expo export:embed --platform ios --dev false && cd ios && xcodebuild -workspace Longeviclinics.xcworkspace -scheme Longeviclinics -configuration Release -archivePath build/Longeviclinics.xcarchive archive
```
*(Or use EAS Build if you have it configured: `eas build --platform ios`).*
