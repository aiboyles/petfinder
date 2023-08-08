function findPet() {
  // we are using the PetFinder SDK
  // located here: https://github.com/petfinder-com/petfinder-js-sdk
  var pf = new petfinder.Client({
    apiKey: process.env["PETFINDER_API_KEY"],
    secret: process.env["PETFINDER_SECRET"]
  });

  // details on how to use search functionality located
  // here: https://www.petfinder.com/developers/v2/docs/#get-animals
  pf.animal
    .search({
      location: 91107, // TODO: change to be able to set search location
      distance: 50,
      limit: 50
    })
    .then(function (response) {
      console.log(response.data.animals);
      // Do something with `response.data.animals`
      filterAndDisplayPets(response.data.animals);
    })
    .catch(function (error) {
      // Handle the error
      console.log(error);
    });
}

function filterAndDisplayPets(data) {
  var petsHolder = document.getElementById("petsHolder");
  var str = "";
  for (var p of data) {
    if (p.photos.length > 0 && p.description != null) {
      str =
        "<div class='petbox column'><a href='" + p.url + "' target='newtab'>";
      str += "<img src='" + p.photos[0].medium + "' class='petpic'/></a>";
      str += "<h3>" + p.name + "</h3><p>" + p.description + "</p></div>";
      petsHolder.innerHTML += str;
    }
  }
}
