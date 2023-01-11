export default class CrossPlatformHelper {
  public static clickVibrate = () => {
    if (!window) {
      return
    }

    if (!window.navigator) {
      return
    }

    if (!window.navigator.vibrate) {
      return
    }

    window.navigator.vibrate(100)
  }
}
