//WebがBluetooth APIに対応しているかどうか確認する。
if(navigator.bluetooth) console.info("お使いのブラウザはBluetooth APIに対応しています。");
else {
    console.warn("お使いのブラウザはBluetooth APIに対応していません。Google Chromeの場合は \"chrome://flags/#enable-experimental-web-platform-features\" を検索バーに入力するとBluetooth APIを有効化出来る場合があります。");
    document.getElementById("bluetooth_api_not_supported").classList.remove("hidden");
}

//"copyable_text"クラスのテキストをコピー出来るようにする処理
/**
 * マウスカーソルが"copyable_text"クラス内にある時に動いた時の処理
 * @param {MouseEvent} event イベント
 */
function onMouseMoveInCopyableTextClass(event) {
    const balloonText = document.getElementById("balloon_text");
    balloonText.style.left = `${event.clientX - balloonText.clientWidth / 2}px`;
    balloonText.style.top = `${event.clientY - 70}px`;
}

Array.prototype.forEach.call(document.getElementsByClassName("copyable_text"), (element) => {
    let timeoutID;
    element.addEventListener("mouseenter", () => {
        const balloonText = document.getElementById("balloon_text");
        balloonText.innerText = "クリックしてコピー";
        balloonText.classList.remove("hidden");
        element.addEventListener("mousemove", onMouseMoveInCopyableTextClass);
    });
    element.addEventListener("mouseleave", () => {
        const balloonText = document.getElementById("balloon_text");
        balloonText.classList.add("hidden");
        balloonText.classList.remove("balloon_text_green", "balloon_text_red");
        element.removeEventListener("mousemove", onMouseMoveInCopyableTextClass);
        if(timeoutID) clearTimeout(timeoutID);
        timeoutID = undefined;
    });
    element.addEventListener("click", (event) => {
        const balloonText = document.getElementById("balloon_text");
        navigator.clipboard.writeText("chrome://flags/#enable-experimental-web-platform-features").then(() => {
            balloonText.innerText = "コピーしました！";
            balloonText.classList.add("balloon_text_green");
        }).catch(() => {
            balloonText.innerText = "コピーエラー！";
            balloonText.classList.add("balloon_text_red");
        }).finally(() => {
            onMouseMoveInCopyableTextClass(event);
            timeoutID = setTimeout(() => {
                balloonText.innerText = "クリックしてコピー";
                balloonText.classList.remove("balloon_text_green", "balloon_text_red");
                onMouseMoveInCopyableTextClass(event);
            }, 1500);
        });
    });
});