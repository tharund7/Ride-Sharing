import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ride-request-mng',
  standalone: true,
  imports: [CommonModule, HttpClientModule ],
  templateUrl: './ride-request-mng.component.html',
  styleUrl: './ride-request-mng.component.css'
})
export class RideRequestMngComponent implements OnInit{
  activeRides: any[] = [
    { id: 1, name: 'Ride A', status: 'Active' },
    { id: 2, name: 'Ride B', status: 'Active' },
  ];

  pastRides: any[] = [
    { id: 3, name: 'Ride C', status: 'Past' },
    { id: 4, name: 'Ride D', status: 'Past' },
  ]

  constructor() {}

  ngOnInit(): void {
  }
}
