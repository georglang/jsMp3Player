define(['jQuery', 'views/tracklistView'], function($) {
	
	var TracklistView = function(model, $element) {

		this.tracks = 0;
		this.currentTrackId = 0;

		model.getTracklist();
		this.tracks = model.tracks;

		for(var i=0; i<this.tracks.length; i++){
			insertTracklistItem(i, this.tracks);
		}

		function insertTracklistItem(i, track){
			var tracklist = $("<div id='track"+ track[i].id + "'" + "dragable='true'" + "class='singleTrack'" + ">" + track[i].title + "</div>");
			$('#tracklist').append(tracklist);
			
			tracklist.dblclick(function(e) {
			  	//model.setTrackSource();
			  	console.log("Track Id: ", track[i].id);
			  	model.setCurrentTrackId(track[i].id);
			  	console.log("currentTrackId: ", track[i].id);
			});
		}//insert Tracklist

		//markiert Ersten Tack
		$('#track0').addClass('activeTrack');

		//aktuellen Track markieren
		$(model).on('changetrack',function(){
			this.currentTrackId = model.getCurrentTrackId();
		  	$('#tracklist > div').removeClass('activeTrack');
			$('#track'+ this.currentTrackId).addClass('activeTrack');
		});

		var dragSrcEl = null;
		var dragTarget = 0; //ablegeziel
		var insertAfter = true;

		function handleDragStart(e) {
			// Target (this) element is the source node.
			this.style.opacity = '0.4';

			dragSrcEl = this;
			dragTarget = console.log('SSSSSSSSS',$(this).next());


			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/html', this.innerHTML);
			$('#tracklist').append('<div class="singleTrack></div>')
		}

		function handleDrop(e) {
			// this/e.target is current target element.

			if (e.stopPropagation) {
				e.stopPropagation(); // Stops some browsers from redirecting.
			}

			// Don't do anything if dropping the same column we're dragging.
			/*if (dragSrcEl != this) {
				// Set the source column's HTML to the HTML of the columnwe dropped on.
				dragSrcEl.innerHTML = this.innerHTML;
				this.innerHTML = e.dataTransfer.getData('text/html');
			}*/

			var startElement = $(dragSrcEl).detach(); //same remove, daten bleiben erhalten +=
			
			if(insertAfter)
				startElement.insertAfter(dragTarget); //fuegt nach element ein, über das gedragt wird
			else
				startElement.insertBefore(dragTarget);

			return false;
		}
	
		function handleDragOver(e) {
		  if (e.preventDefault) {
		    e.preventDefault(); // Necessary. Allows us to drop.
		  }

		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		  	//mouseposition y von aktuellem event
		    if (window.event.pageY > ($(window.event.target).offset().top + $(window.event.target).height() / 2)) {
				insertAfter = true;
				$(window.event.target).addClass('insertAfter');
				$(window.event.target).removeClass('insertBefore');
			} 
			else {
				insertAfter = false;
				$(window.event.target).addClass('insertBefore');
				$(window.event.target).removeClass('insertAfter');
			}


		  return false;
		}

		function handleDragEnter(e) {
			// this / e.target is the current hover target.
			//this.classList.add('over');
			dragTarget = $(this); //aktuelles element über das gehovert wird
			/*if($(this).is('.singleTrack:first-child'))
				insertAfter = false;
			else
				insertAfter = true;
		*/
		}

		function handleDragLeave(e) {
			$('.singleTrack').each(function(){
				$(this).removeClass('insertAfter insertBefore');
			});
		}

		function handleDragEnd(){
			$('.singleTrack').each(function(){
				$(this).removeClass('insertAfter insertBefore');
			});
			this.style.opacity = '1.0';
		}

		var cols = document.querySelectorAll('#tracklist .singleTrack');
		[].forEach.call(cols, function(col) {
		  col.addEventListener('dragstart', handleDragStart, false);
		  col.addEventListener('dragenter', handleDragEnter, false)
		  col.addEventListener('dragover', handleDragOver, false);
		  col.addEventListener('dragleave', handleDragLeave, false);
		  col.addEventListener('dragend', handleDragEnd, false);
		});

		var tacklistQuery = document.querySelectorAll('#tracklist');
		[].forEach.call(cols, function(col) {
			col.addEventListener('drop', handleDrop, false);
		});



};//TracklistView
	return TracklistView;
});
