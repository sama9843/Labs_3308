function makeApiCall()
{
    var result = document.getElementById("searchresult").value;
    var search = result.split(' ').join('+');
    $(document).ready(function() {
        var url = 'https://www.omdbapi.com/?s='+search+'&apikey=761152f9&r=json';
        //console.log(url);
        $.ajax({url:url, dataType:"json"}).then(function(data) {
            console.log(data);
            var movies = document.getElementById("placeholder");
            var length = data.Search.length;
            var movie_cards = "";
            for(var i=0; i < length; i++)
            {
                movie_cards += '<div class="card" style="width:250px; height:500px;"><img src="'+ data.Search[i].Poster +'" class="card-img-top" alt="..." style="background-repeat: no-repeat; background-position: 50% 50%; background-size: cover; width: 250px; height: 350px;"><div class="card-body"><h5 class="card-title">'+ data.Search[i].Title +'</h5><button type="button" id="'+data.Search[i].Title+'"class="btn btn-primary" onclick="review(this.id)">Review</button></div></div>';
            }
            movies.innerHTML = movie_cards;
        })
    });
}


var modal = document.getElementById("reviewModal");
var span = document.getElementsByClassName("close")[0];

function review(id)
{
    modal.style.display = "block";
    document.getElementById("title").value = id;
}
span.onclick = function(){
    modal.style.display = "none";
};

function disable()
{
    document.getElementById("title").disabled = false;
}