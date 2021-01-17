define(["dojo", "dojo/_base/declare"], (dojo, declare) => {
  return declare("alhambra.alhambraBoardTrait", null, {
    constructor(){
      /*
      this._notifications.push(
        ['newHand', 100],
        ['giveCard', 1000],
        ['receiveCard', 1000]
      );
      */
      this.alhambraWrappers = [];
    },

    setupAlhambra(player){
      this.alhambraWrappers[player.id] = new ebg.wrapper();
      this.alhambraWrappers[player.id].create(this, $('alhambra-' + player.id), $( 'alhambra-inner-' + player.id));
      this.alhambraWrappers[player.id].item_size = 95;

      player.board.buildings.forEach(building => this.addToAlhambra(building, player.id));

      // Do not mark any building at setup time
      dojo.query('.building-last-placed').removeClass('building-last-placed' );
    },


    addToAlhambra(building, pId){
      let bId = 'building-tile-' + building.id;
      //dojo.query( '.building_last_placed' ).removeClass( 'building_last_placed' );

      var bAlreadyExist = false;
      if($(bId)){
          bAlreadyExist = true;
          if(pId != 0)
            this.stockZones[pId].removeFromZone(bId, false);
          this.attachToNewParent(bId, $('alhambra-inner-' + pId));
      } else {
        this.addBuilding(building, 'alhambra-inner-' + pId);
      }


      // Place this tile in player alhambra
      let x = parseInt( building.x, 10 );
      let y = parseInt( building.y, 10 );

      // Update freeplace if needed
      if(pId == this.player_id ){
        dojo.destroy('free-place-' + x + '-' + y);
      }


      // item position is relative to player's alhambra fountain position
      let itemSize = this.alhambraWrappers[pId].item_size;
      dojo.style(bId, "width",  itemSize + 'px');
      dojo.style(bId, "height", itemSize + 'px');

      let tgtX = (x*itemSize);
      let tgtY = (y*itemSize);

      this.slidePos(bId, 'alhambra-inner-' + pId, tgtX, tgtY, bAlreadyExist? 800 : 0)
      .then(() => {
        this.alhambraWrappers[pId].rewrap();
        this.adaptAlhambra(pId);
      });

      // Add the "last placed" class
      dojo.addClass(bId, 'building-last-placed');

/*
TODO
        if( player_id == this.player_id )
        {
            if( parseInt( x, 10 ) !== 0 || parseInt( y, 10 ) !== 0 )  // Filter fountain
            {
                // Add the "remove building" icon
               this.addTooltip( 'rm_'+building.id, '', _("Remove this building from your Alhambra and place it in your stock") );
               dojo.connect( $('rm_'+building.id), 'onclick', this, 'onRemoveBuilding' );
           }
        }
*/
    },


    adaptAlhambra(pId){

      this.alhambraWrappers[pId].rewrap();
      return;

        if( typeof this.alhambra_wrapper[ player_id] == 'undefined')
        {
            return ;
        }

        // Adapt alhambra size & position to make sure it matches the current space
        var coords_container = dojo.position( 'alhambra_wrap_'+player_id );
        var max_width = coords_container.w;

        var coords_alhambra = dojo.position( 'alhambra_'+player_id );
        var width = coords_alhambra.w;
        var height = coords_alhambra.h;


        if( width > max_width  )
        {
            // The alhambra does not fit (in the width)
            var old_size = this.alhambra_wrapper[ player_id ].item_size;
            var new_size = toint( Math.floor( this.alhambra_wrapper[ player_id ].item_size / width * max_width ) );

            // Change tiles size to this size
            this.alhambra_wrapper[ player_id ].item_size = new_size;

            dojo.query( '#alhambra_'+player_id+' .building_tile' ).forEach( dojo.hitch( this, function( node ) {
                dojo.style( node, 'left', ( dojo.style( node, 'left' ) * new_size / old_size ) + 'px' );
                dojo.style( node, 'top', ( dojo.style( node, 'top' ) * new_size / old_size ) + 'px' );
                dojo.style( node, 'width',  new_size + 'px' );
                dojo.style( node, 'height', new_size + 'px' );
                dojo.style( node, 'backgroundSize', (new_size*7) + 'px '+(new_size*11)+'px' );
            } ) );

            this.alhambra_wrapper[ player_id ].rewrap();

        }
        else
        {
            // It fits... but may it be larger?
            var old_size = this.alhambra_wrapper[ player_id ].item_size;
            var new_size = Math.min( 95, Math.floor( old_size * max_width / width ) );
            if( new_size > old_size )
            {
                // We can enlarge the size !
                this.alhambra_wrapper[ player_id ].item_size = new_size;

                dojo.query( '#alhambra_'+player_id+' .building_tile' ).forEach( dojo.hitch( this, function( node ) {
                    dojo.style( node, 'left', ( dojo.style( node, 'left' ) * new_size / old_size ) + 'px' );
                    dojo.style( node, 'top', ( dojo.style( node, 'top' ) * new_size / old_size ) + 'px' );
                    dojo.style( node, 'width',  new_size + 'px' );
                    dojo.style( node, 'height', new_size + 'px' );
                    dojo.style( node, 'backgroundSize', (new_size*7) + 'px '+(new_size*11)+'px' );
                } ) );

                this.alhambra_wrapper[ player_id ].rewrap();

            }
        }

        // Center the new alhambra
        var coords_alhambra = dojo.position( 'alhambra_'+player_id );
        var width = coords_alhambra.w;
        var height = coords_alhambra.h;

        this.slideToObjectPos( 'alhambra_'+player_id, 'alhambra_wrap_'+player_id, (max_width-width)/2, 40 ).play();

    },


    /*
     * Add a free place to this x/y if needed (if there is not already alnother one)
     */
    addFreePlace(x, y){
      let divId = 'free-place-' + x + "-" + y,
          pId = this.player_id;

      if($(divId))
        return;

      this.place('jstpl_freePlace', { x, y}, 'alhambra-inner-' + pId);
      let item_size = this.alhambraWrappers[pId].item_size;

      dojo.style(divId, {
        left: (x*item_size)+'px',
        top: (y*item_size)+'px',
        width: (item_size)+'px',
        height: (item_size)+'px'
      });
      dojo.connect($(divId), 'onclick', () => this.onClickFreePlaceToDrop(x,y) );
    },
  });
});