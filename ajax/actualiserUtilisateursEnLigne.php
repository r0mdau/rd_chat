<?php
session_start();
if(isset($_SESSION['id'])){
	require('../autoload.php');
	$id_etudiant=$_SESSION['id'];
	
	$htmli='En ligne :<hr>';	
	$temps=time()-10;
	
	$_GET['salon'] = getSalon();
	
	$ret = Db::queryObject('SELECT c.pseudo pseudo 
			       FROM en_ligne e, compte_etudiant c 
			       WHERE e.id_etudiant = c.id 
			       AND temps > \''.$temps.'\' 
			       AND e.id_etudiant != '.$_SESSION['id'].
			       ($_GET['salon'] != 0 ? ' AND e.salon='.$_GET['salon'] : ''));
	foreach($ret as $r){
		$htmli .= '<a href="javascript:void(0)" onclick="javascript:chatWith(\''.$r->pseudo.'\')">'.$r->pseudo.'</a><br/>';
	}
	
	echo $htmli;
	sleep(0.5);
}
?>
