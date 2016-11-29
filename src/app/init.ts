export class Init {
	load(){
		if(localStorage.getItem('markers') == null || localStorage.getItem('markers') === undefined){
			let	markers = [
			  {
			  	name: 'some name',
			  	lat: 61.2084407,
			  	lng: -149.8783949,
			  	draggable: true
			  },
			  {
			  	name: 'some name 2',
			  	lat: 61.2011835,
			  	lng: -149.8394389,
			  	draggable: true
			  },
			  {
			  	name: 'some name 3',
			  	lat: 61.207208,
			  	lng: -149.8727641,
			  	draggable: true
			  }

		  ];

		  localStorage.setItem('markers', JSON.stringify(markers));
		} else {
			console.log('loading markers')
		}
	}
}
