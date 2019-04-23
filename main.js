$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBNFuo7Vkdtk1eD6gaeH4rpZ12LvIvWNdA",
        authDomain: "train-scheduler-34.firebaseapp.com",
        databaseURL: "https://train-scheduler-34.firebaseio.com",
        projectId: "train-scheduler-34",
        storageBucket: "train-scheduler-34.appspot.com",
        messagingSenderId: "739482015429"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#submitButton").on("click", function () {
        event.preventDefault();
        var train = {
            name: $("#trainNameInput").val().trim(),
            destination: $("#destinationInput").val().trim(),
            startTime: $("#firstTrainTimeInput").val().trim(),
            frequency: $("#frequencyInput").val().trim()
            // nextTrainTime :nextTrain,
            // minutesToNextTrain: tMinutesTillTrain
        }

        database.ref().push(train);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
        $("#newDiv").text("");
    });

    database.ref().on("child_added", function (snapshot) {
        var trainName = snapshot.val().name;
        var trainDestination = snapshot.val().destination;
        var trainStartTime = snapshot.val().startTime;
        var trainFrequency = snapshot.val().frequency;
        var currentTime = moment();
        var startTimeConverted = moment(trainStartTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        var tRemainder = diffTime % trainFrequency;
        var tMinutesTillTrain = trainFrequency - tRemainder;
        console.log(tMinutesTillTrain);
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(tRemainder),
            $("<td>").text(tMinutesTillTrain)
        );

        $("#scheduleTable").append(newRow);

    });
});

// var startTime =$("#firstTrainTimeInput").val().trim();
// console.log(startTime);
// var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
// var currentTime = moment();
// var diffTime = moment().diff(moment(startTimeConverted), "minutes");
// var frequency = $("#frequencyInput").val().trim();
// var tRemainder = diffTime % frequency;
// var tMinutesTillTrain = frequency - tRemainder;
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");