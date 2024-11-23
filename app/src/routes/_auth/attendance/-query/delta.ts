const periods = 8

interface IDelta {
    absent: number
    oaa: number
    totalLectures: number
}

function positiveDelta(records: IDelta) {
    const initialAttendance = 100 * (1 - records.absent / records.totalLectures)
    const finalAttendance = 100 * (1 - records.absent / (records.totalLectures + periods))
    return (finalAttendance - initialAttendance).toFixed(2)
}

function negativeDelta(records: IDelta) {
    const initialAttendance = 100 * (1 - records.absent / records.totalLectures)
    const finalAttendance =
        100 * (1 - (records.absent + periods) / (records.totalLectures + periods))
    return (initialAttendance - finalAttendance).toFixed(2)
}

function positiveDeltaOfPeriods(records: IDelta) {
    const initialAttendance = 100 * (1 - records.absent / records.totalLectures)
    const finalAttendance = 100 * (1 - records.absent / (records.totalLectures + 1))
    return (finalAttendance - initialAttendance).toFixed(2)
}

function negativeDeltaOfPeriods(records: IDelta) {
    const initialAttendance = 100 * (1 - records.absent / records.totalLectures)
    const finalAttendance = 100 * (1 - (records.absent + 1) / (records.totalLectures + 1))
    return (initialAttendance - finalAttendance).toFixed(2)
}

export { positiveDeltaOfPeriods, positiveDelta, negativeDeltaOfPeriods, negativeDelta }
