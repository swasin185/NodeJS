exports.formatDate = function (d) {
    if (d)
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    else
        return ""
}

exports.formatTime = function (d) {
    if (d)
        return d.toLocaleTimeString("th-TH")
    else
        return ""
}

exports.showError = function () {
    this.$buefy.dialog.alert({
        title: "Server ERROR",
        message: "Connection Lost!",
        type: "is-danger",
        hasIcon: true,
        icon: "close-circle"
    });
}

exports.ssInfo = { comCode: '', company: '', user: '', color: 'lightgrey' }