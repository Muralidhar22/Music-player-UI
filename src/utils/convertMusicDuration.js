export const convertMusicDuration = (duration) => {
    // duration is received in seconds
    if(duration) {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds}`
    }
}