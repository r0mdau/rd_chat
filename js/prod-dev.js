function creationXHR()
{
    var resultat = null;
    try { //tous navigateurs
        resultat = new XMLHttpRequest();
    }
    catch (Error){
        try{//Internet Explorer > 5.0
            resultat = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (Error){
            try{ //Internet Explorer 5.0
                resultat = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(Error){
                resultat = null;
            }
        }
    }
    return resultat;
}

function timeMessage() //fonction qui actualise la BDD pour les nouveaux message tous les 0.5s !
{    
    var element=false;
    var intervalID = setInterval(function() {
        if(pauseButton == 0){
            genererNouveauxMessages();
            afficherUtilisateurEnLigne();
        }
        //if(notifButton == 1) genererNotification(element, to);
        if(scrollButton == 1){
            elementScroll = document.getElementById('message');            
            elementScroll.scrollTop = elementScroll.scrollHeight;
        }
    }, 1000);
}

function initialisation()
{			
    document.getElementById('bouton').onclick = function(){envoi()};    
    document.getElementById('text').addEventListener('keyup', function(e){
	if(e.keyCode == 13)
	    envoi();
    });
    timeMessage();
}

function envoi()
{
    $('#counter').html('150 caracères restants');
    var message = document.getElementById('text').value;
    document.getElementById('text').value = '';
    objetXHREnvoi = creationXHR();
    var param = "message="+message+"&salon="+to;
    objetXHREnvoi.open("post", "ajax/envoyerMessage.php", true);
    objetXHREnvoi.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objetXHREnvoi.send(param);
}

function actualiserNotif() {
    if (objetXHRNotif.readyState == 4) {
            if (objetXHRNotif.status == 200) {
                    var resultat = objetXHRNotif.responseText;
                    var data = resultat.split(",");
                    var i = 0;
                    for(i=0; i< 4; ++i){
                        document.getElementById('salon'+i).value = data[i];
                        if(data[i] > 0) document.getElementById('salon'+i).style.display = '';
                        else document.getElementById('salon'+i).style.display = 'none';
                    }                  
            }
            else{
                    //on annule la requete en cours.
                    objetXHRNotif.abort();
                    objetXHRNotif=null;
            }
    }
}

function genererNotification(element, salon)
{
    objetXHRNotif = creationXHR();
    var param = "id_etudiant="+element+"&salon="+salon;
    objetXHRNotif.open("post", "ajax/actualiserNotif.php", true);
    objetXHRNotif.onreadystatechange = actualiserNotif;
    objetXHRNotif.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objetXHRNotif.send(param);
}

function actualiserMessage() {
    if (objetXHR2.readyState == 4) {
        if (objetXHR2.status == 200) {
            var resultat = objetXHR2.responseText;
            document.getElementById('message').innerHTML = resultat;
        }
        else{
            //on annule la requete en cours.
            objetXHR2.abort();
            objetXHR2=null;
        }
    }
}

function genererNouveauxMessages()
{
        objetXHR2 = creationXHR();
        objetXHR2.open("get", "ajax/actualiserNouveauxMessages.php?salon="+to, true);
        objetXHR2.onreadystatechange = actualiserMessage;
        objetXHR2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objetXHR2.send(null);
}

function actualiserUtilisateur() {
    if (objetXHR3.readyState == 4) {
	if (objetXHR3.status == 200) {
	    var result = objetXHR3.responseText;
	    document.getElementById('pseudo').innerHTML = result;
	}
	else{
	    //on annule la requete en cours.
	    objetXHR3.abort();
	    objetXHR3=null;
	}
    }
}

function afficherUtilisateurEnLigne()
{
    if(peopleButton == 1) salon = 0;
    else salon = to;
    objetXHR3 = creationXHR();
    objetXHR3.open("get", "ajax/actualiserUtilisateursEnLigne.php?salon="+salon, true);
    objetXHR3.onreadystatechange = actualiserUtilisateur;
    objetXHR3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objetXHR3.send(null);
}

$(document).ready(function(){
    /*if(notifButton == 1) $('#notifButton').attr('class', 'btn btn-danger btn-small active');*/
    if(peopleButton == 1) $('#peopleButton').attr('class', 'btn btn-info btn-small active');
    if(scrollButton == 1) $('#scrollButton').attr('class', 'btn btn-warning btn-small active');
    if(pauseButton == 1) $('#pauseButton').attr('class', 'btn btn-small active');
    
    /*
    $('#notifButton').click(function(){
        if(notifButton == 1){
            $(this).attr('class', 'btn btn-danger btn-small');
            rd_ajax(notifButton, peopleButton);
            notifButton = 0;
        }else{
            $(this).attr('class', 'btn btn-danger btn-small active');
            notifButton = 1;
        }
        rd_ajax(notifButton, peopleButton, scrollButton, pauseButton);
    });
    */
    $('#peopleButton').click(function(){
        if(peopleButton == 1){
            $(this).attr('class', 'btn btn-info btn-small');
            peopleButton = 0;
        }else{
            $(this).attr('class', 'btn btn-info btn-small active');
            peopleButton = 1;
        }
        rd_ajax(notifButton, peopleButton, scrollButton, pauseButton);
    });
    
    $('#scrollButton').click(function(){
        if(scrollButton == 1){
            $(this).attr('class', 'btn btn-warning btn-small');
            scrollButton = 0;
        }else{
            $(this).attr('class', 'btn btn-warning btn-small active');
            scrollButton = 1;
        }
        rd_ajax(notifButton, peopleButton, scrollButton, pauseButton);
    });
    
    $('#pauseButton').click(function(){
        if(pauseButton == 1){
            $(this).attr('class', 'btn btn-small');
            pauseButton = 0;
        }else{
            $(this).attr('class', 'btn btn-small active');
            pauseButton = 1;
        }
        rd_ajax(notifButton, peopleButton, scrollButton, pauseButton);
    });
    
    $('#text').keyup(function(){
	var nombre = 250 - $(this).val().length;
	var text = '';
	if(nombre > 15)
	    text = nombre + ' caractères restants';
	else if(nombre == 1 || nombre == 0)
	    text = '<span style="color:#EA8501;font-size:1.1em;">'+nombre+'</span> caractère restant';
	else if(nombre > 0)
	    text = '<span style="color:#EA8501;font-size:1.1em;">'+nombre+'</span> caractères restants';
	else if(nombre == -1)
	    text = '<span style="color:red;font-size:1.3em;">'+(nombre * (-1))+'</span> caractère tronqué';
	else
	    text = '<span style="color:red;font-size:1.3em;">'+(nombre * (-1))+'</span> caractères tronqués';
	$('#counter').html(text);
    });
});

// DRY
function rd_ajax(notif, people, scroll, pause){
    $.ajax({
        type    : 'POST',
        url     : 'ajax/modifPreferences.php',
        data    : 'notif='+notif+'&people='+people+'&scroll='+scroll+"&pause="+pause
    });

}

var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 1000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();

$(document).ready(function(){
	originalTitle = document.title;
	startChatSession();

	$([window, document]).blur(function(){
		windowFocus = false;
	}).focus(function(){
		windowFocus = true;
		document.title = originalTitle;
	});
});

function restructureChatBoxes() {
	align = 0;
	for (x in chatBoxes) {
		chatboxtitle = chatBoxes[x];

		if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
			if (align == 0) {
				$("#chatbox_"+chatboxtitle).css('right', '20px');
			} else {
				width = (align)*(225+7)+20;
				$("#chatbox_"+chatboxtitle).css('right', width+'px');
			}
			align++;
		}
	}
}

function chatWith(chatuser) {
	createChatBox(chatuser);
	$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox) {
	if ($("#chatbox_"+chatboxtitle).length > 0) {
		if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
			$("#chatbox_"+chatboxtitle).css('display','block');
			restructureChatBoxes();
		}
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		return;
	}

	$(" <div />" ).attr("id","chatbox_"+chatboxtitle)
	.addClass("chatbox")
	.html('<div class="chatboxhead"><div class="chatboxtitle">'+chatboxtitle+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\''+chatboxtitle+'\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+chatboxtitle+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div>')
	.appendTo($( "body" ));
			   
	$("#chatbox_"+chatboxtitle).css('bottom', '0px');
	
	chatBoxeslength = 0;

	for (x in chatBoxes) {
		if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
			chatBoxeslength++;
		}
	}

	if (chatBoxeslength == 0) {
		$("#chatbox_"+chatboxtitle).css('right', '20px');
	} else {
		width = (chatBoxeslength)*(225+7)+20;
		$("#chatbox_"+chatboxtitle).css('right', width+'px');
	}
	
	chatBoxes.push(chatboxtitle);

	if (minimizeChatBox == 1) {
		minimizedChatBoxes = new Array();

		if ($.cookie('chatbox_minimized')) {
			minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
		}
		minimize = 0;
		for (j=0;j<minimizedChatBoxes.length;j++) {
			if (minimizedChatBoxes[j] == chatboxtitle) {
				minimize = 1;
			}
		}

		if (minimize == 1) {
			$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
			$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
		}
	}

	chatboxFocus[chatboxtitle] = false;

	$("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
		chatboxFocus[chatboxtitle] = false;
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
	}).focus(function(){
		chatboxFocus[chatboxtitle] = true;
		newMessages[chatboxtitle] = false;
		$('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
	});

	$("#chatbox_"+chatboxtitle).click(function() {
		if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {
			$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		}
	});

	$("#chatbox_"+chatboxtitle).show();
}


