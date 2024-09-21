# 🎉 `erp-snap`
## Supported domain
- https://erp.psit.ac.in

![Thumbnail1](https://github.com/user-attachments/assets/beb6c87a-41be-47cd-afd2-8902c25f4b4e)
![Thumbnail2](https://github.com/user-attachments/assets/b93f6ac2-f58b-4566-af95-135d5ec8f024)

## 🔐 Important Security Note

Your privacy matters to us! Here's the scoop on how we handle your login info:

-   I don't store your username and password on any server. 🛜❌
-   Your credentials are securely transmitted between your device and the college server. 🔒🔀
-   This keeps your sensitive details safe! 💪

## ✨ What's Inside?

### 🛠️ Core Services

-   **📊 Attendance**: Keep tabs on your class presence
-   **🔔 Notification**: Stay in the loop with important updates
-   **👤 Profile**: Manage your personal info with ease
-   **📅 Timetable**: Never miss a class with our schedule organizer

### 🌟 Features

-   **🔄 Realtime Sync**: Always up-to-date, always in sync
-   **↻ Pull to Refresh**: New info at your fingertips
-   **🌐 Offline Support**: No internet? No problem!
-   **🌓 Dark/Light Toggle**: Easy on the eyes, day or night
-   **🔌 Reconnection Fallback**: We've got your back when the internet acts up

## 💬 We Want Your Thoughts!

Love it? Hate it? Found a bug? We're all ears! Drop us a line in our [issue tracker](https://github.com/shahil-yadav/erp-snap/issues).

## ⚠️ Friendly Reminder

This is still under development, so it might be a bit rough around the edges. Best not to rely on it for mission-critical stuff just yet!

## 📱 Platform Support

-   Android

## 🔧 How to Install

Getting `erp-snap` on your Android device is a breeze:

1. 📥 Grab the APK file from our official website
2. 🔓 Make sure "Install apps from unknown sources" is on (check your Android settings)
3. 📲 Tap the APK file and follow the prompts

### 🦠 About That Virus Warning...

Don't panic if you see a virus warning! Here's why it's happening and why it's safe:

-   🛡️ The APK isn't digitally signed yet (it's a dev build, after all)
-   🔍 Feel free to scan it – you'll see zero threats

Once it's installed, you'll find `erp-snap` hanging out in your app drawer, ready to go!

Thanks for being part of our journey with `erp-snap`! Your feedback is pure gold to us. Let's make this app awesome together! 🙌✨

# Developer's Section

## React + TypeScript + Vite + Capacitor

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
        },
    },
})
```

-   Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react"

export default tseslint.config({
    // Set the react version
    settings: { react: { version: "18.3" } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
    },
})
```
