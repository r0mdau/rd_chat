<?php
	session_start();
	require_once(__DIR__.'/autoload.php');
	if(!isset($_SESSION['id'])){
		header('location:login.php');
		exit;
	}
	initialisationBDD();
?>
<!DOCTYPE html>
<html>
<head>
	<title>RDchat</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<?=require_once('modules/header_barre.php')?>
	<div id="main_container">		
		<div id="global" class="hero-unit">
		    <header>
			
		    </header>
		    <section>
			<article id="message" class="well">
				
			</article>
			<aside id="pseudo" class="well">
				
			</aside>
		    </section>
		    <footer>
			<textarea placeholder="Insérez vos liens entre {accolades}" name="contenu" id="text"></textarea>
			<div class="txtenvoyer" id="txtenvoyer">
				<input type="button" class="btn btn-large btn-success" id="bouton" value="Envoyer">
			</div>
			<p id="counter">250 caractères restants</p>
		    </footer>
		</div>
	</div>
	<script src="js/jquery-latest.min.js"></script>
	<script src="js/prod.js"></script>
	<script>
		var to = <?=(getSalon())?>;
		var notifButton = <?=(getPrefNotif($_SESSION['id']))?>;
		var peopleButton = <?=(getPrefPeople($_SESSION['id']))?>;
		var scrollButton = <?=(getPrefScroll($_SESSION['id']))?>;
		var pauseButton = <?=(getPrefPause($_SESSION['id']))?>;
		document.onload = initialisation();	    
	</script>
</body>
</html>
