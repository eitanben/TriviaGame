var gifArray = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'];
var estaPregunta; var buenaRespuesta; var malaRespuesta; var sansresponse; var secondes; var time; var repondre; var usuario;
var mensajes = {
		correct: "Yup!",
		fautif: "Nope...",
		seAcabo: "No Mas!",
		final: "The Bootcamp Gong Show...is Over"
}
var juegoTrivia = [{
		pregunta: "How many hours do they teach HTML/CSS?",
		listeResponses: ["1 hour", "2 hours", "5 hours", "3 hours"],
		response: 3
},
{
		pregunta: "How much do you learn in that time?",
		listeResponses: ["Not Much", "A Lot", "Not Sure", "1-2 pages"],
		response: 2
},
{
		pregunta: "How many minutes do they lecture/whiteboard each subject?",
		listeResponses: ["15 minutes", "10 minutes", "1 hour", "30 minutes"],
		response: 0
},
{
		pregunta: "How many subjects are introduced by the instructor in 1 session?",
		listeResponses: ["1", "2", "3", "0"],
		response: 1
},
{
		pregunta: "How long do students spend in activities/homework in each session?",
		listeResponses: ["20 minutes", "5 minutes", "15 minutes", "1 hour"],
		response: 3
},
{
		pregunta: "How many hours do they teach Javascript concepts, such as Functions, Objects, Variables?",
		listeResponses: ["1 hour", "2 hours", "3 hours", "4 hours"],
		response: 3
},
{
		pregunta: "How many hours do they teach jQuery?",
		listeResponses: ["1 hour", "2 hours", "3 hours", "4 hours"],
		response: 1
},
{
		pregunta: "How long do teachers teach/lecture in a session?",
		listeResponses: ["1 hour", "30 minutes", "2 hours", "3 hours"],
		response: 1
},
{
		pregunta: "In a session, what percentage of the time is spent in asking students questions?",
		listeResponses: ["10%", "30%", "50%", "70%"],
		response: 3
},
{
		pregunta: "Do Programmers Make Good Teachers?",
		listeResponses: ["Not Sure", "Possibly", "Who Knows", "Don't Bet on It"],
		response: 3
},
{
		pregunta: "What is the standard bootcamp dropout rate?",
		listeResponses: ["10%", "20%", "30%", "50%"],
		response: 2
},
{
		pregunta: "What is the main reason that students drop out?",
		listeResponses: ["No Time To Study", "Lousy Instructor", "Not Much Teaching Going On", "Too Fast"],
		response: 3
},
{
		pregunta: "Are you learning ENOUGH coding to PASS a technical whiteboard interview? ",
		listeResponses: ["Don't know", "Maybe", "Everything is Possible", "Fuggedaboutit"],
		response: 2
}];

$('#startBtn').on('click', function(){
	$(this).hide();
	juegoNuevo();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	juegoNuevo();
});

function juegoNuevo(){
	$('#mensajeFinal').empty();
	$('#buenaRespuestas').empty();
	$('#malasRespuestas').empty();
	$('#sansresponse').empty();
	estaPregunta = 0;
	buenaRespuesta = 0;
	malaRespuesta = 0;
	sansresponse = 0;
	preguntaNueva();
}

function preguntaNueva(){
	$('#mensaje').empty();
	$('#responseCorrigee').empty();
	$('#gif').empty();
	repondre = true;


	$('#estaPregunta').html('Question #'+(estaPregunta+1)+'/'+juegoTrivia.length);
	$('.pregunta').html('<h2>' + juegoTrivia[estaPregunta].pregunta + '</h2>');

	for(var i = 0; i < 4; i++){
		var leschoix = $('<div>');
		leschoix.text(juegoTrivia[estaPregunta].listeResponses[i]);
		leschoix.attr({'data-index': i });
		leschoix.addClass('ceChoix');
		$('.listeResponses').append(leschoix);
	}
	timer();

	$('.ceChoix').on('click',function(){
		usuario = $(this).data('index');
		clearInterval(time);
		lasRespuestas();
	});
}

function timer(){
	secondes = 10;
	$('#quedanSecondes').html('<h3>Time Remaining: ' + secondes + '</h3>');
	repondre = true;

	time = setInterval(displayTimer, 1000);
}

function displayTimer(){
	secondes--;
	$('#quedanSecondes').html('<h3>Time Remaining: ' + secondes + '</h3>');
	if(secondes < 1){
		clearInterval(time);
		repondre = false;
		lasRespuestas();
	}
}

function lasRespuestas(){
	$('#estaPregunta').empty();
	$('.ceChoix').empty();
	$('.pregunta').empty();

	var bonneReponse = juegoTrivia[estaPregunta].listeResponses[juegoTrivia[estaPregunta].response];
	var repondreix = juegoTrivia[estaPregunta].response;

	$('#gif').html('<img src = "assets/images/'+ gifArray[estaPregunta] +'.gif" width = "400px">');


	if((usuario === repondreix) && (repondre === true)){
		buenaRespuesta++;
		$('#mensaje').html(mensajes.correct);
	} else if((usuario != repondreix) && (repondre === true)){
		malaRespuesta++;
		$('#mensaje').html(mensajes.fautif);
		$('#responseCorrigee').html('The correct answer was: ' + bonneReponse);
	} else{
		sansresponse++;
		$('#mensaje').html(mensajes.seAcabo);
		$('#responseCorrigee').html('The correct answer was: ' + bonneReponse);
		repondre = true;
	}

	if(estaPregunta === (juegoTrivia.length-1)){
		setTimeout(marcador, 4000)
	} else{
		estaPregunta++;
		setTimeout(preguntaNueva, 4000);
	}
}

function marcador(){
	$('#quedanSecondes').empty();
	$('#mensaje').empty();
	$('#responseCorrigee').empty();
	$('#gif').empty();

	$('#mensajeFinal').html(mensajes.final);
	$('#buenaRespuestas').html("Correct Answers: " + buenaRespuesta);
	$('#malasRespuestas').html("Incorrect Answers: " + malaRespuesta);
	$('#sansresponse').html("No Answer: " + sansresponse);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Play Again?');
}
