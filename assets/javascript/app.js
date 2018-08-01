var gameo = {
    questions: {
        questionOne: ["Who is Kratos' father?", "Ares", "Zeus","Odin","Thor", 2],
        questionTwo: ["What is Kratos' Moniker", "Spirit of Sparta", "God of War","Ghost of Sparta","God of Rage", 3],
        questionThree: ["Who was Kratos' first wife and child?", "Lysandra, Calliope", "Laufey, Atreus","Hera, Hephastus","Io, Epaphus", 1],
        questionFour: ["What is Atreus' name according to the Jötnar?","Farmir","Mimir","Loki","Hades", 3],
        questionFive: ["What mythology is Kratos from?" ,"Aztec", "Norse", "Egyptian","Roman",4],
    },
    currentAnswer: 0,
    currentAnswerText: "",
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    gameState: false,
    currentInterval: "",
    currentTimer: "",
    currentTime: 0,

    makeGuess: function(event) {
        try {
            if (gameo.currentTime > 0) {
                if (gameo.currentAnswer == $(event.target).attr("data-number")){
                    clearInterval(gameo.currentInterval);
                    gameo.correctAnswers++;
                    gameo.gifevent("correct");
                    setTimeout(gameo.nextQuestion,3500);
                } else {
                    clearInterval(gameo.currentInterval);
                    gameo.wrongAnswers++;
                    gameo.gifevent("wrong");
                    setTimeout(gameo.nextQuestion,4000);
                }
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
            sbutton.on("click", gameo.startGamme);
        } catch (error) {
            console.error(error);
        }
    },
    nextQuestion: function(){

        try {
            gameo.currentQuestion++;
            var currentQuestions = [];
            var qheader = $("<h1>");
            qheader.attr("id","qheader")
            switch (gameo.currentQuestion) {
                case 2:
                    currentQuestions = gameo.questions.questionTwo;
                    qheader.text("Second Question!");
                break;
                case 3:
                    currentQuestions = gameo.questions.questionThree;
                    qheader.text("Third Question!");
                break;
                case 4:
                    currentQuestions = gameo.questions.questionFour;
                    qheader.text("Fourth Question!");
                break;
                case 5:
                    currentQuestions = gameo.questions.questionFive;
                    qheader.text("Last Question!");
                break;
                default:
                    gameo.endGame();
                return;
            }
            
            gameo.currentAnswer = currentQuestions[5];
            gameo.currentAnswerText = currentQuestions[gameo.currentAnswer];
            var timer = $("<h1>");
            timer.attr("id","timer")
            timer.text("30");

            var qheader2 = $("<h2>");
            qheader2.attr("id","question")
            qheader2.text(currentQuestions[0]);

            $("#gamecard").empty();
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(qheader);
            $("#gamecard").append(qheader2);
            $("#gamecard").append($("<br>"));
            for (i = 1; i < 5; i++) {
                var answer = $("<h3>");
                answer.attr("id", "answer")
                answer.attr("data-number", i);
                answer.text(currentQuestions[i]);

                $("#gamecard").append(answer);
                $("#gamecard").append($("<br>"));
                answer.on("click", gameo.makeGuess);
            }
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(timer);
            gameo.currentTime = 30;
            gameo.currentInterval = setInterval(gameo.timer,1000);
        } catch (error) {
            console.error(error);
            gameo.gameState = false;
        }
        

    },
    endGame: function(){
            clearInterval(gameo.currentInterval);
            gameo.gifevent("gameover");
    },
    gifevent: function(type) {
        switch(type) {
            case "correct":
                var img = $("<img>");
                img.attr("src","assets/media/correct2.gif");
                img.attr("id","gif");
                var header = $("<h1>");
                header.text("Correct!");
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(img);
                $("#gamecard").append(header);
            break;
            case "wrong":
                var img = $("<img>");
                img.attr("src","assets/media/wrong.gif");
                img.attr("id","gif");
                var header = $("<h1>");
                header.text("Wrong! The correct answer was: " + gameo.currentAnswerText);
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(img);
                $("#gamecard").append(header);
            break;

            case "timer":
                var img = $("<img>");
                img.attr("src","assets/media/wrong.gif");
                img.attr("id","gif");
                var header = $("<h1>");
                header.text("Times Up!");
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(img);
                $("#gamecard").append(header);
            break;

            case "gameover":
                var header = $("<h1>");
                header.attr("id","qheader");
                header.text("Thanks for playing!");
                var guesses1 = $("<h2>");
                guesses1.attr("id","qheader2");
                guesses1.text("Correct Answers: " + gameo.correctAnswers);
                var guesses2 = $("<h2>");
                guesses2.attr("id","qheader2");
                guesses2.text("Wrong Answers: " + gameo.wrongAnswers);

                var sbutton = $("<button>");
                sbutton.text("Play Again!");
                sbutton.attr("type", "button");
                sbutton.attr("id","startbutton");
                

                $("#gamecard").empty();
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(header);
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(guesses1);
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(guesses2);
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(sbutton);
                sbutton.on("click", gameo.startGamme);
            break;
        }

    },
    startGamme: function(event){
        try {
            gameo.currentAnswer = 0;
            gameo.correctAnswers = 0;
            gameo.wrongAnswers = 0;
            gameo.gameState = false;
            gameo.currentInterval = "";
            gameo.currentTimer = "";
            gameo.gameState = true;
            gameo.currentAnswer = gameo.questions.questionOne[5];
            gameo.currentAnswerText = gameo.questions.questionOne[2];
            gameo.currentQuestion++;
            var qheader = $("<h1>");
            qheader.attr("id","qheader")
            qheader.text("First Question!");

            var timer = $("<h1>");
            timer.attr("id","timer")
            timer.text("30");

            var qheader2 = $("<h2>");
            qheader2.attr("id","question")
            qheader2.text(gameo.questions.questionOne[0]);

            $("#gamecard").empty();
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(qheader);
            $("#gamecard").append(qheader2);
            $("#gamecard").append($("<br>"));
            for (i = 1; i < gameo.questions.questionOne.length - 1; i++) {
                var answer = $("<h3>");
                answer.attr("id", "answer")
                answer.attr("data-number", i);
                answer.text(gameo.questions.questionOne[i]);

                $("#gamecard").append(answer);
                $("#gamecard").append($("<br>"));
                answer.on("click", gameo.makeGuess);
            }
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(timer);
            gameo.currentTime = 30;
            gameo.currentInterval = setInterval(gameo.timer,1000);
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
            gameo.gifevent("timer");
        }
    }
}