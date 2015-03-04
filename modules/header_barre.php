<div class="navbar navbar-inverse navbar-fixed-top">
      <a class="closebtn" href="login.php" title="Déconnexion"><img src="img/fermer.png" alt="Déconnexion"></a>
      <div class="navbar-inner">
        <div class="container">
          <a class="brand" href="">RDchat</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
            <?php
                  $nac = array('Home', 'CPi1', 'CPi2', 'CSII 1', 'CSII 2', 'CSII 3');
                  $i = 1;
                  foreach($nac as $n){
                        echo '<li '.($i == getSalon() ? 'class="active"' : '').'>                              
                              <a href="?salon='.$i.'">'.$n.'</a>                              
                            </li>';
                        ++$i;
                        //<span style="display:none;position:absolute;" id="salon'.getSalon().'" class="badge badge-important">0</span>
                  }
            ?>
            </ul>
            <button type="button" class="btn btn-info btn-small" id="peopleButton" title="Afficher seulement les connectés au salon ou bien tout le monde">Users</button>
            <button type="button" class="btn btn-warning btn-small" id="scrollButton" title="Locker le scroll auto du chat">Auto scroll</button>
            <button type="button" class="btn btn-small" id="pauseButton" title="Mettre le chargement automatique de la page en pause. A noter que le chat est légèrement gourmand.">Pause</button>            
          </div>
        </div>
      </div>
    </div>