function chatHeartbeat(){

	var itemsfound = 0;
	
	if (windowFocus == false) {
 
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in newMessagesWin) {
			if (newMessagesWin[x] == true) {
				++blinkNumber;
				if (blinkNumber >= blinkOrder) {
					document.title = x+' says...';
					titleChanged = 1;
					break;	
				}
			}
		}
		
		if (titleChanged == 0) {
			document.title = originalTitle;
			blinkOrder = 0;
		} else {
			++blinkOrder;
		}

	} else {
		for (x in newMessagesWin) {
			newMessagesWin[x] = false;
		}
	}

	for (x in newMessages) {
		if (newMessages[x] == true) {
			if (chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				$('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
			}
		}
	}
	
	$.ajax({
	  url: "chat.php?action=chatheartbeat",
	  cache: false,
	  dataType: "json",
	  success: function(data) {

		$.each(data.items, function(i,item){
			if (item)	{ // fix strange ie bug

				chatboxtitle = item.f;

				if ($("#chatbox_"+chatboxtitle).length <= 0) {
					createChatBox(chatboxtitle);
				}
				if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
					$("#chatbox_"+chatboxtitle).css('display','block');
					restructureChatBoxes();
				}
				
				if (item.s == 1) {
					item.f = username;
				}

				if (item.s == 2) {
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
				} else {
					newMessages[chatboxtitle] = true;
					newMessagesWin[chatboxtitle] = true;
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
				}

				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
				itemsfound += 1;
			}
		});

		chatHeartbeatCount++;

		if (itemsfound > 0) {
			chatHeartbeatTime = minChatHeartbeat;
			chatHeartbeatCount = 1;
		} else if (chatHeartbeatCount >= 10) {
			chatHeartbeatTime *= 2;
			chatHeartbeatCount = 1;
			if (chatHeartbeatTime > maxChatHeartbeat) {
				chatHeartbeatTime = maxChatHeartbeat;
			}
		}
		
		setTimeout('chatHeartbeat();',chatHeartbeatTime);
	}});
}

