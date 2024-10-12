export function queryStatusAtNight() {
    const time = new Date().getHours()
    /** Disable at 11 o'clock */
    if (time >= 23 || time < 5) return true
    return false
}
