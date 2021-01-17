define(["dojo", "dojo/_base/declare"], (dojo, declare) => {
  const DIRK = 0;
  return declare("alhambra.playerTrait", null, {
    constructor(){
      /*
      this._notifications.push(
        ['newHand', 100],
        ['giveCard', 1000],
        ['receiveCard', 1000]
      );
      */
      this.statCounters = {};
    },

    setupPlayers(){
      Object.values(this.gamedatas.players).forEach(player => {
        let pId = player.id;

        if(this.player_id == pId){
          this.place('jstpl_currentPlayerPanel', player, 'upper-part');
          this.setupMoneyHand(player.hand);
        } else {
          this.place('jstpl_playerPanel', player, 'bottom-part');
        }

        // Setup stock of player
        this.setupStock(player);

        // Setup Alhambra of player
        this.setupAlhambra(player);

        // Setup board for stats
        this.setupPlayerStat(player);
      });


      let neutral = this.gamedatas.neutral;
      if(this.gamedatas.isNeutral){
        neutral.name = _('Dirk (neutral player)');
        this.place('jstpl_playerPanel', neutral, 'bottom-part');
        this.setupAlhambra(neutral);

        this.place('jstpl_neutralPlayerBoard', neutral, 'player_boards');
        this.setupPlayerStat(neutral);
        /*
        TODO
          dojo.place( this.format_block('jstpl_neutral_player_board', {
            id:0,
              color:'000000',
              name:
          } ), $('player_boards') );

            var player_id = 0;
            var player_board_div = $('player_board_'+player_id);
            dojo.place( this.format_block('jstpl_player_board', {id: player_id } ), player_board_div );
          *

            $('wallnbr_'+player_id).innerHTML = player.longest_wall;

            if( gamedatas.alamb_stats[ player_id ] )
            {
                for( var building_type_id in gamedatas.alamb_stats[ player_id ] )
                {
                    $('btnbr_'+building_type_id+'_'+player_id).innerHTML = gamedatas.alamb_stats[ player_id ][ building_type_id ];
                }
            }

          }*/
      }



      /*
      for( player_id in gamedatas.players )
      {

          this.alamb_stock[ player_id ] = new ebg.zone();
          this.alamb_stock[ player_id ].create( this, $('stock_'+player_id), 95, 95 );
          if( player_id != this.player_id )
          {
              this.alamb_stock[ player_id ].autowidth = true;
          }
          this.alamb_stock[ player_id ].setFluidWidth();

          $('wallnbr_'+player_id).innerHTML = player.longest_wall;

          if( gamedatas.alamb_stats[ player_id ] )
          {
              for( var building_type_id in gamedatas.alamb_stats[ player_id ] )
              {
                  $('btnbr_'+building_type_id+'_'+player_id).innerHTML = gamedatas.alamb_stats[ player_id ][ building_type_id ];
              }
          }
      }
*/
      this.updatePlayersStats();
    },


    setupPlayerStat(player){
      let pId = player.id;
      this.place('jstpl_playerStats', player, 'player_board_' + pId);
      this.statCounters[pId] = {};
      for(var i = 1; i <= 6; i++){
        this.statCounters[pId][i] = new ebg.counter();
        this.statCounters[pId][i].create("stat-" + pId + "-" + i);
      }
      this.statCounters[pId]["wall"] = new ebg.counter();
      this.statCounters[pId]["wall"].create("stat-" + pId + "-wall");
      this.statCounters[pId]["card"] = new ebg.counter();
      this.statCounters[pId]["card"].create("card-" + pId + "-nbr");
    },

    updatePlayersStats(){
      let updatePlayer = (player) => {
        for(var i = 1; i <= 6; i++){
          this.statCounters[player.id][i].toValue(player.board.stats[i]);
        }
        this.statCounters[player.id]["wall"].toValue(player.board.wall);
        this.statCounters[player.id]["card"].toValue(player.cardCount);
      };

      Object.values(this.gamedatas.players).forEach(updatePlayer);
      if(this.gamedatas.isNeutral){
        updatePlayer(this.gamedatas.neutral);
      }
    },
  });
});