function closeChatBox(chatboxtitle) {
	$('#chatbox_'+chatboxtitle).css('display','none');
	restructureChatBoxes();

	$.post("chat.php?action=closechat", { chatbox: chatboxtitle} , function(data){	
	});

}

function toggleChatBoxGrowth(chatboxtitle) {
	if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') == 'none') {  
		
		var minimizedChatBoxes = new Array();
		
		if ($.cookie('chatbox_minimized')) {
			minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
		}

		var newCookie = '';

		for (i=0;i<minimizedChatBoxes.length;i++) {
			if (minimizedChatBoxes[i] != chatboxtitle) {
				newCookie += chatboxtitle+'|';
			}
		}

		newCookie = newCookie.slice(0, -1)


		$.cookie('chatbox_minimized', newCookie);
		$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','block');
		$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','block');
		$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
	} else {
		
		var newCookie = chatboxtitle;

		if ($.cookie('chatbox_minimized')) {
			newCookie += '|'+$.cookie('chatbox_minimized');
		}


		$.cookie('chatbox_minimized',newCookie);
		$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
		$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
	}
	
}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle) {
	 
	if(event.keyCode == 13 && event.shiftKey == 0)  {
		message = $(chatboxtextarea).val();
		message = message.replace(/^\s+|\s+$/g,"");

		$(chatboxtextarea).val('');
		$(chatboxtextarea).focus();
		$(chatboxtextarea).css('height','44px');
		if (message != '') {
			$.post("chat.php?action=sendchat", {to: chatboxtitle, message: message} , function(data){
				message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+'</span></div>');
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
			});
		}
		chatHeartbeatTime = minChatHeartbeat;
		chatHeartbeatCount = 1;

		return false;
	}

	var adjustedHeight = chatboxtextarea.clientHeight;
	var maxHeight = 94;

	if (maxHeight > adjustedHeight) {
		adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
		if (maxHeight)
			adjustedHeight = Math.min(maxHeight, adjustedHeight);
		if (adjustedHeight > chatboxtextarea.clientHeight)
			$(chatboxtextarea).css('height',adjustedHeight+8 +'px');
	} else {
		$(chatboxtextarea).css('overflow','auto');
	}
	 
}

function startChatSession(){  
	$.ajax({
	  url: "chat.php?action=startchatsession",
	  cache: false,
	  dataType: "json",
	  success: function(data) {
 
		username = data.username;

		$.each(data.items, function(i,item){
			if (item)	{ // fix strange ie bug

				chatboxtitle = item.f;

				if ($("#chatbox_"+chatboxtitle).length <= 0) {
					createChatBox(chatboxtitle,1);
				}
				
				if (item.s == 1) {
					item.f = username;
				}

				if (item.s == 2) {
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
				} else {
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
				}
			}
		});
		
		for (i=0;i<chatBoxes.length;i++) {
			chatboxtitle = chatBoxes[i];
			$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
			setTimeout('$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);', 100); // yet another strange ie bug
		}
	
	setTimeout('chatHeartbeat();',chatHeartbeatTime);
		
	}});
}

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
