//Funcionamiento del botón  de google
function onSignIn(googleUser) {
  // Datos útiles para sus scripts del lado del cliente:
  var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId());
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());

  let perfil = {};

  perfil.dato = profile.getName();
  perfil.imagen = profile.getImageUrl();
  localStorage.setItem('user',JSON.stringify(perfil));
  location.href ="inicio.html";

  var id_token = googleUser.getAuthResponse().id_token;
  // console.log("ID Token: " + id_token);
}
//Funciones para salir correctamente de OAuth
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      //Lo que quiero hacer cuando me desconecto
    });
  }
function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}
