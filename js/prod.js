function creationXHR(){var b=null;try{b=new XMLHttpRequest()}catch(a){try{b=new ActiveXObject("Msxml2.XMLHTTP")}catch(a){try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){b=null}}}return b}function timeMessage(){var a=false;var b=setInterval(function(){if(pauseButton==0){genererNouveauxMessages();afficherUtilisateurEnLigne()}if(scrollButton==1){elementScroll=document.getElementById("message");elementScroll.scrollTop=elementScroll.scrollHeight}},1000)}function initialisation(){document.getElementById("bouton").onclick=function(){envoi()};document.getElementById("text").addEventListener("keyup",function(a){if(a.keyCode==13){envoi()}});timeMessage()}function envoi(){$("#counter").html("150 caracères restants");var a=document.getElementById("text").value;document.getElementById("text").value="";objetXHREnvoi=creationXHR();var b="message="+a+"&salon="+to;objetXHREnvoi.open("post","ajax/envoyerMessage.php",true);objetXHREnvoi.setRequestHeader("Content-type","application/x-www-form-urlencoded");objetXHREnvoi.send(b)}function actualiserNotif(){if(objetXHRNotif.readyState==4){if(objetXHRNotif.status==200){var c=objetXHRNotif.responseText;var b=c.split(",");var a=0;for(a=0;a<4;++a){document.getElementById("salon"+a).value=b[a];if(b[a]>0){document.getElementById("salon"+a).style.display=""}else{document.getElementById("salon"+a).style.display="none"}}}else{objetXHRNotif.abort();objetXHRNotif=null}}}function genererNotification(b,a){objetXHRNotif=creationXHR();var c="id_etudiant="+b+"&salon="+a;objetXHRNotif.open("post","ajax/actualiserNotif.php",true);objetXHRNotif.onreadystatechange=actualiserNotif;objetXHRNotif.setRequestHeader("Content-type","application/x-www-form-urlencoded");objetXHRNotif.send(c)}function actualiserMessage(){if(objetXHR2.readyState==4){if(objetXHR2.status==200){var a=objetXHR2.responseText;document.getElementById("message").innerHTML=a}else{objetXHR2.abort();objetXHR2=null}}}function genererNouveauxMessages(){objetXHR2=creationXHR();objetXHR2.open("get","ajax/actualiserNouveauxMessages.php?salon="+to,true);objetXHR2.onreadystatechange=actualiserMessage;objetXHR2.setRequestHeader("Content-type","application/x-www-form-urlencoded");objetXHR2.send(null)}function actualiserUtilisateur(){if(objetXHR3.readyState==4){if(objetXHR3.status==200){var a=objetXHR3.responseText;document.getElementById("pseudo").innerHTML=a}else{objetXHR3.abort();objetXHR3=null}}}function afficherUtilisateurEnLigne(){if(peopleButton==1){salon=0}else{salon=to}objetXHR3=creationXHR();objetXHR3.open("get","ajax/actualiserUtilisateursEnLigne.php?salon="+salon,true);objetXHR3.onreadystatechange=actualiserUtilisateur;objetXHR3.setRequestHeader("Content-type","application/x-www-form-urlencoded");objetXHR3.send(null)}$(document).ready(function(){if(peopleButton==1){$("#peopleButton").attr("class","btn btn-info btn-small active")}if(scrollButton==1){$("#scrollButton").attr("class","btn btn-warning btn-small active")}if(pauseButton==1){$("#pauseButton").attr("class","btn btn-small active")}$("#peopleButton").click(function(){if(peopleButton==1){$(this).attr("class","btn btn-info btn-small");peopleButton=0}else{$(this).attr("class","btn btn-info btn-small active");peopleButton=1}rd_ajax(notifButton,peopleButton,scrollButton,pauseButton)});$("#scrollButton").click(function(){if(scrollButton==1){$(this).attr("class","btn btn-warning btn-small");scrollButton=0}else{$(this).attr("class","btn btn-warning btn-small active");scrollButton=1}rd_ajax(notifButton,peopleButton,scrollButton,pauseButton)});$("#pauseButton").click(function(){if(pauseButton==1){$(this).attr("class","btn btn-small");pauseButton=0}else{$(this).attr("class","btn btn-small active");pauseButton=1}rd_ajax(notifButton,peopleButton,scrollButton,pauseButton)});$("#text").keyup(function(){var b=250-$(this).val().length;var a="";if(b>15){a=b+" caractères restants"}else{if(b==1||b==0){a='<span style="color:#EA8501;font-size:1.1em;">'+b+"</span> caractère restant"}else{if(b>0){a='<span style="color:#EA8501;font-size:1.1em;">'+b+"</span> caractères restants"}else{if(b==-1){a='<span style="color:red;font-size:1.3em;">'+(b*(-1))+"</span> caractère tronqué"}else{a='<span style="color:red;font-size:1.3em;">'+(b*(-1))+"</span> caractères tronqués"}}}}$("#counter").html(a)})});function rd_ajax(b,c,a,d){$.ajax({type:"POST",url:"ajax/modifPreferences.php",data:"notif="+b+"&people="+c+"&scroll="+a+"&pause="+d})}var windowFocus=true;var username;var chatHeartbeatCount=0;var minChatHeartbeat=1000;var maxChatHeartbeat=33000;var chatHeartbeatTime=minChatHeartbeat;var originalTitle;var blinkOrder=0;var chatboxFocus=new Array();var newMessages=new Array();var newMessagesWin=new Array();var chatBoxes=new Array();$(document).ready(function(){originalTitle=document.title;startChatSession();$([window,document]).blur(function(){windowFocus=false}).focus(function(){windowFocus=true;document.title=originalTitle})});function restructureChatBoxes(){align=0;for(x in chatBoxes){chatboxtitle=chatBoxes[x];if($("#chatbox_"+chatboxtitle).css("display")!="none"){if(align==0){$("#chatbox_"+chatboxtitle).css("right","20px")}else{width=(align)*(225+7)+20;$("#chatbox_"+chatboxtitle).css("right",width+"px")}align++}}}function chatWith(a){createChatBox(a);$("#chatbox_"+a+" .chatboxtextarea").focus()}function createChatBox(b,a){if($("#chatbox_"+b).length>0){if($("#chatbox_"+b).css("display")=="none"){$("#chatbox_"+b).css("display","block");restructureChatBoxes()}$("#chatbox_"+b+" .chatboxtextarea").focus();return}$(" <div />").attr("id","chatbox_"+b).addClass("chatbox").html('<div class="chatboxhead"><div class="chatboxtitle">'+b+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\''+b+'\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+b+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+b+"');\"></textarea></div>").appendTo($("body"));$("#chatbox_"+b).css("bottom","0px");chatBoxeslength=0;for(x in chatBoxes){if($("#chatbox_"+chatBoxes[x]).css("display")!="none"){chatBoxeslength++}}if(chatBoxeslength==0){$("#chatbox_"+b).css("right","20px")}else{width=(chatBoxeslength)*(225+7)+20;$("#chatbox_"+b).css("right",width+"px")}chatBoxes.push(b);if(a==1){minimizedChatBoxes=new Array();if($.cookie("chatbox_minimized")){minimizedChatBoxes=$.cookie("chatbox_minimized").split(/\|/)}minimize=0;for(j=0;j<minimizedChatBoxes.length;j++){if(minimizedChatBoxes[j]==b){minimize=1}}if(minimize==1){$("#chatbox_"+b+" .chatboxcontent").css("display","none");$("#chatbox_"+b+" .chatboxinput").css("display","none")}}chatboxFocus[b]=false;$("#chatbox_"+b+" .chatboxtextarea").blur(function(){chatboxFocus[b]=false;$("#chatbox_"+b+" .chatboxtextarea").removeClass("chatboxtextareaselected")}).focus(function(){chatboxFocus[b]=true;newMessages[b]=false;$("#chatbox_"+b+" .chatboxhead").removeClass("chatboxblink");$("#chatbox_"+b+" .chatboxtextarea").addClass("chatboxtextareaselected")});$("#chatbox_"+b).click(function(){if($("#chatbox_"+b+" .chatboxcontent").css("display")!="none"){$("#chatbox_"+b+" .chatboxtextarea").focus()}});$("#chatbox_"+b).show()}function chatHeartbeat(){var c=0;if(windowFocus==false){var b=0;var a=0;for(x in newMessagesWin){if(newMessagesWin[x]==true){++b;if(b>=blinkOrder){document.title=x+" says...";a=1;break}}}if(a==0){document.title=originalTitle;blinkOrder=0}else{++blinkOrder}}else{for(x in newMessagesWin){newMessagesWin[x]=false}}for(x in newMessages){if(newMessages[x]==true){if(chatboxFocus[x]==false){$("#chatbox_"+x+" .chatboxhead").toggleClass("chatboxblink")}}}$.ajax({url:"chat.php?action=chatheartbeat",cache:false,dataType:"json",success:function(d){$.each(d.items,function(e,f){if(f){chatboxtitle=f.f;if($("#chatbox_"+chatboxtitle).length<=0){createChatBox(chatboxtitle)}if($("#chatbox_"+chatboxtitle).css("display")=="none"){$("#chatbox_"+chatboxtitle).css("display","block");restructureChatBoxes()}if(f.s==1){f.f=username}if(f.s==2){$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+f.m+"</span></div>")}else{newMessages[chatboxtitle]=true;newMessagesWin[chatboxtitle]=true;$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+f.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+f.m+"</span></div>")}$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);c+=1}});chatHeartbeatCount++;if(c>0){chatHeartbeatTime=minChatHeartbeat;chatHeartbeatCount=1}else{if(chatHeartbeatCount>=10){chatHeartbeatTime*=2;chatHeartbeatCount=1;if(chatHeartbeatTime>maxChatHeartbeat){chatHeartbeatTime=maxChatHeartbeat}}}setTimeout("chatHeartbeat();",chatHeartbeatTime)}})}function closeChatBox(a){$("#chatbox_"+a).css("display","none");restructureChatBoxes();$.post("chat.php?action=closechat",{chatbox:a},function(b){})}function toggleChatBoxGrowth(b){if($("#chatbox_"+b+" .chatboxcontent").css("display")=="none"){var c=new Array();if($.cookie("chatbox_minimized")){c=$.cookie("chatbox_minimized").split(/\|/)}var a="";for(i=0;i<c.length;i++){if(c[i]!=b){a+=b+"|"}}a=a.slice(0,-1);$.cookie("chatbox_minimized",a);$("#chatbox_"+b+" .chatboxcontent").css("display","block");$("#chatbox_"+b+" .chatboxinput").css("display","block");$("#chatbox_"+b+" .chatboxcontent").scrollTop($("#chatbox_"+b+" .chatboxcontent")[0].scrollHeight)}else{var a=b;if($.cookie("chatbox_minimized")){a+="|"+$.cookie("chatbox_minimized")}$.cookie("chatbox_minimized",a);$("#chatbox_"+b+" .chatboxcontent").css("display","none");$("#chatbox_"+b+" .chatboxinput").css("display","none")}}function checkChatBoxInputKey(d,c,e){if(d.keyCode==13&&d.shiftKey==0){message=$(c).val();message=message.replace(/^\s+|\s+$/g,"");$(c).val("");$(c).focus();$(c).css("height","44px");if(message!=""){$.post("chat.php?action=sendchat",{to:e,message:message},function(f){message=message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");$("#chatbox_"+e+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+"</span></div>");$("#chatbox_"+e+" .chatboxcontent").scrollTop($("#chatbox_"+e+" .chatboxcontent")[0].scrollHeight)})}chatHeartbeatTime=minChatHeartbeat;chatHeartbeatCount=1;return false}var b=c.clientHeight;var a=94;if(a>b){b=Math.max(c.scrollHeight,b);if(a){b=Math.min(a,b)}if(b>c.clientHeight){$(c).css("height",b+8+"px")}}else{$(c).css("overflow","auto")}}function startChatSession(){$.ajax({url:"chat.php?action=startchatsession",cache:false,dataType:"json",success:function(a){username=a.username;$.each(a.items,function(b,c){if(c){chatboxtitle=c.f;if($("#chatbox_"+chatboxtitle).length<=0){createChatBox(chatboxtitle,1)}if(c.s==1){c.f=username}if(c.s==2){$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+c.m+"</span></div>")}else{$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+c.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+c.m+"</span></div>")}}});for(i=0;i<chatBoxes.length;i++){chatboxtitle=chatBoxes[i];$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);setTimeout('$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);',100)}setTimeout("chatHeartbeat();",chatHeartbeatTime)}})}jQuery.cookie=function(b,k,n){if(typeof k!="undefined"){n=n||{};if(k===null){k="";n.expires=-1}var e="";if(n.expires&&(typeof n.expires=="number"||n.expires.toUTCString)){var f;if(typeof n.expires=="number"){f=new Date();f.setTime(f.getTime()+(n.expires*24*60*60*1000))}else{f=n.expires}e="; expires="+f.toUTCString()}var m=n.path?"; path="+(n.path):"";var g=n.domain?"; domain="+(n.domain):"";var a=n.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(k),e,m,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var l=document.cookie.split(";");for(var h=0;h<l.length;h++){var c=jQuery.trim(l[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};