var APIKey = "a61aea7f1f0137536dc953c81b63e73f"; //00ba46197ec62f9c0dde07bd4fde6252

var srchHistAry = [];
function renderSearchHistory() {
    if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
        srchHistAry = JSON.parse(localStorage.getItem("searchHistory"));
    }
    $("#searchHistory").empty();
    $("#searchHistory").append(`<hr>`);

    for (i=0; i < srchHistAry.length; i++) {
        $("#searchHistory").append(`
            <button id="pastSearchBtn"
            class="mb-2 p-3 w-100 rounded-3 text-dark">${srchHistAry[i]}</button>
        `);
    }
}