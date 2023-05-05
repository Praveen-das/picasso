Array.prototype.totalUnreadMessages = function () {
    return this.reduce((count, obj) => {
        if (!obj?.new) count += 1
        return count
    }, 0)
}