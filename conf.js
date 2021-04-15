const Configstore = require("configstore");
const packageJSON = require("./package.json");
let conf;

function setConfiguration() {
    conf = new Configstore(packageJSON.name, {
        "vtex-token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkVFQkFGRjY1QkVFRUNDODUxQkQ2NkFEOEI0NjIyQUY2MDAzOEI5NUQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJkaWVnb3Zhc3F1ZXpAYmxhY2tzaXAuY29tIiwidXNlckxvZ2luIjoiZGllZ292YXNxdWV6QGJsYWNrc2lwLmNvbSIsInVzZXJJZCI6ImRpZWdvdmFzcXVlekBibGFja3NpcC5jb20iLCJ0eXBlIjoiVXNlciIsImFjY291bnQiOiJibGFja3NpcCIsIndvcmtzcGFjZSI6Im1hc3RlciIsInJvbGVzIjpbInVzZXI6MjZkOTMwNzYtMDIwOC00NjcwLWIwMWYtMjg5NjE4OTI0MGRkIiwidXNlcjpkaWVnb3Zhc3F1ZXpAYmxhY2tzaXAuY29tIl0sIm5iZiI6MTUyNzc5NDY1MiwiZXhwIjoxNTI3ODgxMDUyLCJpYXQiOjE1Mjc3OTQ2NTIsImlzcyI6InZ0ZXhpby9yb3V0ZXIiLCJhdWQiOiJ2dGV4aW8ifQ.BUWSkVsh8PRYU3j1FkD_XZXJgSK5mSi3OOMAWucfmZ0_Xz0-8SvOuJ4dcdWPch74m17LJUF72taJl3gYK2cF5dkzCcIjkQI_kNqJoeDkmjCG_IA6YHkF4uMDSMkIoICIsKpLK_3L2g4P6_8yC0NAAUTpoQ3j171vW4jldGbDK6wOanBOlzmIgZyygObTENO7oyWvOv1r8pE4e2D6Im2YAFFKXEHcr02H1I81QXAuyQvXUQEugi7YJv-F6gUK1Ng00tTT171S4XYRMhT3IXKC1xECwuIVoHTjuy9NlkJ5aHXTvHtniAXK8PmY2e5mYZwsxdR7gWjQ8867NC0yw7k-7w",
        "vtex-user-agent": "Toolbelt/2.25.1",
        "workspace": "master",
        "endpoint": "myvtex.com"
    });
}

setConfiguration();

module.exports = conf;