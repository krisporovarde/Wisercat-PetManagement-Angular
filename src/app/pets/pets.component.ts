import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let response = this.http.get('http://localhost:8080/findAllPets');
    response.subscribe((data) => {
      this.pets = data;
    });
  }
}
