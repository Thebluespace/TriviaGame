var gameo = {
    questions: {
        questionOne: ["Who is Kratos' father?", "Ares", "Zues","Odin","Thor", 2],
        questionTwo: ["What is Kratos' Moniker", "Spirit of Sparta", "God of War","Ghost of Sparta","God of Rage", 2],
        questionThree: ["Who was Kratos' first wife and child?", "Lysandra, Calliope", "Laufey, Atreus","Hera, Hephastus","Io, Epaphus", 1],
        questionFour: ["What is Atreus' name according to the Jötnar?","Farmir","Mimir","Loki","Hades", 3],
        questionFive: ["What mythology is Kratos from?" ,"Aztec", "Norse", "Egyptian","Roman",4],
    },
    currentAnswer: 0,
    currentQuestion: 0,
    gameState: false,
    currentInterval: "",
    currentTimer: "",
    currentTime: 0,

    makeGuess: function(event) {
        try {
            if (gameo.currentAnswer == $(event).att("data") && gameo.currentTime > 0){
                clearInterval(this.currentInterval);
                alert("correct!");
                // make something happen
                gameo.nextQuestion();
            } else {
                clearInterval(this.currentInterval);
                alert("False!");
                // make something happen
                gameo.nextQuestion();
            }
        } catch(error){
            console.error(error);
        }
    },
    formReset: function(){
        try {
            $(document).off("click");
            //reset variables
            gameo.currentAnswer = 0;
            gameo.gameState = false;
            gameo.currentInterval = "";
            gameo.currentTimer = "";

            $(".gamecontainer").empty();
            var form = $("<div>");
            form.attr("id","gamecard");
            $(form).append($("<br>"),$("<br>"));
            var qheader = $("<h1>");
            qheader.text("Welcome to God of War Trivia!");
            $(form).append(qheader);
            $(form).append($("<br>"));

            var grules = $("<p>");
            grules.text("This is a short Trvia game about the game series God of War. Each question has a 30 second timer, click on an answer within the time limit to continue.");
            $(form).append(grules);
            $(form).append($("<br>"));
            var gruless = $("<p>");
            gruless.text("Whenever you're ready, click the start button");
            $(form).append(gruless);
            $(form).append($("<br>"));
            $(form).append($("<br>"));

            var sbutton = $("<button>");
            sbutton.text("Start Game");
            sbutton.attr("type", "button");
            sbutton.attr("id","startbutton");
            $(form).append(sbutton);

            $(".gamecontainer").append(form);

            gameo.addEvents();

        } catch (error) {
            console.error(error);
        }
    },
    nextQuestion: function(){
        

    },
    endGame: function(){
        if (gameo.currentTime === 0) {
            alert("Times Up!");
        }

    },
    addEvents: function(){
        try {
            $(document).on("click", "#startbutton", gameo.startGame);
            $(document).on("click", "#answer",gameo.makeGuess);   
        } catch(error) {
            console.error((error));
        }
    },
    startGamme: function(event){
        try {
            gameo.gameState = true;
            var qheader = $("<h1>");
            qheader.text("First Question!");

            var timer = $("<h1>");
            timer.attr("id","timer")
            timer.text("30");

            var qheader2 = $("<h2>");
            qheader2.text(gameo.questions.questionOne[0]);

            $("#gamecard").empty();
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(qheader);
            $("#gamecard").append(qheader2);
            $("#gamecard").append($("<br>"));
            for (i = 1; i < gameo.questions.questionOne.length -1; i++) {
                var answer = $("<h3>");
                answer.attr("id", "answer")
                answer.attr("data", i);

                $("#gamecard").append(answer);
                $("#gamecard").append($("<br>"));
            }
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(timer);

            gameo.currentInterval(gameo.timer,1000);
        } catch (error) {
            console.error(error);
            gameo.gameState = false;
        }
    },
    timer: function(){
        gameo.currentTime--;
        $("#timer").text(gameo.currentTime);
        if (gameo.currentTime === 0){
            clearInterval(gameo.currentInterval);
            gameo.endGame();
        }
    }
}