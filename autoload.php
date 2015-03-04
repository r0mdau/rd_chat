<?php
require_once(__DIR__.'/settings.php');
    if ($dh = opendir(__DIR__.'/db/')) {
        while (($file = readdir($dh)) !== false) {
            if(strpos(strtolower($file), '.php')){
                if(!require_once(__DIR__.'/db/'.$file)){
                    echo 'Erreur, un fichier n\'a pas été inclu : '.$file;
                    exit;
                }
            }
        }
        closedir($dh);        
    }
?>