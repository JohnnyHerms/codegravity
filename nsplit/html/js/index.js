﻿// This code is distributed under MIT license. 
// Copyright (c) 2014 George Mamaladze, Florian Greinacher
// See license.txt or http://opensource.org/licenses/mit-license.php
function startAnalyzes(file) {
    $.getJSON("api/analyzes/start?file=" + file, function(data) {
        $("#loaded").text(data.message);
        $("#message").text("Started");
        if (data.ok) {
            setTimeout(getPorgress, 100);
            $("#goto")
                .removeAttr("disabled")
                .on("click", goToGraph);
        }
    });
}

function getPorgress() {
    $.getJSON("api/analyzes/progress", function(progress) {
        $("#progress").text(Math.round(progress.actual * 100 / progress.max) + "%");
        $("#message").text(progress.message);
        if (progress.finished) goToGraph();
        else setTimeout(getPorgress, 200);
    });
}

function goToGraph() {
    var newUrl = window.location.protocol + "//" + window.location.host + "/main.html";
    //window.location = newUrl;
    window.location.replace(newUrl);
}

function supportsCanvas() {
    return document.createElement('svg');
}

$(document).ready(function () {

    if (!supportsCanvas()) {
        $("#warning").style("visibility", "visible");
    }

    $("#analyze").on("click", function () {
        var fileName = $("#assembly").val();
        startAnalyzes(fileName);
    });

    $("#demo").on("click", function () {
        startAnalyzes("");
    });
});