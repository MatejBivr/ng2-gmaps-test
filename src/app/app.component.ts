import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MarkerService } from './marker.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	markerForm: FormGroup;
  zoom: number = 12;
  lat: number = 61.207208;
  lng: number = -149.8727641;
  markers;
  

  constructor(public fb: FormBuilder, private markerService:MarkerService){
  	this.markerForm = this.fb.group({
  		name: ['', Validators.required],
  		lat: ['', Validators.required],
  		lng: ['', Validators.required],
  		draggable: [false]
  	});

    this.markers = this.markerService.getMarkers();
  }

  clickedMarker(marker:marker, index:number){
  	console.log('clicked marker'+marker.name)
  }

  mapClicked($event:MouseEvent){
  		var newMarker = {
  		name: 'untitled',
  		lat: $event.coords.lat,
  		lng: $event.coords.lng,
  		draggable: false
  	}

  	this.markers.push(newMarker);
    this.markerService.addMarker(newMarker);
  }

  markerDragEnd(marker:any, $event:MouseEvent){
  	let updMarker = {
  		name: marker.name,
  		lat: parseFloat(marker.lat),
  		lng: parseFloat(marker.lng),
  		draggable: false
  	}
  	let newLat = $event.coords.lat;
  	let newLng = $event.coords.lng;

    this.markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker(marker: any){

    let isDraggable;
    if(marker.draggable == 'yes'){        
      isDraggable = true;
    } else {
      isDraggable = false;
    }
    let newMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: isDraggable
    }


    this.markers.push(newMarker);
    this.markerService.addMarker(newMarker);
  }
  removeMarker(marker: any){
    for (let i=0;i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);
      }
    }
    this.markerService.removeMarker(marker);
  }
}

interface marker {
	name?:string;
	lat: number;
	lng: number;
	draggable: boolean;
}
// 61.1917191
// -149.9199334