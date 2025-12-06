# Plain Pling 🎮

A React Native physics-based game inspired by Plinko, built with **Expo**. Drop balls, hit pegs, score points, and aim for the high score!



## ✨ Features
- **Custom Physics Engine**: Built from scratch for React Native (Gravity, Collisions, Bouncing).
- **Special Pegs**: Trampolines, Sticky Pegs, Bonus Points, and Extra Tries.
- **Juicy Effects**: Particle systems, Screen Shake, and Score counting animations.
- **Sound Effects**: Integration with `expo-audio`.
- **Modular Codebase**: Clean architecture with Hooks and Components.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [EAS CLI](https://docs.expo.dev/build/setup/) (`npm install -g eas-cli`) for building APKs.

### 2. Installation
Clone the repo and install dependencies:

```bash
npm install
# or
yarn install
```


### 3. Running the Game
To start the local development server:

```bash
npx expo start
```
- Press `a` to run on Android Emulator.
- Press `i` to run on iOS Simulator.
- Press `w` to run on Web.
- Scan the QR code with the **Expo Go** app on your physical device.

---

## 📱 Building an APK (Android)

We use **EAS Build** to generate a standalone APK.

1. **Login to Expo**:
   ```bash
   eas login
   ```

2. **Configure Project (First time only)**:
   ```bash
   eas build:configure
   ```

3. **Run the Build**:
   ```bash
   eas build -p android --profile preview
   ```
   *This will take 10-15 minutes in the cloud. Once done, you will receive a link to download your .apk file.*

---

## 📂 Project Structure

```
/src
  /components    # UI Components (NeonCircle, StatsPanel, etc.)
  /constants     # Game configuration (Physics, Colors)
  /hooks         # Logic Hooks (useGameLoop, useSoundManager)
  /screens       # Main Screens (Splash, Rules, Game)
  /utils         # Helpers (PhysicsEngine)
App.js           # Entry point & Navigation
eas.json         # Build configuration
```

## 🎮 How to Play
1. **Drop**: Tap "DROP BALL" to release a ball.
2. **Bounce**: Hitting pegs changes direction.
   - 🔵 **Blue**: High Bounce
   - 🔘 **Grey**: Sticky (Stops ball)
   - 🟣 **Pink**: Bonus Points (+50)
   - 🟠 **Orange**: **Extra Try!**
3. **Score**: Land in the bottom bins to score (Center = 100pts).
4. **Goal**: Get the highest score possible in 5 tries!

---

Enjoy Pling!
