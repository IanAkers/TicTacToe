(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$boardEl = $el;
    this.game = game;
  };

  View.prototype.bindEvents = function () {
    var game = this.game;
    var view = this;
    $('.space').on("click", function(){
      var currentTarget = event.currentTarget;
      console.log("clicked");
      console.log(currentTarget);
      var $currentTarget = $(currentTarget);
      view.makeMove($currentTarget);
    })

  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("pos");
    this.game.board.placeMark(pos, this.game.currentPlayer);

    $square.text(this.game.currentPlayer.toUpperCase());
    $square.addClass("highlighted");

    if (this.game.isOver()){
      if (this.game.winner() == this.game.currentPlayer){
        alert(this.game.winner().toUpperCase() +" Wins!");
      }else{
        alert("It's A Draw!");
      }
    }

    this.game.swapTurn();
  };

  View.prototype.setupBoard = function () {
    var $boardUl = $("<ul class=board-ul></ul>");
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        var $space = $("<li class=space></li>");
        $space.data("pos", [i,j]);
        $boardUl.append($space);
      }
    }
    var $boardEl = this.$boardEl;
    $boardEl.append($boardUl);
    $('body').append($boardEl);
  };
})();
