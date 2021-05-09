window.onload = () => {
    console.log("updating")
    if (window.jQuery) {  
        // jQuery is loaded  
        console.log("working")
    } else {
        // jQuery is not loaded
        console.log("not workin")
    }
    try {
        if (getCookie("_akey") != null) {
            var accessToken = JSON.parse(atob(getCookie("_akey")))
            console.log(accessToken)
            if (accessToken == null) {
                console.log("Bad")
            }
            else {   
                var logindiv = document.getElementById("logindiv");
                var logbtn = document.getElementById("login");
                logindiv.setAttribute("class", "dropdown col-lg-3 text-end bg-dark");
                logbtn.remove()
                document.getElementById("inviterem").remove() 
                $("#logindiv").append(`  
                <button class="btn btn-secondary dropdown-toggle bg-dark" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                <img style="border-radius: 50px;" src=${"https://cdn.discordapp.com/avatars/" + accessToken.id + "/" + accessToken.avatar + ".png"} width="27" height="27"><span>&nbsp;${accessToken.username}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                    <li><a class="dropdown-item active" href="#">Dashboard</a></li>
                    <li><a class="dropdown-item" href="#">Stats</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" onclick="logOut()" href="#"><span style="color: red;">Log out</span></a></li>
                </ul><span>&nbsp;</span>`)
                
            }
            
            }//else {
             //   $("#logindiv").append(`          <a id="inviterem" href="https://discord.com/api/oauth2/authorize?client_id=735435167837061170&redirect_uri=http%3A%2F%2Flocalhost%3A80&response_type=token&scope=identify">
             //   <button type="button" id="login" class="btn btn-outline-light me-2 rounded-4 p-2">&nbsp;&nbsp;&nbsp;&nbsp;Log in&nbsp;&nbsp;&nbsp;&nbsp;</button>
             //     </a>`)
            //}
    
    } catch {
        
    }
    function getCookie(name) {
        try {
            return document.cookie.split(name + "=")[1].split(';')[0];
        } catch {
            return null;
        }
    }
    try {
        var fragment = new URLSearchParams(window.location.hash.slice(1));
        var [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
        
        if (!accessToken) {
            console.log(accessToken)
        }
        else{
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            }
        })
            .then(result => result.json())
            .then(response => {
                var { username, discriminator } = response;
                document.cookie =  "_akey="+ btoa(JSON.stringify(response))
                window.history.pushState( {} , '', '/' );
                 var logindiv = document.getElementById("logindiv");
                 var logbtn = document.getElementById("login");
                 document.getElementById("inviterem").remove()
                 logbtn.remove()
                 logindiv.setAttribute("class", "dropdown col-lg-3 text-end bg-dark");
                 
                 $("#logindiv").append(`  
                 <button class="btn btn-secondary dropdown-toggle bg-dark" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                 <img style="border-radius: 50px;" src=${"https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png"} width="27" height="27"><span>&nbsp;${response.username}</span>
                 </button>
                 <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                     <li><a class="dropdown-item active" href="#">Dashboard</a></li>
                     <li><a class="dropdown-item" href="#">Stats</a></li>
                     <li><hr class="dropdown-divider"></li>
                     <li><a class="dropdown-item" id="logout" href="#"><span style="color: red;">Log out</span></a></li>
                 </ul><span>&nbsp;</span>`)
               $("#logout").click( function() {
                    document.cookie = "_akey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    location.reload()
                })
                
            })
            .catch(console.error);
            
            
               
           
        
            
        }

    }
    catch {
        
    }
};
function getCookie(name) {
    try {
        return document.cookie.split(name + "=")[1].split(';')[0];
    } catch {
        return null;
    }
}
if (getCookie("_akey") != null) {
    function logOut () {
        document.cookie = "_akey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        location.reload()
    }
}
